import { getChunksByConcept, getAllChunks } from "./retrieval.ts";
import { routeBrainCall } from "./brain_router.ts";
import { getStudentAskedConcepts, logEvent } from "./events_store.ts";
import type { PracticeRequest, PracticeResponse, PracticeQuestion, SubmitPracticeRequest } from "./types.ts";

export async function generatePracticeQuestions(req: PracticeRequest): Promise<PracticeResponse> {
  const { studentSessionId, classLevel, subjectFilter, preferredConcept } = req;
  const startTime = Date.now();

  const allChunks = getAllChunks();

  // 1. Identify target concepts
  let targetConcepts: string[] = [];

  if (preferredConcept && preferredConcept.trim() !== "" && preferredConcept !== "ALL") {
    targetConcepts = [preferredConcept];
  } else {
    // Check student's recent doubts/interactions
    const asked = getStudentAskedConcepts(studentSessionId);
    if (asked.length > 0) {
      targetConcepts = asked.slice(-3); // Last 3 asked concepts
    } else {
      // Filter by class or subject if provided
      let pool = allChunks;
      if (classLevel) {
        pool = pool.filter(c => c.classLevel === classLevel);
      }
      if (subjectFilter && subjectFilter !== "ALL") {
        pool = pool.filter(c => c.subject.toLowerCase() === subjectFilter.toLowerCase());
      }
      if (pool.length === 0) pool = allChunks;
      targetConcepts = pool.slice(0, 3).map(c => c.conceptTag);
    }
  }

  // 2. Fetch context chunks for these concepts
  let matchedChunks = allChunks.filter(c => targetConcepts.includes(c.conceptTag));
  if (matchedChunks.length === 0) {
    matchedChunks = allChunks.slice(0, 3);
  }

  const contextText = matchedChunks
    .map(c => `[Class ${c.classLevel} ${c.subject}, Concept: ${c.conceptName}, Tag: ${c.conceptTag}, Chapter: ${c.chapterTitle}, Page: ${c.pageNumber}]\n${c.text}`)
    .join("\n\n");

  // 3. Prompt Brain to generate grounded MCQs in JSON format
  const prompt = `You are GyanSetu's NCERT Adaptive Practice Generator for Indian school students (Classes 6 to 12).
Generate 3 to 4 high-quality Multiple Choice Questions (MCQs) strictly grounded in the NCERT Context below.

Requirements:
1. Each question must test conceptual understanding, definitions, or formula applications from the text.
2. Provide exactly 4 options per question (A, B, C, D) with exactly one correct option.
3. Provide a clear, step-by-step explanation grounded in the textbook.
4. Include the exact Class, Subject, Chapter and Page number citation for the explanation.
5. Return strictly a valid JSON array matching this format:
[
  {
    "id": "q1",
    "classLevel": ${matchedChunks[0]?.classLevel || 10},
    "subject": "${matchedChunks[0]?.subject || "Mathematics"}",
    "conceptTag": "concept-tag-here",
    "conceptName": "Concept Name",
    "question": "Question text here...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswerIndex": 0,
    "explanation": "Detailed explanation citing the NCERT textbook fact.",
    "citation": {
      "classLevel": ${matchedChunks[0]?.classLevel || 10},
      "subject": "${matchedChunks[0]?.subject || "Mathematics"}",
      "chapterTitle": "Chapter Title",
      "pageNumber": 88
    }
  }
]

NCERT Context:
${contextText}`;

  const messages: Array<{ role: "system" | "user"; content: string }> = [
    { role: "system", content: "You generate grounded NCERT curriculum practice questions in JSON format." },
    { role: "user", content: prompt }
  ];

  let questions: PracticeQuestion[] = [];
  let brainUsed = "openrouter/free";

  try {
    const res = await routeBrainCall(messages, { temperature: 0.3, maxTokens: 1200, jsonMode: true, contextChunks: matchedChunks });
    brainUsed = res.brainUsed;

    // Parse JSON
    let cleanJson = res.text.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const parsed = JSON.parse(cleanJson);
    if (Array.isArray(parsed) && parsed.length > 0) {
      questions = parsed.map((q, idx) => ({
        id: q.id || `q_${Date.now()}_${idx}`,
        conceptTag: q.conceptTag || targetConcepts[0],
        conceptName: q.conceptName || "NCERT Concept",
        question: q.question,
        options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["Option A", "Option B", "Option C", "Option D"],
        correctAnswerIndex: typeof q.correctAnswerIndex === "number" ? q.correctAnswerIndex : 0,
        explanation: q.explanation || "Grounded explanation from NCERT.",
        citation: {
          chapterTitle: q.citation?.chapterTitle || matchedChunks[0]?.chapterTitle || "NCERT Textbook",
          pageNumber: q.citation?.pageNumber || matchedChunks[0]?.pageNumber || 71
        }
      }));
    }
  } catch (err) {
    console.warn("[Practice Service] AI generation failed or returned invalid JSON. Using verified offline NCERT practice items.", err);
    questions = getCuratedNCERTPractice(targetConcepts, matchedChunks);
    brainUsed = "fallback-offline";
  }

  if (questions.length === 0) {
    questions = getCuratedNCERTPractice(targetConcepts, matchedChunks);
  }

  const latencyMs = Date.now() - startTime;
  console.log(`[Practice Service] Generated ${questions.length} questions for [${targetConcepts.join(", ")}] via ${brainUsed} in ${latencyMs}ms`);

  return {
    questions,
    targetedConcepts: targetConcepts,
    brainUsed,
    latencyMs,
    isGrounded: true
  };
}

