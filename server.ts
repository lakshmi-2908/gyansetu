import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { loadOrBuildChunks, getAllChunks } from "./server/retrieval.ts";
import { handleDoubtQuery } from "./server/doubt_service.ts";
import { generatePracticeQuestions, submitPracticeAnswer } from "./server/practice_service.ts";
import { getTeacherSummary, readAllEvents, initEventStore } from "./server/events_store.ts";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Knowledge Base & Event store on startup
  console.log("[Server] Booting GyanSetu NCERT Education Platform...");
  const chunks = loadOrBuildChunks();
  initEventStore();
  console.log(`[Server] Knowledge base loaded with ${chunks.length} NCERT textbook chunks.`);

  // ----------------------------------------------------
  // API Routes
  // ----------------------------------------------------

  // 1. Health Route (required by ops spec)
  app.get("/api/health", (req, res) => {
    try {
      const allEvents = readAllEvents();
      const currentChunks = getAllChunks();
      const hasPrimary = Boolean(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== "MY_OPENROUTER_API_KEY");
      const hasFallback = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY");
      const openRouterModel = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-ultra-550b-a55b:free";

      const uniqueClasses = Array.from(new Set(currentChunks.map(c => `Class ${c.classLevel}`))).sort();
      const uniqueSubjects = Array.from(new Set(currentChunks.map(c => c.subject))).sort();
      const uniqueChapters = Array.from(new Set(currentChunks.map(c => `${c.subject} (Class ${c.classLevel}) - ${c.chapterTitle}`)));

      res.json({
        status: currentChunks.length > 0 ? "ok" : "degraded",
        brainPrimary: hasPrimary ? `${openRouterModel} (configured)` : `${openRouterModel} (unconfigured, falling back)`,
        brainFallback: hasFallback ? "gemini-2.5-flash-lite / gemini-3.7-flash (configured)" : "gemini (unconfigured)",
        indexLoaded: currentChunks.length > 0,
        indexedChunksCount: currentChunks.length,
        classesCovered: uniqueClasses,
        subjectsCovered: uniqueSubjects,
        chaptersCount: uniqueChapters.length,
        eventsCount: allEvents.length,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  });

  // 2. Doubt-Solving Agent Route
  app.post("/api/ask", async (req, res) => {
    try {
      const { query, studentSessionId, classCode, classLevel, subjectFilter, history, simplify } = req.body;

      if (!query || typeof query !== "string" || query.trim() === "") {
        return res.status(400).json({ error: "Please enter a valid doubt or question." });
      }

      const sessionId = studentSessionId || `student-${Date.now()}`;
      const response = await handleDoubtQuery({
        query: query.trim(),
        studentSessionId: sessionId,
        classCode: classCode || "CLASS-10A",
        classLevel: classLevel ? Number(classLevel) : undefined,
        subjectFilter: subjectFilter || undefined,
        history: Array.isArray(history) ? history : [],
        simplify: Boolean(simplify)
      });

      res.json(response);
    } catch (err: any) {
      console.error("[API /api/ask] Error handling doubt:", err);
      res.status(500).json({
        error: "We could not process this doubt at the moment. Please try asking again shortly.",
        details: err?.message
      });
    }
  });

  // 3. Adaptive Practice Generator Route
  app.post("/api/practice", async (req, res) => {
    try {
      const { studentSessionId, classCode, classLevel, subjectFilter, preferredConcept } = req.body;
      const sessionId = studentSessionId || `student-${Date.now()}`;

      const response = await generatePracticeQuestions({
        studentSessionId: sessionId,
        classCode: classCode || "CLASS-10A",
        classLevel: classLevel ? Number(classLevel) : undefined,
        subjectFilter: subjectFilter || undefined,
        preferredConcept
      });

      res.json(response);
    } catch (err: any) {
      console.error("[API /api/practice] Error generating practice:", err);
      res.status(500).json({
        error: "Unable to generate practice questions right now. Please try again shortly.",
        details: err?.message
      });
    }
  });

  // 4. Submit Practice Result Route
  app.post("/api/practice/submit", (req, res) => {
    try {
      const { studentSessionId, classCode, conceptTag, questionId, selectedOptionIndex, isCorrect } = req.body;

      const result = submitPracticeAnswer({
        studentSessionId: studentSessionId || "anonymous",
        classCode: classCode || "CLASS-10A",
        conceptTag: conceptTag || "ncert-general",
        questionId: questionId || "q",
        selectedOptionIndex: Number(selectedOptionIndex) || 0,
        isCorrect: Boolean(isCorrect)
      });

      res.json(result);
    } catch (err: any) {
      console.error("[API /api/practice/submit] Error:", err);
      res.status(500).json({ error: "Failed to record practice result" });
    }
  });

  // 5. Teacher Insight Summary Route
  app.get("/api/teacher/summary", (req, res) => {
    try {
      const classCode = (req.query.classCode as string) || "CLASS-10A";
      const summary = getTeacherSummary(classCode);
      res.json(summary);
    } catch (err: any) {
      console.error("[API /api/teacher/summary] Error:", err);
      res.status(500).json({ error: "Failed to retrieve teacher insights", details: err?.message });
    }
  });

  // 6. List Indexed NCERT Concepts & Chapters
  app.get("/api/concepts", (req, res) => {
    try {
      const all = getAllChunks();
      const unique = new Map<string, any>();

      all.forEach(c => {
        if (!unique.has(c.conceptTag)) {
          unique.set(c.conceptTag, {
            conceptTag: c.conceptTag,
            conceptName: c.conceptName,
            classLevel: c.classLevel,
            chapterTitle: c.chapterTitle,
            chapterNumber: c.chapterNumber,
            subject: c.subject,
            pageNumber: c.pageNumber
          });
        }
      });

      res.json({
        totalChunks: all.length,
        concepts: Array.from(unique.values())
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ----------------------------------------------------
  // Vite Middleware / Static Asset Delivery
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[GyanSetu Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
