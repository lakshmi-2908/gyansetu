import { GoogleGenAI } from "@google/genai";
import type { KBChunk } from "./types.ts";

interface BrainMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface BrainOptions {
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
  // The actually-retrieved NCERT chunk(s) relevant to this call, used so the
  // offline grounded engine can build an answer from the real topic asked
  // about instead of a hardcoded example.
  contextChunks?: KBChunk[];
}

export interface BrainResult {
  text: string;
  brainUsed: "openrouter/free" | "gemini" | "fallback-offline";
  latencyMs: number;
  isFallback: boolean;
  modelName: string;
}

// In-memory rate limiter / request counter
let activeRequestsCount = 0;
const MAX_CONCURRENT_REQUESTS = 10;
const REQUEST_COOLDOWN_MS = 300;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 1. OpenRouter caller with multi-model fallback and robust text extraction
async function callOpenRouter(
  messages: BrainMessage[],
  options: BrainOptions = {}
): Promise<{ text: string; modelName: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_OPENROUTER_API_KEY") {
    throw new Error("OPENROUTER_API_KEY not configured or empty.");
  }

  const customModel = process.env.OPENROUTER_MODEL?.trim();

  // Reliable free & fast models pool on OpenRouter (with custom model prioritized first if provided)
  const candidateModels = [
    customModel,
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "mistralai/mistral-small-24b-instruct-2501:free",
    "qwen/qwen-2.5-72b-instruct:free",
    "deepseek/deepseek-r1:free",
    "deepseek/deepseek-chat:free"
  ].filter(Boolean) as string[];

  // Deduplicate candidate models
  const uniqueModels = Array.from(new Set(candidateModels));
  let lastError: any = null;

  for (const modelToUse of uniqueModels) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500); // 7.5-second generous timeout per model

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.APP_URL || "https://gyansetu.aistudio.app",
          "X-Title": "GyanSetu NCERT Grounded Learning"
        },
        body: JSON.stringify({
          model: modelToUse,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          temperature: options.temperature ?? 0.2,
          max_tokens: options.maxTokens ?? 1400,
          response_format: options.jsonMode ? { type: "json_object" } : undefined
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        lastError = new Error(`OpenRouter (${modelToUse}) HTTP ${res.status}: ${errText.slice(0, 120)}`);
        continue;
      }

      const data = await res.json();
      const choice = data.choices?.[0];
      let output = choice?.message?.content || choice?.message?.reasoning || choice?.text;

      // Clean up potential think tags from reasoning models
      if (typeof output === "string" && output.includes("</think>")) {
        output = output.split("</think>").pop()?.trim() || output;
      }

      const modelUsed = data.model || modelToUse;

      if (!output || typeof output !== "string" || output.trim() === "") {
        lastError = new Error(`OpenRouter model ${modelToUse} returned empty response`);
        continue;
      }

      return { text: output.trim(), modelName: modelUsed };
    } catch (err: any) {
      clearTimeout(timeoutId);
      lastError = err;
      // Try next candidate model
      continue;
    }
  }

  throw lastError || new Error("OpenRouter candidate models returned empty response or timed out");
}

// 2. Gemini fallback caller with @google/genai SDK
async function callGemini(
  messages: BrainMessage[],
  options: BrainOptions = {}
): Promise<{ text: string; modelName: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY not configured or empty.");
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey.trim()
  });

  // Extract system prompt and conversation messages
  const systemMsg = messages.find(m => m.role === "system")?.content || "";
  const conversation = messages
    .filter(m => m.role !== "system")
    .map(m => `${m.role === "user" ? "Student" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  const contents = conversation.trim() || "Hello, please provide assistance based on the system instructions.";

  // Use supported Gemini models according to @google/genai SDK
  const candidateModels = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-3.7-flash",
    "gemini-flash-latest",
    "gemini-3.1-pro-preview"
  ];
  let lastErr: any = null;

  for (const modelName of candidateModels) {
    try {
      const generatePromise = ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction: systemMsg || undefined,
          temperature: options.temperature ?? 0.2,
          responseMimeType: options.jsonMode ? "application/json" : undefined
        }
      });
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout on model ${modelName}`)), 7500));
      const response = await Promise.race([generatePromise, timeoutPromise]) as any;

      const text = response.text;
      if (text && text.trim().length > 0) {
        return { text: text.trim(), modelName };
      }
    } catch (err: any) {
      lastErr = err;
      console.warn(`[Brain Router] Gemini model ${modelName} encountered issue: ${err?.message || err}`);
      // Try next candidate model
      continue;
    }
  }

  throw lastErr || new Error("Gemini generation failed on all candidate models");
}