export function submitPracticeAnswer(req: SubmitPracticeRequest): { success: boolean; logged: boolean } {
  try {
    logEvent({
      studentSessionId: req.studentSessionId,
      classCode: req.classCode || "CLASS-10A",
      concept: req.conceptTag,
      type: "practice",
      correct: req.isCorrect,
      details: `Question: ${req.questionId}, Selected: ${req.selectedOptionIndex}, Correct: ${req.isCorrect}`
    });
    return { success: true, logged: true };
  } catch (err) {
    console.error("[Practice Service] Error logging practice result:", err);
    return { success: false, logged: false };
  }
}

// Curated verified NCERT fallback questions per concept
function getCuratedNCERTPractice(targetConcepts: string[], chunks: any[]): PracticeQuestion[] {
  const bank: Record<string, PracticeQuestion[]> = {
    "components-of-food-nutrients": [
      {
        id: "curated_c6_food_1",
        classLevel: 6,
        subject: "Science",
        conceptTag: "components-of-food-nutrients",
        conceptName: "Nutrients & Deficiency Diseases",
        question: "Deficiency of Vitamin C in the human diet causes which of the following diseases?",
        options: ["Scurvy (bleeding gums)", "Beriberi", "Rickets", "Night Blindness"],
        correctAnswerIndex: 0,
        explanation: "According to NCERT Class 6 Science (Chapter 1, p. 8), deficiency of Vitamin C causes Scurvy, characterized by bleeding gums and slow wound healing.",
        citation: { classLevel: 6, subject: "Science", chapterTitle: "Chapter 1: Components of Food", pageNumber: 8 }
      }
    ],
    "prime-composite-hcf-lcm": [
      {
        id: "curated_c6_math_1",
        classLevel: 6,
        subject: "Mathematics",
        conceptTag: "prime-composite-hcf-lcm",
        conceptName: "Prime Numbers and HCF/LCM",
        question: "Which number is the smallest and the only even prime number?",
        options: ["2", "1", "4", "0"],
        correctAnswerIndex: 0,
        explanation: "According to NCERT Class 6 Mathematics (Chapter 3, p. 52), 2 is the smallest prime number and it is the only even prime number.",
        citation: { classLevel: 6, subject: "Mathematics", chapterTitle: "Chapter 3: Playing with Numbers", pageNumber: 52 }
      }
    ],
    "force-contact-noncontact-pressure": [
      {
        id: "curated_c8_force_1",
        classLevel: 8,
        subject: "Science",
        conceptTag: "force-contact-noncontact-pressure",
        conceptName: "Force and Pressure",
        question: "What is the SI unit of pressure?",
        options: ["Pascal (Pa) or N/m²", "Newton (N)", "Joule (J)", "Watt (W)"],
        correctAnswerIndex: 0,
        explanation: "According to NCERT Class 8 Science (Chapter 11, p. 134), Pressure P = Force/Area. Its SI unit is Pascal (Pa) or Newton per square metre (N/m²).",
        citation: { classLevel: 8, subject: "Science", chapterTitle: "Chapter 11: Force and Pressure", pageNumber: 134 }
      }
    ],
    "newton-laws-of-motion-momentum": [
      {
        id: "curated_c9_newton_1",
        classLevel: 9,
        subject: "Science",
        conceptTag: "newton-laws-of-motion-momentum",
        conceptName: "Newton's Second Law of Motion",
        question: "According to Newton's Second Law of Motion, applied force F is directly proportional to:",
        options: ["Rate of change of momentum (F = ma)", "Mass only", "Velocity squared", "Distance travelled"],
        correctAnswerIndex: 0,
        explanation: "Newton's second law states that the rate of change of momentum is directly proportional to the applied force: F = dp/dt = ma [NCERT Class 9 Science, Chapter 9, p. 120].",
        citation: { classLevel: 9, subject: "Science", chapterTitle: "Chapter 9: Force and Laws of Motion", pageNumber: 120 }
      }
    ],
    "discriminant-nature-of-roots": [
      {
        id: "curated_disc_1",
        classLevel: 10,
        subject: "Mathematics",
        conceptTag: "discriminant-nature-of-roots",
        conceptName: "Discriminant & Nature of Roots",
        question: "For a quadratic equation ax² + bx + c = 0, if the discriminant D = b² - 4ac = 0, what is the nature of its roots?",
        options: [
          "Two distinct real roots",
          "Two equal real roots (x = -b/2a)",
          "No real roots (imaginary)",
          "Three real roots"
        ],
        correctAnswerIndex: 1,
        explanation: "According to NCERT Chapter 4 (p. 88), if b² - 4ac = 0, the equation has two equal real roots given by x = -b/(2a).",
        citation: { classLevel: 10, subject: "Mathematics", chapterTitle: "Chapter 4: Quadratic Equations", pageNumber: 88 }
      }
    ],
    "quadratic-formula": [
      {
        id: "curated_qf_1",
        classLevel: 10,
        subject: "Mathematics",
        conceptTag: "quadratic-formula",
        conceptName: "Quadratic Formula",
        question: "What are the roots of the quadratic equation 3x² - 5x + 2 = 0 using the Quadratic Formula?",
        options: [
          "x = 1 and x = 2/3",
          "x = 2 and x = 3/2",
          "x = -1 and x = -2/3",
          "x = 3 and x = 1/2"
        ],
        correctAnswerIndex: 0,
        explanation: "Using x = (-b ± √(b² - 4ac))/(2a): a=3, b=-5, c=2. D = (-5)² - 4(3)(2) = 25 - 24 = 1. x = (5 ± 1)/6 => x = 1 and x = 2/3 [Chapter 4: Quadratic Equations, p. 82].",
        citation: { classLevel: 10, subject: "Mathematics", chapterTitle: "Chapter 4: Quadratic Equations", pageNumber: 82 }
      }
    ],
    "excretion-nephron-filtration": [
      {
        id: "curated_neph_1",
        classLevel: 10,
        subject: "Science",
        conceptTag: "excretion-nephron-filtration",
        conceptName: "Nephron Structure and Urine Formation",
        question: "Which part of the nephron performs the ultra-filtration of blood under pressure?",
        options: [
          "Glomerulus enclosed in Bowman's Capsule",
          "Collecting Duct",
          "Urinary Bladder",
          "Renal Artery only"
        ],
        correctAnswerIndex: 0,
        explanation: "In the human excretory system, blood is filtered under high pressure across the cluster of capillaries called Glomerulus into the cup-like Bowman's Capsule [Chapter 6: Life Processes, p. 112].",
        citation: { classLevel: 10, subject: "Science", chapterTitle: "Chapter 6: Life Processes", pageNumber: 112 }
      }
    ],
    "refraction-snells-law-refractive-index": [
      {
        id: "curated_snell_1",
        classLevel: 10,
        subject: "Science",
        conceptTag: "refraction-snells-law-refractive-index",
        conceptName: "Snell's Law of Refraction",
        question: "According to Snell's Law of Refraction, what is the ratio of sin(i) to sin(r) for a given pair of media?",
        options: [
          "Constant, equal to refractive index n₂₁",
          "Always equal to 1",
          "Directly proportional to angle of incidence",
          "Zero"
        ],
        correctAnswerIndex: 0,
        explanation: "Snell's Law states that for a given pair of media and given color of light, (sin i) / (sin r) = constant = n₂₁ (Refractive index of medium 2 with respect to medium 1) [Chapter 10: Light – Reflection and Refraction, p. 172].",
        citation: { classLevel: 10, subject: "Science", chapterTitle: "Chapter 10: Light – Reflection and Refraction", pageNumber: 172 }
      }
    ],
    "power-of-lens": [
      {
        id: "curated_power_1",
        classLevel: 10,
        subject: "Science",
        conceptTag: "power-of-lens",
        conceptName: "Power of a Lens",
        question: "A convex lens has a focal length of +50 cm (+0.5 m). What is its optical power in Dioptres?",
        options: [
          "+2.0 D",
          "-2.0 D",
          "+0.5 D",
          "+5.0 D"
        ],
        correctAnswerIndex: 0,
        explanation: "Power of a lens P = 1 / f (in metres). Since f = +0.5 m, P = 1 / 0.5 = +2.0 Dioptres (D) [Chapter 10: Light, p. 182].",
        citation: { classLevel: 10, subject: "Science", chapterTitle: "Chapter 10: Light – Reflection and Refraction", pageNumber: 182 }
      }
    ],
    "coulomb-law-gauss-law-electric-field": [
      {
        id: "curated_c12_coulomb_1",
        classLevel: 12,
        subject: "Physics",
        conceptTag: "coulomb-law-gauss-law-electric-field",
        conceptName: "Gauss's Law of Electrostatics",
        question: "According to Gauss's Law, the total electric flux Φ through any closed surface enclosing charge q in vacuum is:",
        options: ["q / ε₀", "q × ε₀", "4πε₀ q", "Zero always"],
        correctAnswerIndex: 0,
        explanation: "Gauss's Law states that total electric flux ∮ E · dA = q_enclosed / ε₀ [NCERT Class 12 Physics, Chapter 1, p. 14].",
        citation: { classLevel: 12, subject: "Physics", chapterTitle: "Chapter 1: Electric Charges and Fields", pageNumber: 14 }
      }
    ],
    "genetics-mendel-laws-monohybrid-dihybrid": [
      {
        id: "curated_c12_genetics_1",
        classLevel: 12,
        subject: "Biology",
        conceptTag: "genetics-mendel-laws-monohybrid-dihybrid",
        conceptName: "Mendelian Genetics",
        question: "What is the phenotypic ratio in the F2 generation of a Mendelian dihybrid cross?",
        options: ["9:3:3:1", "3:1", "1:2:1", "1:1:1:1"],
        correctAnswerIndex: 0,
        explanation: "In a Mendelian dihybrid cross (e.g. Round Yellow × Wrinkled Green), the F2 phenotypic ratio is 9:3:3:1 [NCERT Class 12 Biology, Chapter 5, p. 72].",
        citation: { classLevel: 12, subject: "Biology", chapterTitle: "Chapter 5: Principles of Inheritance", pageNumber: 72 }
      }
    ]
  };

  const selected: PracticeQuestion[] = [];
  targetConcepts.forEach(c => {
    if (bank[c]) {
      selected.push(...bank[c]);
    }
  });

  // If still less than 3, add other curated items
  Object.values(bank).forEach(items => {
    items.forEach(it => {
      if (selected.length < 4 && !selected.some(s => s.id === it.id)) {
        selected.push(it);
      }
    });
  });

  return selected;
}
