import fs from "fs";
import path from "path";
import type { EventLogEntry, TeacherConceptStat, TeacherSummaryResponse } from "./types.ts";

const EVENTS_DIR = path.join(process.cwd(), "data");
const EVENTS_FILE = path.join(EVENTS_DIR, "events.jsonl");

// Seed realistic NCERT sample data across ALL class cohorts (Classes 6 to 12)
const SEED_EVENTS: EventLogEntry[] = [
  // Class 6: CLASS-6A
  { studentSessionId: "stud-601", classCode: "CLASS-6A", concept: "components-of-food-nutrients", conceptName: "Nutrients, Balanced Diet & Deficiency Diseases", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
  { studentSessionId: "stud-602", classCode: "CLASS-6A", concept: "components-of-food-nutrients", conceptName: "Nutrients, Balanced Diet & Deficiency Diseases", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 190).toISOString() },
  { studentSessionId: "stud-603", classCode: "CLASS-6A", concept: "prime-composite-hcf-lcm", conceptName: "Prime Numbers, Factors, HCF & LCM", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
  { studentSessionId: "stud-604", classCode: "CLASS-6A", concept: "prime-composite-hcf-lcm", conceptName: "Prime Numbers, Factors, HCF & LCM", type: "practice", correct: true, timestamp: new Date(Date.now() - 1000 * 60 * 170).toISOString() },

  // Class 7: CLASS-7A
  { studentSessionId: "stud-701", classCode: "CLASS-7A", concept: "nutrition-in-plants-photosynthesis", conceptName: "Autotrophic Nutrition & Stomata", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 165).toISOString() },
  { studentSessionId: "stud-702", classCode: "CLASS-7A", concept: "nutrition-in-plants-photosynthesis", conceptName: "Autotrophic Nutrition & Stomata", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 155).toISOString() },
  { studentSessionId: "stud-703", classCode: "CLASS-7A", concept: "simple-linear-equations-solving", conceptName: "Solving Linear Equations in One Variable", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 145).toISOString() },

  // Class 8: CLASS-8A
  { studentSessionId: "stud-801", classCode: "CLASS-8A", concept: "force-contact-noncontact-pressure", conceptName: "Force, Friction and Pressure", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString() },
  { studentSessionId: "stud-802", classCode: "CLASS-8A", concept: "force-contact-noncontact-pressure", conceptName: "Force, Friction and Pressure", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 135).toISOString() },
  { studentSessionId: "stud-803", classCode: "CLASS-8A", concept: "cell-structure-organelles", conceptName: "Cell Structure: Plant vs Animal Cells", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 125).toISOString() },

  // Class 9: CLASS-9A
  { studentSessionId: "stud-901", classCode: "CLASS-9A", concept: "motion-equations-kinematics", conceptName: "Equations of Uniformly Accelerated Motion", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { studentSessionId: "stud-902", classCode: "CLASS-9A", concept: "motion-equations-kinematics", conceptName: "Equations of Uniformly Accelerated Motion", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 115).toISOString() },
  { studentSessionId: "stud-903", classCode: "CLASS-9A", concept: "newton-laws-of-motion-momentum", conceptName: "Newton's Three Laws of Motion & Momentum", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 105).toISOString() },
  { studentSessionId: "stud-904", classCode: "CLASS-9A", concept: "real-numbers-irrational-rational", conceptName: "Rational & Irrational Numbers", type: "practice", correct: true, timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString() },

  // Class 10: CLASS-10A
  { studentSessionId: "seed-stud-01", classCode: "CLASS-10A", concept: "discriminant-nature-of-roots", conceptName: "Discriminant & Nature of Roots", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
  { studentSessionId: "seed-stud-02", classCode: "CLASS-10A", concept: "discriminant-nature-of-roots", conceptName: "Discriminant & Nature of Roots", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 160).toISOString() },
  { studentSessionId: "seed-stud-03", classCode: "CLASS-10A", concept: "discriminant-nature-of-roots", conceptName: "Discriminant & Nature of Roots", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString() },
  { studentSessionId: "seed-stud-04", classCode: "CLASS-10A", concept: "discriminant-nature-of-roots", conceptName: "Discriminant & Nature of Roots", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString() },
  { studentSessionId: "seed-stud-05", classCode: "CLASS-10A", concept: "quadratic-formula", conceptName: "Quadratic Formula", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 130).toISOString() },
  { studentSessionId: "seed-stud-06", classCode: "CLASS-10A", concept: "quadratic-formula", conceptName: "Quadratic Formula", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { studentSessionId: "seed-stud-07", classCode: "CLASS-10A", concept: "quadratic-formula", conceptName: "Quadratic Formula", type: "practice", correct: true, timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString() },
  { studentSessionId: "seed-stud-08", classCode: "CLASS-10A", concept: "excretion-nephron-filtration", conceptName: "Nephron Structure & Filtration", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 100).toISOString() },
  { studentSessionId: "seed-stud-09", classCode: "CLASS-10A", concept: "excretion-nephron-filtration", conceptName: "Nephron Structure & Filtration", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString() },
  { studentSessionId: "seed-stud-10", classCode: "CLASS-10A", concept: "excretion-nephron-filtration", conceptName: "Nephron Structure & Filtration", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { studentSessionId: "seed-stud-11", classCode: "CLASS-10A", concept: "refraction-snells-law-refractive-index", conceptName: "Snell's Law & Refractive Index", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString() },
  { studentSessionId: "seed-stud-12", classCode: "CLASS-10A", concept: "refraction-snells-law-refractive-index", conceptName: "Snell's Law & Refractive Index", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString() },

  // Class 11: CLASS-11-SCI
  { studentSessionId: "stud-1101", classCode: "CLASS-11-SCI", concept: "laws-of-motion-friction-circular", conceptName: "Static, Kinetic Friction & Banking of Roads", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { studentSessionId: "stud-1102", classCode: "CLASS-11-SCI", concept: "laws-of-motion-friction-circular", conceptName: "Static, Kinetic Friction & Banking of Roads", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString() },
  { studentSessionId: "stud-1103", classCode: "CLASS-11-SCI", concept: "mole-concept-molarity-stoichiometry", conceptName: "Mole Concept, Avogadro Constant & Molarity", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 70).toISOString() },

  // Class 12: CLASS-12-SCI
  { studentSessionId: "stud-1201", classCode: "CLASS-12-SCI", concept: "coulomb-law-gauss-law-electric-field", conceptName: "Coulomb's Law & Gauss's Law", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { studentSessionId: "stud-1202", classCode: "CLASS-12-SCI", concept: "coulomb-law-gauss-law-electric-field", conceptName: "Coulomb's Law & Gauss's Law", type: "practice", correct: false, timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString() },
  { studentSessionId: "stud-1203", classCode: "CLASS-12-SCI", concept: "calculus-integrals-methods-properties", conceptName: "Indefinite & Definite Integrals", type: "doubt", correct: null, timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString() },
  { studentSessionId: "stud-1204", classCode: "CLASS-12-SCI", concept: "solutions-raoults-law-colligative-properties", conceptName: "Raoult's Law & Colligative Properties", type: "practice", correct: true, timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() }
];

const CONCEPT_NAME_MAP: Record<string, { name: string; chapter: string }> = {
  // Class 6
  "components-of-food-nutrients": { name: "Nutrients, Balanced Diet & Deficiency Diseases (भोजन के घटक)", chapter: "Class 6 Ch 1: Science" },
  "prime-composite-hcf-lcm": { name: "Prime Numbers, HCF and LCM (अभाज्य संख्याएँ)", chapter: "Class 6 Ch 3: Mathematics" },

  // Class 7
  "nutrition-in-plants-photosynthesis": { name: "Autotrophic Nutrition & Stomata (पादपों में पोषण)", chapter: "Class 7 Ch 1: Science" },
  "simple-linear-equations-solving": { name: "Solving Linear Equations in One Variable (सरल समीकरण)", chapter: "Class 7 Ch 4: Mathematics" },

  // Class 8
  "force-contact-noncontact-pressure": { name: "Force, Friction and Pressure (बल और दाब)", chapter: "Class 8 Ch 11: Science" },
  "cell-structure-organelles": { name: "Cell Structure: Plant vs Animal Cells (कोशिका संरचना)", chapter: "Class 8 Ch 8: Science" },

  // Class 9
  "real-numbers-irrational-rational": { name: "Rational & Irrational Numbers (संख्या पद्धति)", chapter: "Class 9 Ch 1: Mathematics" },
  "motion-equations-kinematics": { name: "Equations of Motion (गति के समीकरण)", chapter: "Class 9 Ch 8: Science" },
  "newton-laws-of-motion-momentum": { name: "Newton's Laws & Conservation of Momentum (न्यूटन के नियम)", chapter: "Class 9 Ch 9: Science" },

  // Class 10
  "fundamental-theorem-of-arithmetic": { name: "Fundamental Theorem of Arithmetic (अंकगणित की आधारभूत प्रमेय)", chapter: "Class 10 Ch 1: Real Numbers" },
  "quadratic-standard-form": { name: "Standard Form (ax² + bx + c = 0)", chapter: "Class 10 Ch 4: Quadratic Equations" },
  "factoring-method": { name: "Factoring Method (गुणनखंड विधि)", chapter: "Class 10 Ch 4: Quadratic Equations" },
  "quadratic-formula": { name: "Quadratic Formula (द्विघाती सूत्र)", chapter: "Class 10 Ch 4: Quadratic Equations" },
  "discriminant-nature-of-roots": { name: "Discriminant & Nature of Roots (विविक्तकर)", chapter: "Class 10 Ch 4: Quadratic Equations" },
  "trigonometric-ratios-identities": { name: "Trigonometric Identities (त्रिकोणमिति)", chapter: "Class 10 Ch 8: Mathematics" },
  "chemical-reactions-types-balancing": { name: "Chemical Reactions & Equations (रासायनिक अभिक्रियाएँ)", chapter: "Class 10 Ch 1: Science" },
  "autotrophic-photosynthesis": { name: "Photosynthesis (प्रकाश संश्लेषण)", chapter: "Class 10 Ch 6: Life Processes" },
  "heterotrophic-digestion-human": { name: "Human Digestive System (पाचन तंत्र)", chapter: "Class 10 Ch 6: Life Processes" },
  "respiration-aerobic-anaerobic-atp": { name: "Aerobic vs Anaerobic Respiration (श्वसन)", chapter: "Class 10 Ch 6: Life Processes" },
  "human-circulatory-system-heart": { name: "Heart & Double Circulation (दोहरा परिसंचरण)", chapter: "Class 10 Ch 6: Life Processes" },
  "excretion-nephron-filtration": { name: "Nephron Structure & Urine Filtration (वृक्काणु)", chapter: "Class 10 Ch 6: Life Processes" },
  "spherical-mirrors-concave-convex": { name: "Concave & Convex Mirrors (गोलीय दर्पण)", chapter: "Class 10 Ch 10: Light" },
  "mirror-formula-magnification": { name: "Mirror Formula & Magnification (1/v + 1/u = 1/f)", chapter: "Class 10 Ch 10: Light" },
  "refraction-snells-law-refractive-index": { name: "Snell's Law & Refractive Index (स्नेल का नियम)", chapter: "Class 10 Ch 10: Light" },
  "lens-formula-magnification": { name: "Lens Formula (1/v - 1/u = 1/f)", chapter: "Class 10 Ch 10: Light" },
  "power-of-lens": { name: "Power of a Lens & Dioptre (P = 1/f)", chapter: "Class 10 Ch 10: Light" },
  "civics-power-sharing-belgium-sri-lanka": { name: "Power Sharing in Democracy (सत्ता की साझेदारी)", chapter: "Class 10 Ch 1: Social Science" },

  // Class 10 Expansions
  "electricity-ohms-law-resistance-joule": { name: "Ohm's Law, Resistance & Joule's Heating (विद्युत एवं ओम का नियम)", chapter: "Class 10 Ch 12: Science" },
  "acids-bases-salts-ph-scale": { name: "Acids, Bases, pH Scale & Important Salts (अम्ल, क्षारक एवं लवण)", chapter: "Class 10 Ch 2: Science" },
  "arithmetic-progression-nth-term-sum": { name: "Arithmetic Progression (AP): nth Term & Sum (समांतर श्रेढ़ी)", chapter: "Class 10 Ch 5: Mathematics" },
  "carbon-covalent-bonding-homologous-series": { name: "Carbon: Covalent Bonds & Homologous Series (कार्बन एवं उसके यौगिक)", chapter: "Class 10 Ch 4: Science" },
  "control-coordination-neuron-reflex-hormones": { name: "Control & Coordination: Neurons, Reflex Arc & Hormones (नियंत्रण एवं समन्वय)", chapter: "Class 10 Ch 7: Science" },
  "magnetic-effects-current-fleming-rules-motor": { name: "Magnetic Effects of Electric Current & Fleming's Rules (विद्युत धारा के चुंबकीय प्रभाव)", chapter: "Class 10 Ch 13: Science" },

  // Class 6 Expansions
  "motion-measurement-distances-si-units": { name: "Motion, Distance Measurement & SI Units (गति एवं दूरियों का मापन)", chapter: "Class 6 Ch 10: Science" },
  "fractions-decimals-representation": { name: "Fractions and Decimals (भिन्न एवं दशमलव)", chapter: "Class 6 Ch 7: Mathematics" },
  "civics-understanding-diversity-unity": { name: "Understanding Diversity (विविधता की समझ)", chapter: "Class 6 Ch 1: Social Science" },
  "geography-earth-in-solar-system": { name: "The Earth in Solar System (सौरमंडल में पृथ्वी)", chapter: "Class 6 Ch 1: Social Science" },

  // Class 7 Expansions
  "heat-temperature-conduction-convection-radiation": { name: "Heat Transfer: Conduction & Radiation (ऊष्मा)", chapter: "Class 7 Ch 4: Science" },
  "lines-angles-complementary-supplementary": { name: "Lines and Angles (रेखा एवं कोण)", chapter: "Class 7 Ch 5: Mathematics" },
  "geography-environment-ecosystem": { name: "Environment & Ecosystem (पर्यावरण एवं पारितंत्र)", chapter: "Class 7 Ch 1: Social Science" },
  "civics-on-equality-constitution-midday-meal": { name: "On Equality & Midday Meal (समानता)", chapter: "Class 7 Ch 1: Social Science" },

  // Class 8 Expansions
  "sound-vibration-frequency-amplitude-pitch": { name: "Sound: Vibration, Frequency & Pitch (ध्वनि)", chapter: "Class 8 Ch 13: Science" },
  "math-rational-numbers-properties": { name: "Rational Numbers & Properties (परिमेय संख्याएँ)", chapter: "Class 8 Ch 1: Mathematics" },
  "math-mensuration-area-perimeter-volume": { name: "Mensuration: Area & Volume (क्षेत्रमिति)", chapter: "Class 8 Ch 11: Mathematics" },
  "geography-resources-sustainable-development": { name: "Resources & Sustainable Development (संसाधन)", chapter: "Class 8 Ch 1: Social Science" },

  // Class 9 Expansions
  "gravitation-universal-law-free-fall-buoyancy": { name: "Universal Law of Gravitation (गुरुत्वाकर्षण)", chapter: "Class 9 Ch 10: Science" },
  "work-energy-kinetic-potential-power": { name: "Work, Energy & Power (कार्य तथा ऊर्जा)", chapter: "Class 9 Ch 11: Science" },
  "math-polynomials-remainder-factor-theorem": { name: "Polynomials & Remainder Theorem (बहुपद)", chapter: "Class 9 Ch 2: Mathematics" },
  "math-triangles-congruence-criteria": { name: "Congruence of Triangles (त्रिभुज सर्वांगसमता)", chapter: "Class 9 Ch 7: Mathematics" },
  "civics-what-is-democracy-features": { name: "What is Democracy? (लोकतंत्र क्या और क्यों?)", chapter: "Class 9 Ch 1: Social Science" },

  // Class 10 Expansions
  "economics-development-per-capita-income-hdi": { name: "Development, Per Capita Income & HDI (विकास)", chapter: "Class 10 Ch 1: Social Science" },
  "math-coordinate-geometry-distance-section-formula": { name: "Coordinate Geometry: Distance & Section (निर्देशांक ज्यामिति)", chapter: "Class 10 Ch 7: Mathematics" },
  "math-probability-theoretical-events": { name: "Theoretical Probability (प्रायिकता)", chapter: "Class 10 Ch 15: Mathematics" },

  // Class 11 Expansions
  "physics-thermodynamics-first-law-heat-engine": { name: "Thermodynamics: First Law & Processes (ऊष्मागतिकी)", chapter: "Class 11 Ch 12: Physics" },
  "chemical-bonding-vsepr-hybridization-mot": { name: "Chemical Bonding: VSEPR, Hybridization & MOT (रासायनिक आबंधन)", chapter: "Class 11 Ch 4: Chemistry" },
  "math-sets-relations-operations-demorgan": { name: "Sets & De Morgan's Laws (समुच्चय सिद्धांत)", chapter: "Class 11 Ch 1: Mathematics" },
  "math-limits-derivatives-first-principle": { name: "Limits & First Principle Derivatives (सीमा और अवकलज)", chapter: "Class 11 Ch 13: Mathematics" },
  "bio-cell-cycle-mitosis-meiosis": { name: "Cell Cycle, Mitosis & Meiosis (कोशिका चक्र व विभाजन)", chapter: "Class 11 Ch 10: Biology" },

  // Class 12 Expansions
  "current-electricity-kirchhoff-wheatstone": { name: "Current Electricity & Kirchhoff's Rules (धारा विद्युत)", chapter: "Class 12 Ch 3: Physics" },
  "chemical-kinetics-rate-order-half-life": { name: "Chemical Kinetics: Rate & Half-Life (रासायनिक बलगतिकी)", chapter: "Class 12 Ch 4: Chemistry" },
  "electrochemistry-nernst-equation-kohlrausch": { name: "Electrochemistry: Nernst Equation & Kohlrausch's Law (वैद्युतरसायन)", chapter: "Class 12 Ch 2: Chemistry" },
  "wave-optics-huygens-ydse-interference-diffraction": { name: "Wave Optics: Huygens' Principle & YDSE (तरंग प्रकाशिकी)", chapter: "Class 12 Ch 10: Physics" },
  "math-matrices-determinants-inverse": { name: "Matrices, Determinants & Inverses (आव्यूह एवं सारणिक)", chapter: "Class 12 Ch 3: Mathematics" },
  "math-conditional-probability-bayes-theorem": { name: "Bayes' Theorem & Conditional Probability (बेज़ प्रमेय)", chapter: "Class 12 Ch 13: Mathematics" },
  "bio-molecular-basis-dna-replication-transcription-translation": { name: "Molecular Basis of Inheritance (वंशागति का आण्विक आधार)", chapter: "Class 12 Ch 6: Biology" },
  "bio-biotechnology-recombinant-dna-pcr": { name: "Biotechnology: rDNA & PCR (जैव प्रौद्योगिकी)", chapter: "Class 12 Ch 11: Biology" }
};

export function initEventStore() {
  if (!fs.existsSync(EVENTS_DIR)) {
    fs.mkdirSync(EVENTS_DIR, { recursive: true });
  }

  // Always make sure events file exists and contains rich multi-class seed events
  let shouldSeed = !fs.existsSync(EVENTS_FILE);
  if (!shouldSeed) {
    try {
      const existing = fs.readFileSync(EVENTS_FILE, "utf-8");
      if (!existing.includes("CLASS-6A") || !existing.includes("CLASS-12-SCI")) {
        shouldSeed = true;
      }
    } catch {
      shouldSeed = true;
    }
  }

  if (shouldSeed) {
    const lines = SEED_EVENTS.map(e => JSON.stringify(e)).join("\n") + "\n";
    fs.writeFileSync(EVENTS_FILE, lines, "utf-8");
    console.log(`[EventStore] Initialized events spine with ${SEED_EVENTS.length} multi-class seeded events.`);
  }
}

export function logEvent(entry: Omit<EventLogEntry, "timestamp">): EventLogEntry {
  initEventStore();

  const fullEntry: EventLogEntry = {
    ...entry,
    classCode: entry.classCode || "CLASS-10A",
    timestamp: new Date().toISOString(),
    conceptName: CONCEPT_NAME_MAP[entry.concept]?.name || entry.concept
  };

  const line = JSON.stringify(fullEntry) + "\n";
  fs.appendFileSync(EVENTS_FILE, line, "utf-8");
  return fullEntry;
}

export function readAllEvents(classCode?: string): EventLogEntry[] {
  initEventStore();
  try {
    const raw = fs.readFileSync(EVENTS_FILE, "utf-8");
    const lines = raw.split("\n").filter(l => l.trim().length > 0);
    const events: EventLogEntry[] = lines.map(l => JSON.parse(l));

    if (classCode && classCode.trim() !== "" && classCode !== "ALL" && classCode !== "ALL-COHORTS") {
      return events.filter(e => e.classCode.toUpperCase() === classCode.toUpperCase());
    }
    return events;
  } catch (err) {
    console.error("[EventStore] Error reading events:", err);
    return [];
  }
}

export function getStudentAskedConcepts(studentSessionId: string): string[] {
  const all = readAllEvents();
  const studentEvents = all.filter(e => e.studentSessionId === studentSessionId);
  const concepts = Array.from(new Set(studentEvents.map(e => e.concept)));
  return concepts;
}

export function getTeacherSummary(classCode: string = "CLASS-10A"): TeacherSummaryResponse {
  const events = readAllEvents(classCode);
  const studentIds = new Set(events.map(e => e.studentSessionId));

  // Aggregate stats per concept
  const conceptMap = new Map<string, {
    doubtCount: number;
    practiceAttempts: number;
    practiceWrong: number;
  }>();

  events.forEach(e => {
    const c = e.concept;
    if (!conceptMap.has(c)) {
      conceptMap.set(c, { doubtCount: 0, practiceAttempts: 0, practiceWrong: 0 });
    }
    const stat = conceptMap.get(c)!;

    if (e.type === "doubt") {
      stat.doubtCount++;
    } else if (e.type === "practice") {
      stat.practiceAttempts++;
      if (e.correct === false) {
        stat.practiceWrong++;
      }
    }
  });

  const conceptStats: TeacherConceptStat[] = Array.from(conceptMap.entries()).map(([tag, stat]) => {
    const meta = CONCEPT_NAME_MAP[tag] || { name: tag, chapter: "NCERT Class 10" };
    // Struggle score formula: (Doubts * 1.5) + (Practice Wrong * 2.0)
    const struggleScore = (stat.doubtCount * 1.5) + (stat.practiceWrong * 2.0);
    const totalInteractions = stat.doubtCount + stat.practiceAttempts;

    return {
      conceptTag: tag,
      conceptName: meta.name,
      chapterTitle: meta.chapter,
      doubtCount: stat.doubtCount,
      practiceAttempts: stat.practiceAttempts,
      practiceWrong: stat.practiceWrong,
      struggleScore,
      totalInteractions
    };
  });

  // Sort by highest struggle score first
  conceptStats.sort((a, b) => b.struggleScore - a.struggleScore);

  return {
    classCode,
    totalStudents: studentIds.size,
    totalEvents: events.length,
    conceptStats,
    recentEvents: events.slice(-15).reverse(),
    isSampleData: true
  };
}
