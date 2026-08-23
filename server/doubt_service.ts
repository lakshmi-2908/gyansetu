import { retrieveChunks, cleanQueryText } from "./retrieval.ts";
import { routeBrainCall } from "./brain_router.ts";
import { logEvent } from "./events_store.ts";
import type { AskRequest, AskResponse } from "./types.ts";

export async function handleDoubtQuery(req: AskRequest): Promise<AskResponse> {
  const { query, studentSessionId, classCode = "CLASS-10A", classLevel, subjectFilter, history = [], simplify = false } = req;

  // Extract last student doubt if available in history for contextual follow-ups
  const lastUserMsg = history && history.length > 0
    ? [...history].reverse().find(h => h.role === "user")?.content || ""
    : "";

  const cleanedCore = cleanQueryText(query);

  // Check if the query is merely an empty template (e.g. user clicked a quick format without a topic or without prior context)
  if (cleanedCore.length < 2 && !lastUserMsg) {
    return {
      answer: `Please specify the NCERT topic or concept you would like me to explain with this format.

**Popular topics you can ask:**
• **Class 6**: *Components of Food & Nutrients*, *Prime Numbers & LCM/HCF*
• **Class 7**: *Photosynthesis in Plants*, *Solving Linear Equations*
• **Class 8**: *Force, Friction & Pressure*, *Cell Structure & Organelles*
• **Class 9**: *Equations of Motion*, *Newton's Laws*, *Rational & Irrational Numbers*
• **Class 10**: *Quadratic Formula & Discriminant*, *Nephron & Excretion*, *Snell's Law & Mirrors*
• **Class 11**: *Laws of Motion & Friction*, *Mole Concept & Molarity*
• **Class 12**: *Coulomb's Law & Gauss's Law*, *Raoult's Law*, *Integrals & Calculus*

Try typing your topic after the prompt, or select one from the examples!`,
      isGrounded: true,
      groundingBadge: "NCERT Topic Guide",
      groundingStatus: "grounded",
      citations: [],
      brainUsed: "NCERT-Grounding-Gate",
      latencyMs: 10
    };
  }

  // 1. Primary Retrieval
  let effectiveQuery = query;
  if (cleanedCore.length < 3 && lastUserMsg) {
    effectiveQuery = `${query} ${lastUserMsg}`;
  }

  let retrieval = retrieveChunks(effectiveQuery, 4, { classLevel, subject: subjectFilter });
  
  // Secondary fallback retrieval if history exists and primary was ungrounded
  if (!retrieval.isCovered && lastUserMsg) {
    const combinedQuery = `${query} ${lastUserMsg}`;
    const secondaryRetrieval = retrieveChunks(combinedQuery, 4, { classLevel, subject: subjectFilter });
    if (secondaryRetrieval.isCovered) {
      retrieval = secondaryRetrieval;
    }
  }

  // Tertiary fallback: if query was filtered by class/subject and not covered, try broad search across all classes
  if (!retrieval.isCovered && (classLevel || subjectFilter)) {
    const broadRetrieval = retrieveChunks(effectiveQuery, 4);
    if (broadRetrieval.isCovered) {
      retrieval = broadRetrieval;
    }
  }

  const { results, isCovered, topScore } = retrieval;

  // If directly covered by indexed textbook chunks
  if (isCovered && results.length > 0) {
    const topChunk = results[0].chunk;
    const citations = results.map(r => ({
      classLevel: r.chunk.classLevel,
      subject: r.chunk.subject,
      chapter: r.chunk.chapterTitle,
      pageNumber: r.chunk.pageNumber,
      conceptTag: r.chunk.conceptTag,
      textSnippet: r.chunk.text.slice(0, 140) + "..."
    }));

    const contextText = results.map((r, i) => `[Source ${i + 1}: Class ${r.chunk.classLevel} ${r.chunk.subject}, ${r.chunk.chapterTitle}, Page ${r.chunk.pageNumber}, Concept: ${r.chunk.conceptName}]\n${r.chunk.text}`).join("\n\n");

    const minPage = Math.min(...results.map(r => r.chunk.pageNumber));
    const maxPage = Math.max(...results.map(r => r.chunk.pageNumber));
    const pageStr = minPage === maxPage ? `p.${minPage}` : `p.${minPage}-${maxPage}`;
    const groundingBadge = `Class ${topChunk.classLevel} ${topChunk.subject}: ${topChunk.chapterTitle.split(":")[1]?.trim() || topChunk.chapterTitle}, ${pageStr}`;

    const systemPrompt = `You are GyanSetu (ज्ञानसेतु), an authoritative, friendly, and strictly grounded NCERT bilingual tutor for Indian school students (Classes 6 to 12).
You MUST follow these critical rules:
1. ONLY answer using the verified facts provided in the NCERT Context below. Do NOT hallucinate or bring in ungrounded facts.
2. Structure your answer in clear, numbered step-by-step points (1., 2., 3.).
3. At the end of EACH point/claim, you MUST include an exact NCERT citation in square brackets matching the source: e.g. [Class ${topChunk.classLevel} ${topChunk.subject}, ${topChunk.chapterTitle}, p. ${topChunk.pageNumber}].
4. Language Matching: Detect whether the student's question is in English, Hindi, or Hinglish (conversational romanized Hindi). Respond fluently in the EXACT SAME language style and script as the student's query, preserving standard NCERT terminology.
5. Formatting: Use clean markdown with bold concept names and clean math formatting (e.g. ax² + bx + c = 0, D = b² - 4ac, 1/v - 1/u = 1/f, P = 1/f).
${simplify ? "6. SIMPLIFIED EXPLANATION MODE: Use very simple everyday vocabulary, short sentences, analogies, and friendly explanations suitable for a student struggling with complex textbook terminology." : ""}

NCERT Context:
${contextText}`;

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt }
    ];

    if (history && history.length > 0) {
      history.slice(-4).forEach(h => {
        messages.push({ role: h.role, content: h.content });
      });
    }

    const promptText = simplify
      ? `Student asked to explain more simply: "${query}". Please provide an ultra-clear, simple step-by-step explanation grounded in the context with citations.`
      : query;

    messages.push({ role: "user", content: promptText });

    let brainRes;
    try {
      brainRes = await routeBrainCall(messages, { temperature: 0.2, maxTokens: 900, contextChunks: results.map(r => r.chunk) });
    } catch (err: any) {
      console.error("[Doubt Service] Brain call failed:", err);
      const fallbackAnswer = generateOfflineGroundedAnswer(results, query, simplify);
      brainRes = {
        text: fallbackAnswer,
        brainUsed: "fallback-offline" as const,
        latencyMs: 15,
        isFallback: true,
        modelName: "deterministic-ncert-engine"
      };
    }

    try {
      logEvent({
        studentSessionId,
        classCode,
        concept: topChunk.conceptTag,
        type: "doubt",
        correct: null,
        details: query.slice(0, 100)
      });
    } catch (e) {
      console.error("[Doubt Service] Error logging event:", e);
    }

    return {
      answer: brainRes.text,
      isGrounded: true,
      groundingBadge,
      groundingStatus: "grounded",
      citations,
      classLevel: topChunk.classLevel,
      subject: topChunk.subject,
      conceptTag: topChunk.conceptTag,
      brainUsed: brainRes.brainUsed,
      latencyMs: brainRes.latencyMs
    };
  }

  // -------------------------------------------------------------------------
  // BROADER NCERT CURRICULUM DOUBT RESOLVER (AI Brain Powered for ANY Doubt)
  // -------------------------------------------------------------------------
  // When a student asks ANY doubt across NCERT subjects (Maths, Science, Physics,
  // Chemistry, Biology, Social Studies, English), the AI Brain answers accurately
  // adhering to NCERT & CBSE pedagogical guidelines.
  const broadSystemPrompt = `You are GyanSetu (ज्ञानसेतु), an expert, encouraging, and accurate NCERT/CBSE bilingual tutor for Indian school students (Classes 6 to 12).
A student has asked a doubt: "${query}".
Your goal is to answer their doubt thoroughly, accurately, and pedagogically according to the official NCERT syllabus:

Guidelines:
1. Academic Accuracy: Explain the core concepts, definitions, principles, formulas, or step-by-step mathematical/scientific reasoning according to standard NCERT textbook pedagogy.
2. Structure: Break your explanation into clear, numbered points (1., 2., 3.) with key terms in bold.
3. Syllabus Citation: Cite the relevant NCERT grade and subject at key steps (e.g. [NCERT Class 10 Science], [NCERT Class 9 Mathematics], [NCERT Physics], etc.).
4. Language Matching: Match the student's language naturally. If the query is in Hindi, answer in clear Hindi (देवनागरी). If Hinglish (Roman Hindi), answer in friendly Hinglish with key English technical terms. If English, answer in polished English.
5. Tone: Encouraging, supportive, clear, and easy to understand.
${simplify ? "6. SIMPLIFIED EXPLANATION: Use an everyday real-world example or analogy to make this super intuitive for a student." : ""}`;

  const broadMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: broadSystemPrompt }
  ];

  if (history && history.length > 0) {
    history.slice(-4).forEach(h => {
      broadMessages.push({ role: h.role, content: h.content });
    });
  }

  broadMessages.push({ role: "user", content: query });

  let broadBrainRes;
  try {
    broadBrainRes = await routeBrainCall(broadMessages, { temperature: 0.25, maxTokens: 1000 });
  } catch (err: any) {
    console.error("[Doubt Service] Broad brain call failed:", err);
    broadBrainRes = {
      text: `1. **Concept Explanation**: Your doubt on "${query}" is an important part of the NCERT school curriculum.\n\n2. **Key Principle**: In CBSE/NCERT curriculum, this concept is explored through fundamental definitions, governing laws, and step-by-step problem solving.\n\n3. **Recommendation**: Review the corresponding chapter in your NCERT textbook or ask for a specific formula derivation / real-world example!`,
      brainUsed: "fallback-offline" as const,
      latencyMs: 20,
      isFallback: true,
      modelName: "offline-tutor"
    };
  }

  const inferredSubject = subjectFilter && subjectFilter !== "ALL" ? subjectFilter : undefined;
  const broadBadge = "Not found in indexed chapters";

  try {
    logEvent({
      studentSessionId,
      classCode,
      concept: "ungrounded-doubt",
      type: "doubt",
      correct: null,
      details: query.slice(0, 100)
    });
  } catch (e) {
    console.error("[Doubt Service] Error logging event:", e);
  }

  // Prepend honest ungrounded warning notice
  const isHindiQuery = /[\u0900-\u097F]|kya|kaise|batao|hota/i.test(query);
  const ungroundedPrefix = isHindiQuery
    ? `> ⚠️ **अनुक्रमित अध्यायों में नहीं मिला**: यह विषय वर्तमान में अनुक्रमित एनसीईआरटी पाठ्यपुस्तकों में उपलब्ध नहीं है। नीचे एक सामान्य शैक्षणिक व्याख्या दी गई है:\n\n`
    : `> ⚠️ **Not Found in Indexed Chapters**: This concept was not found in our indexed NCERT textbook chapters. Here is a general academic explanation:\n\n`;

  return {
    answer: `${ungroundedPrefix}${broadBrainRes.text}`,
    isGrounded: false,
    groundingBadge: broadBadge,
    groundingStatus: "ungrounded",
    citations: [],
    classLevel: classLevel || undefined,
    subject: inferredSubject,
    conceptTag: "ungrounded-concept",
    brainUsed: broadBrainRes.brainUsed,
    latencyMs: broadBrainRes.latencyMs
  };
}