// 3. Shared brain router with rate limiting, retry, and fallback
export async function routeBrainCall(
  messages: BrainMessage[],
  options: BrainOptions = {}
): Promise<BrainResult> {
  const startTime = Date.now();

  if (activeRequestsCount >= MAX_CONCURRENT_REQUESTS) {
    await delay(REQUEST_COOLDOWN_MS);
  }
  activeRequestsCount++;

  let openRouterError: any = null;
  let geminiError: any = null;

  try {
    // ----------------------------------------------------
    // 1. Try PRIMARY: OpenRouter free tier
    // ----------------------------------------------------
    if (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim() !== "" && process.env.OPENROUTER_API_KEY !== "MY_OPENROUTER_API_KEY") {
      try {
        const res = await callOpenRouter(messages, options);
        const latencyMs = Date.now() - startTime;
        console.log(`[Brain Router] PRIMARY answered via ${res.modelName} in ${latencyMs}ms`);
        return {
          text: res.text,
          brainUsed: "openrouter/free",
          latencyMs,
          isFallback: false,
          modelName: res.modelName
        };
      } catch (err: any) {
        openRouterError = err;
        console.warn(`[Brain Router] Primary OpenRouter failed: ${err?.message || err}`);
      }
    } else {
      openRouterError = new Error("OPENROUTER_API_KEY not set, switching directly to fallback");
    }

    // ----------------------------------------------------
    // 2. Fallback to Gemini
    // ----------------------------------------------------
    console.info(`[Brain Router] Falling back to Gemini brain due to: ${openRouterError?.message || "unconfigured primary"}`);

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "" && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY") {
      try {
        const res = await callGemini(messages, options);
        const latencyMs = Date.now() - startTime;
        console.log(`[Brain Router] FALLBACK answered via Gemini (${res.modelName}) in ${latencyMs}ms`);
        return {
          text: res.text,
          brainUsed: "gemini",
          latencyMs,
          isFallback: true,
          modelName: res.modelName
        };
      } catch (err: any) {
        geminiError = err;
        console.warn(`[Brain Router] Gemini fallback failed: ${err?.message || err}`);
      }
    } else {
      geminiError = new Error("GEMINI_API_KEY not set");
    }

    // ----------------------------------------------------
    // 3. OFFLINE GROUNDED BRAIN: If external cloud APIs are unavailable
    //    Synthesize high-accuracy response directly from retrieved NCERT context
    // ----------------------------------------------------
    console.warn(`[Brain Router] Cloud models unavailable. Activating GyanSetu Offline Grounded Engine. OpenRouter: ${openRouterError?.message}, Gemini: ${geminiError?.message}`);
    
    const offlineText = generateOfflineGroundedResponse(messages, options, options.contextChunks);
    const latencyMs = Date.now() - startTime;
    return {
      text: offlineText,
      brainUsed: "fallback-offline",
      latencyMs,
      isFallback: true,
      modelName: "gyansetu-ncert-grounded-offline-v2"
    };
  } finally {
    activeRequestsCount = Math.max(0, activeRequestsCount - 1);
  }
}

