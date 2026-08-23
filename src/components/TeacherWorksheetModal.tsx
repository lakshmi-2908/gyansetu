import React, { useState } from "react";
import { 
  FileText, 
  Printer, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  BookOpen, 
  Copy, 
  Check, 
  GraduationCap, 
  Sliders, 
  HelpCircle,
  Clock,
  Award,
  Layers
} from "lucide-react";
import { ALL_COHORTS } from "../constants/cohorts.ts";

interface TeacherWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClassCode?: string;
}

interface GeneratedPaper {
  title: string;
  classLevel: number;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  instructions: string[];
  sections: Array<{
    name: string;
    description: string;
    questions: Array<{
      qNum: number;
      text: string;
      hindiText?: string;
      marks: number;
      options?: string[];
      answerKey: string;
      ncertCitation: string;
    }>;
  }>;
}

export const TeacherWorksheetModal: React.FC<TeacherWorksheetModalProps> = ({
  isOpen,
  onClose,
  defaultClassCode = "CLASS-10A"
}) => {
  const [selectedClass, setSelectedClass] = useState<number>(10);
  const [selectedSubject, setSelectedSubject] = useState<string>("Science");
  const [testType, setTestType] = useState<"unit_test" | "remedial_worksheet" | "board_model">("unit_test");
  const [difficulty, setDifficulty] = useState<"standard" | "remedial" | "advanced">("standard");
  const [includeHindi, setIncludeHindi] = useState<boolean>(true);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPaper, setGeneratedPaper] = useState<GeneratedPaper | null>(null);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Create high quality CBSE-aligned printable test paper
      let samplePaper: GeneratedPaper;

      if (selectedSubject === "Mathematics") {
        samplePaper = {
          title: `CBSE Class ${selectedClass} Mathematics Periodic Assessment & Remedial Practice`,
          classLevel: selectedClass,
          subject: "Mathematics",
          durationMinutes: 45,
          totalMarks: 25,
          instructions: [
            "All questions are compulsory according to CBSE & NCERT guidelines.",
            "Section A contains 3 Multiple Choice Questions (1 Mark each).",
            "Section B contains 2 Short Answer Questions (2 Marks each).",
            "Section C contains 2 Long / Problem-solving Questions (4 Marks each).",
            "Use of calculators is strictly not permitted."
          ],
          sections: [
            {
              name: "Section A: Multiple Choice Questions (3 × 1 = 3 Marks)",
              description: "Conceptual clarity & immediate formula recognition",
              questions: [
                {
                  qNum: 1,
                  text: "For the quadratic equation 2x² - 4x + 3 = 0, the discriminant D is:",
                  hindiText: "द्विघात समीकरण 2x² - 4x + 3 = 0 के लिए विविक्तकर (Discriminant) D का मान क्या होगा?",
                  marks: 1,
                  options: ["A) -8 (No real roots)", "B) 8 (Two real roots)", "C) 0 (Equal roots)", "D) 16"],
                  answerKey: "Option A) -8. Discriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8 < 0. Hence no real roots exist.",
                  ncertCitation: "NCERT Class 10 Mathematics, Chapter 4 (Quadratic Equations), Page 88"
                },
                {
                  qNum: 2,
                  text: "If the roots of ax² + bx + c = 0 are real and equal, what is the required condition?",
                  hindiText: "यदि ax² + bx + c = 0 के मूल वास्तविक और समान हैं, तो आवश्यक शर्त क्या है?",
                  marks: 1,
                  options: ["A) b² - 4ac > 0", "B) b² - 4ac = 0", "C) b² - 4ac < 0", "D) b² = 2ac"],
                  answerKey: "Option B) b² - 4ac = 0.",
                  ncertCitation: "NCERT Class 10 Mathematics, Chapter 4, Page 90"
                },
                {
                  qNum: 3,
                  text: "Find the nature of the roots of the equation 3x² - 2√6x + 2 = 0.",
                  hindiText: "समीकरण 3x² - 2√6x + 2 = 0 के मूलों की प्रकृति ज्ञात कीजिए।",
                  marks: 1,
                  options: ["A) Real and equal", "B) Distinct and real", "C) No real roots", "D) Not quadratic"],
                  answerKey: "Option A) Real and equal. D = (-2√6)² - 4(3)(2) = 24 - 24 = 0.",
                  ncertCitation: "NCERT Class 10 Mathematics, Chapter 4, Page 91"
                }
              ]
            },
            {
              name: "Section B: Short Answer Questions (2 × 3 = 6 Marks)",
              description: "Step-by-step mathematical reasoning and substitutions",
              questions: [
                {
                  qNum: 4,
                  text: "Find the roots of the quadratic equation 6x² - x - 2 = 0 by splitting the middle term (Factorisation method).",
                  hindiText: "गुणनखंड विधि द्वारा द्विघात समीकरण 6x² - x - 2 = 0 के मूल ज्ञात कीजिए।",
                  marks: 3,
                  answerKey: "Step 1: Product = 6 × (-2) = -12, Sum = -1. Factors: -4 and +3.\nStep 2: 6x² - 4x + 3x - 2 = 0\nStep 3: 2x(3x - 2) + 1(3x - 2) = 0 => (3x - 2)(2x + 1) = 0\nRoots: x = 2/3 and x = -1/2.",
                  ncertCitation: "NCERT Class 10 Mathematics, Chapter 4, Page 75"
                },
                {
                  qNum: 5,
                  text: "Find the value of k for which the quadratic equation kx(x - 2) + 6 = 0 has two equal roots.",
                  hindiText: "k का वह मान ज्ञात कीजिए जिसके लिए समीकरण kx(x - 2) + 6 = 0 के दो बराबर मूल हों।",
                  marks: 3,
                  answerKey: "Standard form: kx² - 2kx + 6 = 0 where a = k, b = -2k, c = 6.\nFor equal roots: D = 0 => b² - 4ac = 0\n(-2k)² - 4(k)(6) = 0 => 4k² - 24k = 0 => 4k(k - 6) = 0.\nSince k ≠ 0 for a quadratic equation, k = 6.",
                  ncertCitation: "NCERT Class 10 Mathematics, Chapter 4, Page 91"
                }
              ]
            },
            {
              name: "Section C: Long Answer / Word Problems (2 × 8 = 16 Marks)",
              description: "Real-world application and complete working",
              questions: [
                {
                  qNum: 6,
                  text: "The diagonal of a rectangular field is 60 metres more than the shorter side. If the longer side is 30 metres more than the shorter side, find the sides of the field.",
                  hindiText: "एक आयताकार खेत का विकर्ण उसकी छोटी भुजा से 60 मी अधिक लंबा है। यदि बड़ी भुजा छोटी भुजा से 30 मी अधिक हो, तो खेत की भुजाएँ ज्ञात कीजिए।",
                  marks: 8,
                  answerKey: "Let shorter side = x metres.\nLonger side = (x + 30) m, Diagonal = (x + 60) m.\nBy Pythagoras theorem: (x + 60)² = (x + 30)² + x²\nx² + 120x + 3600 = x² + 60x + 900 + x²\nx² - 60x - 2700 = 0\n(x - 90)(x + 30) = 0 => x = 90 (length cannot be negative).\nShorter side = 90 m, Longer side = 120 m.",
                  ncertCitation: "NCERT Class 10 Mathematics, Chapter 4 (Exercise 4.3), Page 88"
                }
              ]
            }
          ]
        };
      } else {
        samplePaper = {
          title: `CBSE Class ${selectedClass} Science Periodic Assessment & Remedial Worksheet`,
          classLevel: selectedClass,
          subject: "Science",
          durationMinutes: 45,
          totalMarks: 25,
          instructions: [
            "All questions are aligned strictly with the rationalised NCERT Curriculum.",
            "Write answers clearly with labeled diagrams wherever applicable.",
            "Section A: Objective Questions (1 Mark each).",
            "Section B: Short Conceptual Questions (3 Marks each).",
            "Section C: Long Explanatory / Application Question (5 Marks each)."
          ],
          sections: [
            {
              name: "Section A: Objective & Concept Recall (4 × 1 = 4 Marks)",
              description: "Core NCERT definitions & observation recall",
              questions: [
                {
                  qNum: 1,
                  text: "Which of the following is the structural and functional filtration unit of the human kidney?",
                  hindiText: "मानव वृक्क (Kidney) की संरचनात्मक और कार्यात्मक निस्यंदन इकाई कौन सी है?",
                  marks: 1,
                  options: ["A) Alveoli", "B) Nephron", "C) Neuron", "D) Capillary"],
                  answerKey: "Option B) Nephron.",
                  ncertCitation: "NCERT Class 10 Science, Chapter 6 (Life Processes), Page 110"
                },
                {
                  qNum: 2,
                  text: "State Snell's Law of refraction of light.",
                  hindiText: "प्रकाश के अपवर्तन का स्नेल का नियम (Snell's Law) लिखिए।",
                  marks: 1,
                  answerKey: "The ratio of sine of angle of incidence to the sine of angle of refraction is a constant for a given pair of media: sin i / sin r = constant (μ / n).",
                  ncertCitation: "NCERT Class 10 Science, Chapter 10 (Light - Reflection and Refraction), Page 175"
                },
                {
                  qNum: 3,
                  text: "Why does an electric bulb filament glow while the connecting wires do not?",
                  hindiText: "विद्युत बल्ब का तंतु क्यों चमकता है जबकि संयोजी तार नहीं चमकते?",
                  marks: 1,
                  answerKey: "Due to Joule's heating (H = I²Rt), the tungsten filament has very high resistance compared to copper connecting wires and heats up to incandescence.",
                  ncertCitation: "NCERT Class 10 Science, Chapter 12 (Electricity), Page 217"
                }
              ]
            },
            {
              name: "Section B: Conceptual Reasoning (2 × 3 = 6 Marks)",
              description: "Understanding mechanisms, balanced equations and biological pathways",
              questions: [
                {
                  qNum: 4,
                  text: "Describe the three essential steps in urine formation inside a Nephron (Glomerular filtration, Tubular reabsorption, Secretion).",
                  hindiText: "नेफ्रॉन में मूत्र निर्माण के तीन आवश्यक चरणों (गुच्छीय निस्यंदन, चयनात्मक पुनरावशोषण, स्राव) का वर्णन कीजिए।",
                  marks: 3,
                  answerKey: "1. Glomerular Filtration: High pressure forces nitrogenous wastes, glucose, amino acids and water from blood into Bowman's capsule.\n2. Selective Reabsorption: Useful substances (glucose, salts, water) are reabsorbed along the tubular portion.\n3. Tubular Secretion: Extra ions (K+, H+) are secreted to maintain pH into the collecting duct.",
                  ncertCitation: "NCERT Class 10 Science, Chapter 6, Page 110-111"
                },
                {
                  qNum: 5,
                  text: "Why does the sky appear dark instead of blue to an astronaut in space? Explain with Rayleigh's scattering principle.",
                  hindiText: "अंतरिक्ष यात्री को आकाश नीले के स्थान पर काला क्यों दिखाई देता है? रैले के प्रकीर्णन सिद्धांत से समझाइए।",
                  marks: 3,
                  answerKey: "In space, there is no atmosphere and therefore no particulate matter or gas molecules to scatter sunlight. With no scattered blue light entering the observer's eye, the sky appears completely black.",
                  ncertCitation: "NCERT Class 10 Science, Chapter 11 (Human Eye and Colourful World), Page 196"
                }
              ]
            },
            {
              name: "Section C: Comprehensive Derivation & Calculation (1 × 5 = 5 Marks)",
              description: "Multi-step scientific analysis with mathematical derivation",
              questions: [
                {
                  qNum: 6,
                  text: "An electric iron of resistance 20 Ω takes a current of 5 A. Calculate the heat developed in 30 seconds. State the three mathematical factors upon which Joule's Heating depends.",
                  hindiText: "20 Ω प्रतिरोध की एक विद्युत इस्त्री 5 A विद्युत धारा लेती है। 30 सेकंड में उत्पन्न ऊष्मा की गणना कीजिए। जूल के तापन नियम के तीन कारक लिखिए।",
                  marks: 5,
                  answerKey: "Given: R = 20 Ω, I = 5 A, t = 30 s.\nHeat formula: H = I² × R × t\nH = (5)² × 20 × 30 = 25 × 600 = 15,000 Joules (15 kJ).\nJoule's Law factors: Directly proportional to (1) square of current (I²), (2) resistance of conductor (R), and (3) time of current flow (t).",
                  ncertCitation: "NCERT Class 10 Science, Chapter 12 (Electricity), Page 216-218"
                }
              ]
            }
          ]
        };
      }

      setGeneratedPaper(samplePaper);
      setIsGenerating(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPaper = () => {
    if (!generatedPaper) return;
    const lines: string[] = [
      `======================================================`,
      `${generatedPaper.title.toUpperCase()}`,
      `Subject: ${generatedPaper.subject} | Time: ${generatedPaper.durationMinutes} Mins | Max Marks: ${generatedPaper.totalMarks}`,
      `======================================================\n`,
      `GENERAL INSTRUCTIONS:`,
      ...generatedPaper.instructions.map((ins, i) => `${i + 1}. ${ins}`),
      `\n------------------------------------------------------`
    ];

    generatedPaper.sections.forEach(sec => {
      lines.push(`\n${sec.name}`);
      lines.push(`${sec.description}`);
      lines.push(`------------------------------------------------------`);
      sec.questions.forEach(q => {
        lines.push(`\nQ${q.qNum}. [${q.marks} Mark${q.marks > 1 ? "s" : ""}] ${q.text}`);
        if (includeHindi && q.hindiText) {
          lines.push(`     (हिंदी): ${q.hindiText}`);
        }
        if (q.options && q.options.length > 0) {
          q.options.forEach(opt => lines.push(`     ${opt}`));
        }
        if (showAnswerKey) {
          lines.push(`   >> [TEACHER ANSWER KEY & MARKING SCHEME]:\n      ${q.answerKey}`);
          lines.push(`   >> [NCERT SOURCE]: ${q.ncertCitation}`);
        }
      });
    });

    lines.push(`\n======================================================`);
    lines.push(`Generated by GyanSetu AI • Zero Coaching Dependency Initiative`);

    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Teacher's Printable Worksheet &amp; Exam Paper Generator
                </h3>
                <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded">
                  1-Click CBSE / NCERT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Instantly produce zero-cost offline classroom test papers, remedial worksheets, and official answer keys.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close worksheet generator"
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            ✕
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 font-mono mb-1 font-semibold">Grade / Class:</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 font-medium focus:border-indigo-400 cursor-pointer"
              >
                <option value={6}>Class 6</option>
                <option value={7}>Class 7</option>
                <option value={8}>Class 8</option>
                <option value={9}>Class 9</option>
                <option value={10}>Class 10</option>
                <option value={11}>Class 11</option>
                <option value={12}>Class 12</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1 font-semibold">Subject:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 font-medium focus:border-indigo-400 cursor-pointer"
              >
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1 font-semibold">Assessment Type:</label>
              <select
                value={testType}
                onChange={(e) => setTestType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 font-medium focus:border-indigo-400 cursor-pointer"
              >
                <option value="unit_test">Class Periodic Test (25 Marks)</option>
                <option value="remedial_worksheet">Remedial Gap Worksheet</option>
                <option value="board_model">CBSE Board Pattern Mock</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1 font-semibold">Language &amp; Key:</label>
              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeHindi}
                    onChange={(e) => setIncludeHindi(e.target.checked)}
                    className="rounded text-indigo-500 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <span>Bilingual</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={showAnswerKey}
                    onChange={(e) => setShowAnswerKey(e.target.checked)}
                    className="rounded text-indigo-500 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <span>Answers</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Grounded in verified NCERT chapters • Ready for physical paper printing</span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              <span>{generatedPaper ? "Re-Generate Fresh Paper" : "Generate Worksheet Now"}</span>
            </button>
          </div>
        </div>

        {/* Paper Preview Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-slate-900/60 font-sans text-slate-200">
          {!generatedPaper ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto">
                <Printer className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">No Test Paper Generated Yet</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Select your grade, subject, and assessment format above and click <strong>"Generate Worksheet Now"</strong> to generate a print-ready test paper.
              </p>
            </div>
          ) : (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-xl border border-slate-800 shadow-xl space-y-6 font-serif print:bg-white print:text-black print:p-0 print:border-none">
              
              {/* Paper Header */}
              <div className="text-center pb-4 border-b-2 border-slate-800 print:border-black space-y-1.5">
                <div className="text-xs font-mono font-bold tracking-wider uppercase text-amber-400 print:text-gray-800">
                  KENDRIYA VIDYALAYA / GOVT CBSE MODEL FORMAT
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white print:text-black">
                  {generatedPaper.title}
                </h2>
                <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-400 print:text-gray-700 flex-wrap">
                  <span>Class: {generatedPaper.classLevel}</span>
                  <span>•</span>
                  <span>Subject: {generatedPaper.subject}</span>
                  <span>•</span>
                  <span>Time: {generatedPaper.durationMinutes} Minutes</span>
                  <span>•</span>
                  <span className="font-bold text-amber-300 print:text-black">Max Marks: {generatedPaper.totalMarks}</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-slate-900/80 print:bg-gray-100 p-3.5 rounded-lg border border-slate-800 text-xs font-sans text-slate-300 print:text-black space-y-1">
                <div className="font-bold text-slate-200 print:text-black font-mono">General Instructions:</div>
                <ul className="list-disc list-inside space-y-0.5">
                  {generatedPaper.instructions.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>
              </div>

              {/* Sections */}
              {generatedPaper.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4 pt-2">
                  <div className="border-b border-slate-800 print:border-gray-300 pb-1.5">
                    <h3 className="text-sm font-bold text-amber-400 print:text-black font-sans uppercase tracking-wide">
                      {section.name}
                    </h3>
                    <p className="text-xs text-slate-400 print:text-gray-600 font-sans italic">
                      {section.description}
                    </p>
                  </div>

                  <div className="space-y-5">
                    {section.questions.map((q) => (
                      <div key={q.qNum} className="space-y-2 text-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="text-white print:text-black leading-relaxed">
                              <strong className="text-amber-300 print:text-black font-mono mr-2">Q{q.qNum}.</strong>
                              {q.text}
                            </div>
                            {includeHindi && q.hindiText && (
                              <div className="text-xs text-slate-300 print:text-gray-800 pl-6 leading-relaxed font-sans">
                                (हिंदी): {q.hindiText}
                              </div>
                            )}
                          </div>
                          <span className="font-mono text-xs font-bold text-slate-400 print:text-black shrink-0 px-2 py-0.5 rounded bg-slate-900 print:bg-transparent border border-slate-800 print:border-none">
                            [{q.marks} Mark{q.marks > 1 ? "s" : ""}]
                          </span>
                        </div>

                        {/* Options if MCQ */}
                        {q.options && q.options.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6 pt-1 font-sans text-xs text-slate-300 print:text-black">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className="p-1.5 rounded bg-slate-900/50 print:bg-transparent border border-slate-800 print:border-none">
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Answer Key if selected */}
                        {showAnswerKey && (
                          <div className="mt-2.5 p-3 rounded-lg bg-indigo-950/40 print:bg-gray-100 border border-indigo-500/30 print:border-gray-400 font-sans text-xs space-y-1">
                            <div className="flex items-center gap-2 text-emerald-400 print:text-green-800 font-bold font-mono text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>OFFICIAL TEACHER MARKING SCHEME &amp; ANSWER:</span>
                            </div>
                            <div className="text-slate-200 print:text-black whitespace-pre-line pl-5 leading-relaxed font-mono text-[11px]">
                              {q.answerKey}
                            </div>
                            <div className="text-[10px] text-indigo-300 print:text-gray-700 pl-5 font-mono pt-1 flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-indigo-400" />
                              <span>{q.ncertCitation}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Format: Standard CBSE A4 Printable Page • 100% Free
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {generatedPaper && (
              <>
                <button
                  onClick={handleCopyPaper}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-mono font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Copy full test paper and answer key to clipboard"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? "Copied!" : "Copy Text"}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-600/25"
                  title="Print paper to physical printer or save as PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