// Deterministic grounded offline synthesis if both API keys are absent or rate-limited
function generateOfflineGroundedAnswer(results: any[], query: string, simplify: boolean): string {
  const top = results[0].chunk;
  const isHindi = /[\u0900-\u097F]|kya|kaise|batao|hota/i.test(query);

  if (isHindi) {
    return `1. एनसीईआरटी कक्षा ${top.classLevel} (${top.subject}) के अनुसार, **${top.conceptName}** के मुख्य बिंदु निम्नलिखित हैं [${top.chapterTitle}, p. ${top.pageNumber}].\n\n2. ${top.text.slice(0, 260)} [${top.chapterTitle}, p. ${top.pageNumber}].\n\n3. यह सिद्धांत बोर्ड परीक्षा और संकल्पना स्पष्टता के लिए अत्यंत महत्वपूर्ण है [${top.chapterTitle}, p. ${top.pageNumber}].`;
  }

  return `1. According to NCERT Class ${top.classLevel} (${top.subject}), **${top.conceptName}** is defined as: ${top.text.slice(0, 260)} [${top.chapterTitle}, p. ${top.pageNumber}].\n\n2. **Key Concepts & Applications**: ${top.keywords.slice(0, 5).join(", ")} are central to mastering this topic [${top.chapterTitle}, p. ${top.pageNumber}].\n\n3. **Summary**: Key formulas and definitions must be thoroughly practiced from the NCERT textbook [${top.chapterTitle}, p. ${top.pageNumber}].`;
}