function generateOfflineGroundedResponse(
  messages: BrainMessage[],
  options: BrainOptions,
  contextChunks?: KBChunk[]
): string {
  const userMsg = messages.filter(m => m.role === "user").pop()?.content || "";
  const systemMsg = messages.find(m => m.role === "system")?.content || "";
  const isHindi = /[\u0900-\u097F]|kya|kaise|batao|hota/i.test(userMsg);

  // If JSON mode requested (e.g., Practice generator), build MCQs from the
  // actually-retrieved NCERT chunks rather than a hardcoded example.
  if (options.jsonMode || systemMsg.includes("valid JSON array")) {
    if (contextChunks && contextChunks.length > 0) {
      const targetCount = Math.min(3, Math.max(contextChunks.length, contextChunks.length >= 1 ? 3 : 0));
      // Question stem variants so we can still produce 3 distinct questions
      // even when only one or two concept chunks were actually retrieved.
      const stemVariants = [
        (c: KBChunk) => `According to NCERT Class ${c.classLevel} ${c.subject} (${c.chapterTitle}), which statement correctly describes "${c.conceptName}"?`,
        (c: KBChunk) => `Based on NCERT Class ${c.classLevel} ${c.subject}, which of the following is TRUE about "${c.conceptName}"?`,
        (c: KBChunk) => `A student is revising "${c.conceptName}" from NCERT Class ${c.classLevel} ${c.subject}. Which statement matches the textbook explanation?`
      ];

      const questions = Array.from({ length: Math.min(targetCount, 3) }).map((_, idx) => {
        const chunk = contextChunks[idx % contextChunks.length];
        const correctText = chunk.text.slice(0, 140).trim() + (chunk.text.length > 140 ? "..." : "");
        const decoyChunks = contextChunks.filter(c => c.conceptTag !== chunk.conceptTag);
        const decoys = decoyChunks.length >= 2
          ? decoyChunks.slice(0, 2).map(c => c.text.slice(0, 140).trim() + (c.text.length > 140 ? "..." : ""))
          : [
              `A statement unrelated to ${chunk.conceptName} from a different NCERT chapter.`,
              `An incorrect generalization about ${chunk.conceptName} not supported by the textbook.`
            ];
        const options4 = [correctText, decoys[0], decoys[1] || `None of the above statements about ${chunk.conceptName} are accurate.`, `The opposite of what NCERT states about ${chunk.conceptName}.`];
        return {
          id: `q_off_${idx + 1}`,
          classLevel: chunk.classLevel,
          subject: chunk.subject,
          conceptTag: chunk.conceptTag,
          conceptName: chunk.conceptName,
          question: stemVariants[idx % stemVariants.length](chunk),
          options: options4,
          correctAnswerIndex: 0,
          explanation: `${chunk.text.slice(0, 260).trim()}${chunk.text.length > 260 ? "..." : ""} [${chunk.chapterTitle}, p. ${chunk.pageNumber}]`,
          citation: {
            classLevel: chunk.classLevel,
            subject: chunk.subject,
            chapterTitle: chunk.chapterTitle,
            pageNumber: chunk.pageNumber
          }
        };
      });
      return JSON.stringify(questions);
    }

    // No retrieved context available at all — return an empty set so the
    // caller's curated/offline fallback bank takes over instead of showing
    // an unrelated hardcoded topic.
    return JSON.stringify([]);
  }

  // Text explanation for doubt solver, grounded in the actually-retrieved chunk
  if (contextChunks && contextChunks.length > 0) {
    const top = contextChunks[0];
    const keywordLine = top.keywords && top.keywords.length > 0 ? top.keywords.slice(0, 5).join(", ") : top.conceptName;

    if (isHindi) {
      return `### 📖 एनसीईआरटी आधारित व्याख्या

**1. मूल परिभाषा:** एनसीईआरटी कक्षा ${top.classLevel} (${top.subject}) के अनुसार, **${top.conceptName}** को निम्नानुसार समझाया गया है [${top.chapterTitle}, p. ${top.pageNumber}]:
${top.text.slice(0, 300).trim()}${top.text.length > 300 ? "..." : ""}

---

**2. मुख्य शब्द (Key Terms):** ${keywordLine}

---

**3. 📚 एनसीईआरटी संदर्भ:**
- **कक्षा:** ${top.classLevel} | **विषय:** ${top.subject}
- **अध्याय:** ${top.chapterTitle}
- **पृष्ठ संख्या:** ${top.pageNumber}`;
    }

    return `### 📖 NCERT Grounded Conceptual Explanation

**1. Core Definition:** Based on the NCERT curriculum, **${top.conceptName}** (Class ${top.classLevel}, ${top.subject}) is explained as follows [${top.chapterTitle}, p. ${top.pageNumber}]:
${top.text.slice(0, 300).trim()}${top.text.length > 300 ? "..." : ""}

---

**2. Key Terms & Concepts:** ${keywordLine} are central to mastering this topic.

---

**3. 📚 Exact NCERT Textbook Citation:**
- **Class:** ${top.classLevel} | **Subject:** ${top.subject}
- **Chapter:** ${top.chapterTitle}
- **Page Number:** ${top.pageNumber} (NCERT Official Textbook)`;
  }

  // No retrieved context available — give an honest generic notice instead
  // of fabricating an unrelated worked example.
  return isHindi
    ? `इस समय हमारे पास इस विषय के लिए ऑफ़लाइन एनसीईआरटी संदर्भ उपलब्ध नहीं है। कृपया अपने प्रश्न को थोड़ा और स्पष्ट करें या इससे मिलता-जुलता कोई अन्य विषय पूछें।`
    : `An offline NCERT-grounded reference for this exact topic isn't available right now. Please try rephrasing your question, or ask about a related concept from your syllabus.`;
}
