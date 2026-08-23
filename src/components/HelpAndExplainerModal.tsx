import React, { useState } from "react";
import {
  X,
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  GraduationCap,
  Award,
  Users,
  ShieldCheck,
  Languages,
  Mic,
  ArrowRight,
  Lightbulb,
  HeartHandshake,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  Compass,
  Check
} from "lucide-react";

interface HelpAndExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt?: (prompt: string, classLevel?: number, subject?: string) => void;
  onNavigateTab?: (tab: "doubts" | "practice" | "teacher" | "scholarships") => void;
}

type GuideTab = "about" | "how-to-use" | "sample-questions" | "scholarships" | "faq";

export const HelpAndExplainerModal: React.FC<HelpAndExplainerModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
  onNavigateTab
}) => {
  const [activeGuideTab, setActiveGuideTab] = useState<GuideTab>("about");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyOrTry = (text: string, classLevel?: number, subject?: string) => {
    if (onSelectPrompt) {
      onSelectPrompt(text, classLevel, subject);
      onClose();
    } else {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="bg-[#0f172a] border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl shadow-amber-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-[#131d35] to-slate-900 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0d1322] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="help-modal-title" className="text-lg sm:text-xl font-bold font-serif text-white tracking-tight">
                  ज्ञानसेतु (GyanSetu) — User Guide & Explainer
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full hidden sm:inline-block">
                  100% Free & Open
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                AI for Equitable Education Access • AI-powered NCERT Tutor, Practice Engine & Scholarship Finder
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close help modal"
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Navigation */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-800/80 bg-slate-900/50 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-thin">
          <button
            onClick={() => setActiveGuideTab("about")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeGuideTab === "about"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>What is GyanSetu? (क्या है यह?)</span>
          </button>

          <button
            onClick={() => setActiveGuideTab("how-to-use")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeGuideTab === "how-to-use"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>How to Use (उपयोग विधि)</span>
          </button>

          <button
            onClick={() => setActiveGuideTab("sample-questions")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeGuideTab === "sample-questions"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Sample Questions (क्या पूछें?)</span>
          </button>

          <button
            onClick={() => setActiveGuideTab("scholarships")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeGuideTab === "scholarships"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Scholarships & Aid</span>
          </button>

          <button
            onClick={() => setActiveGuideTab("faq")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeGuideTab === "faq"
                ? "bg-amber-500 text-slate-950 shadow-md font-bold shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQs & Support</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm leading-relaxed text-slate-300">
          {/* TAB 1: WHAT IS GYANSETU? */}
          {activeGuideTab === "about" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Mission Hero Banner */}
              <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 rounded-xl p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    Our Core Mission: Education for Every Child
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white leading-tight">
                    A Free, Citation-Grounded AI Bridge for Every Student in India
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    <strong>GyanSetu (ज्ञानसेतु = “Bridge of Knowledge”)</strong> was built to solve a crucial challenge: 
                    Millions of students across India lack access to expensive private tuition (₹2,000–₹10,000/month). 
                    GyanSetu provides <strong>instant 24/7 personalized tutoring, adaptive practice, and scholarship guidance</strong> completely free of charge, with zero ads and zero paywalls.
                  </p>
                </div>
              </div>

              {/* The 4 Pillars of Equitable Access */}
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Why GyanSetu is Built Differently (The 4 Pillars)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                      <BookOpen className="w-4 h-4" />
                      <span>1. Strict NCERT Grounding</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Standard AI often invents out-of-syllabus answers or makes math mistakes. GyanSetu strictly retrieves verified <strong>NCERT Classes 6–12 textbooks</strong> and provides exact Chapter, Topic, and Page citations for board exam accuracy.
                    </p>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                      <Languages className="w-4 h-4" />
                      <span>2. Truly Bilingual (English, Hindi & Hinglish)</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Language should never be a barrier to learning. Students can ask doubts naturally in <strong>Devanagari Hindi (हिंदी)</strong>, <strong>transliterated Hinglish</strong> (*"photosynthesis kaise hota hai?"*), or formal English.
                    </p>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                      <ZapIcon className="w-4 h-4" />
                      <span>3. Zero Downtime & Low-Bandwidth Mode</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Engineered for rural connectivity. Powered by a 3-tier intelligent router (Primary OpenRouter + Fallback Gemini + Offline NCERT Grounded Engine). It works fast even on slow 2G/3G mobile networks.
                    </p>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                      <Award className="w-4 h-4" />
                      <span>4. Government Scholarship Guidance</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Equitable access goes beyond homework. GyanSetu indexes official Indian national and state scholarships (NMMS, PM-YASASVI, Pre/Post-Matric) to ensure deserving students get financial support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Who is this for? */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Who Can Benefit from GyanSetu?
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white">School Students (Classes 6 to 12):</strong> Get instant homework help, step-by-step formula derivations, board exam revision points, and practice tests.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white">Parents & Guardians:</strong> A safe, ad-free, syllabus-checked tool to support children&apos;s studies at home without expensive coaching classes.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-white">Teachers & Rural Educators:</strong> Use the Teacher Intel dashboard to identify which concepts their classroom struggles with the most, helping them tailor remedial lectures.
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setActiveGuideTab("how-to-use")}
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:brightness-110 cursor-pointer"
                >
                  <span>See How to Use GyanSetu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  Close & Start Learning
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: HOW TO USE */}
          {activeGuideTab === "how-to-use" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  How to Use GyanSetu (कदम-दर-कदम गाइड)
                </h3>
                <p className="text-xs text-slate-400">
                  Explore each feature below to make the most of your learning sessions.
                </p>
              </div>

              {/* Feature Step 1: Doubt Solver */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Ask Doubts (24/7 NCERT AI Tutor)</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">Doubt Solver Tab</span>
                      </h4>
                    </div>
                  </div>
                  {onNavigateTab && (
                    <button
                      onClick={() => {
                        onNavigateTab("doubts");
                        onClose();
                      }}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      Go to Doubts <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <ul className="text-xs text-slate-300 space-y-2 pl-3 list-disc marker:text-amber-400">
                  <li><strong>Type or Speak:</strong> Type your question in English, Hindi, or Hinglish, or click the <Mic className="w-3.5 h-3.5 inline text-amber-400" /> microphone icon to speak.</li>
                  <li><strong>Select Grade & Subject:</strong> Use the top bar (e.g. <em>Grade: Cl 10, Subject: Science</em>) to filter the exact NCERT curriculum.</li>
                  <li><strong>One-Click Accelerators:</strong> Click prompt buttons like <em>&quot;Formula &amp; Derivation&quot;</em> or <em>&quot;NCERT Board Exam Tips&quot;</em> to format your question quickly.</li>
                  <li><strong>Explain More Simply:</strong> If an answer seems too complex, click the <em>&quot;Explain more simply (आसान भाषा में)&quot;</em> button underneath the response for a simplified, real-world breakdown.</li>
                  <li><strong>Check Textbook Citations:</strong> Look for the verified green badge with Chapter and Page numbers at the bottom of every answer.</li>
                </ul>
              </div>

              {/* Feature Step 2: Practice Set */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Take Adaptive Practice &amp; Track Mastery</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">Practice Set Tab</span>
                      </h4>
                    </div>
                  </div>
                  {onNavigateTab && (
                    <button
                      onClick={() => {
                        onNavigateTab("practice");
                        onClose();
                      }}
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      Go to Practice <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <ul className="text-xs text-slate-300 space-y-2 pl-3 list-disc marker:text-emerald-400">
                  <li><strong>Generate Targeted Quizzes:</strong> Click &quot;Generate New Practice Set&quot; or select any struggling topic from the <strong>Concept Mastery Map</strong>.</li>
                  <li><strong>Instant Feedback:</strong> Select your answer to immediately see if it&apos;s correct, along with an NCERT textbook explanation.</li>
                  <li><strong>Track Progress:</strong> Your mastery map updates in real time, marking concepts as <em>Mastered</em> (green), <em>In Progress</em> (amber), or <em>Needs Review</em> (red).</li>
                </ul>
              </div>

              {/* Feature Step 3: Scholarships */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Find Government Scholarships &amp; Aid</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono">Scholarships &amp; Aid Tab</span>
                      </h4>
                    </div>
                  </div>
                  {onNavigateTab && (
                    <button
                      onClick={() => {
                        onNavigateTab("scholarships");
                        onClose();
                      }}
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      Go to Scholarships <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <ul className="text-xs text-slate-300 space-y-2 pl-3 list-disc marker:text-cyan-400">
                  <li><strong>Eligibility Checker:</strong> Select your Grade, Gender, and Category to view matching schemes (e.g., NMMS, PM-YASASVI, Begum Hazrat Mahal, Pre-Matric SC/ST).</li>
                  <li><strong>AI Application Drafter:</strong> Generate custom, professional scholarship application letters with 1 click to submit to your school principal or government portal.</li>
                </ul>
              </div>

              {/* Feature Step 4: Teacher Intel */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Teacher Intel &amp; Classroom Struggle Analytics</span>
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono">Teacher Intel Tab</span>
                      </h4>
                    </div>
                  </div>
                  {onNavigateTab && (
                    <button
                      onClick={() => {
                        onNavigateTab("teacher");
                        onClose();
                      }}
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      Go to Teacher Intel <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <ul className="text-xs text-slate-300 space-y-2 pl-3 list-disc marker:text-indigo-400">
                  <li><strong>Cohort Codes:</strong> Teachers assign a code like <code>CLASS-10A</code>. As students practice, aggregated anonymized struggle rates are automatically calculated.</li>
                  <li><strong>Remedial Lesson Plans:</strong> The AI identifies the top 3 high-friction topics and suggests targeted lesson plans for tomorrow&apos;s class.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: SAMPLE QUESTIONS */}
          {activeGuideTab === "sample-questions" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Sample Doubts to Try (उदाहरण प्रश्न)
                </h3>
                <p className="text-xs text-slate-400">
                  Click <strong>&quot;Try in Doubt Solver&quot;</strong> on any question below to test how GyanSetu grounds its answer in NCERT textbooks.
                </p>
              </div>

              {/* Class 10 Board Essentials */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Class 10 CBSE Board Essentials (10वीं बोर्ड परीक्षा)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-amber-400 font-bold">Science • Electricity</span>
                        <span className="text-slate-500 font-mono">Ch 12</span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 mt-1">
                        &quot;What is Ohm&apos;s Law? State the formula V = IR and define the SI unit of resistance (Ohm).&quot;
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyOrTry("What is Ohm's Law? State the formula V = IR and define the SI unit of resistance (Ohm).", 10, "Science")}
                      className="w-full flex items-center justify-center gap-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try in Doubt Solver</span>
                    </button>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-emerald-400 font-bold">हिंदी (Hinglish) • Biology</span>
                        <span className="text-slate-500 font-mono">Ch 6</span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 mt-1">
                        &quot;Nephron ka diagram kaisa hota hai aur urine filtration Glomerulus me kaise hoti hai?&quot;
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyOrTry("Nephron ka diagram kaisa hota hai aur urine filtration Glomerulus me kaise hoti hai?", 10, "Science")}
                      className="w-full flex items-center justify-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30 text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try in Doubt Solver</span>
                    </button>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-cyan-400 font-bold">Mathematics • Quadratics</span>
                        <span className="text-slate-500 font-mono">Ch 4</span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 mt-1">
                        &quot;What is the discriminant formula D = b² - 4ac and how does it determine the nature of real roots?&quot;
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyOrTry("What is the discriminant formula D = b² - 4ac and how does it determine the nature of real roots?", 10, "Mathematics")}
                      className="w-full flex items-center justify-center gap-1.5 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try in Doubt Solver</span>
                    </button>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-rose-400 font-bold">हिंदी (Devanagari) • Science</span>
                        <span className="text-slate-500 font-mono">Ch 10</span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 mt-1">
                        &quot;प्रकाश के अपवर्तन और स्नेल के नियम को चित्र सहित समझाइए।&quot;
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyOrTry("प्रकाश के अपवर्तन और स्नेल के नियम को चित्र सहित समझाइए।", 10, "Science")}
                      className="w-full flex items-center justify-center gap-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-slate-950 border border-rose-500/30 text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try in Doubt Solver</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Class 9 & Middle School Basics */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <h4 className="text-xs font-mono font-bold uppercase text-teal-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Classes 6–9 Foundation Concepts
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-teal-400 font-bold">Class 9 Physics • Motion</span>
                        <span className="text-slate-500 font-mono">Ch 8</span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 mt-1">
                        &quot;Derive the three equations of uniformly accelerated motion: v = u + at, s = ut + 1/2at², and v² = u² + 2as.&quot;
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyOrTry("Derive the three equations of uniformly accelerated motion: v = u + at, s = ut + 1/2at², and v² = u² + 2as.", 9, "Science")}
                      className="w-full flex items-center justify-center gap-1.5 bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 border border-teal-500/30 text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try in Doubt Solver</span>
                    </button>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-purple-400 font-bold">Class 8 Science • Forces</span>
                        <span className="text-slate-500 font-mono">Ch 11</span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 mt-1">
                        &quot;What is the difference between contact forces and non-contact forces? Give real-world examples.&quot;
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyOrTry("What is the difference between contact forces and non-contact forces? Give real-world examples.", 8, "Science")}
                      className="w-full flex items-center justify-center gap-1.5 bg-purple-500/10 hover:bg-purple-500 text-purple-300 hover:text-slate-950 border border-purple-500/30 text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try in Doubt Solver</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Class 11 & 12 Senior Secondary */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <h4 className="text-xs font-mono font-bold uppercase text-blue-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Classes 11–12 Senior Secondary (IIT-JEE &amp; Boards)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-blue-400 font-bold">Class 12 Physics • Electrostatics</span>
                        <span className="text-slate-500 font-mono">Ch 1</span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 mt-1">
                        &quot;State Coulomb&apos;s Law in vector form and state Gauss&apos;s Theorem for electric flux.&quot;
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyOrTry("State Coulomb's Law in vector form and state Gauss's Theorem for electric flux.", 12, "Physics")}
                      className="w-full flex items-center justify-center gap-1.5 bg-blue-500/10 hover:bg-blue-500 text-blue-300 hover:text-slate-950 border border-blue-500/30 text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try in Doubt Solver</span>
                    </button>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-indigo-400 font-bold">Class 12 Math • Probability</span>
                        <span className="text-slate-500 font-mono">Ch 13</span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 mt-1">
                        &quot;State and prove Bayes&apos; Theorem for conditional probability with a standard example.&quot;
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyOrTry("State and prove Bayes' Theorem for conditional probability with a standard example.", 12, "Mathematics")}
                      className="w-full flex items-center justify-center gap-1.5 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-300 hover:text-slate-950 border border-indigo-500/30 text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try in Doubt Solver</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SCHOLARSHIPS & FINANCIAL AID */}
          {activeGuideTab === "scholarships" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-1">
                  <Award className="w-5 h-5" />
                  Government Scholarships &amp; Financial Support Schemes
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Many bright students in rural and economically disadvantaged families drop out of school simply because they cannot afford exam fees, stationery, or uniforms. GyanSetu provides direct information on top Indian scholarship programs that provide up to ₹12,000 to ₹50,000/year.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-300">
                  Key Scholarships Available in India
                </h4>

                <div className="space-y-3">
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">National Means-cum-Merit Scholarship (NMMS)</h5>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">₹12,000 / year</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      <strong>Target:</strong> Class 8 students studying in government/aided schools whose parental income is under ₹3.5 Lakh/year. Continues from Class 9 through 12.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">PM-YASASVI Scheme for OBC/EBC/DNT Students</h5>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">Up to ₹1,25,000 / year</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      <strong>Target:</strong> Meritorious students in Classes 9 and 11 from OBC, EBC, and Nomadic communities in top recognized schools.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">Pre-Matric &amp; Post-Matric SC/ST/OBC Scholarships</h5>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">₹3,500 – ₹13,500 / year</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      <strong>Target:</strong> Students from marginalized categories covering full tuition, book allowances, and exam fees via National Scholarship Portal (NSP).
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">CBSE Single Girl Child Scholarship</h5>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">₹6,000 / year</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      <strong>Target:</strong> Girl students who are the only child of their parents and secured 60%+ in Class 10 CBSE Board examinations.
                    </p>
                  </div>
                </div>
              </div>

              {onNavigateTab && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onNavigateTab("scholarships");
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md hover:brightness-110 cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Open Scholarships View &amp; Generate Application</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: FAQs */}
          {activeGuideTab === "faq" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Frequently Asked Questions (अक्सर पूछे जाने वाले सवाल)
                </h3>
                <p className="text-xs text-slate-400">
                  Quick answers to common questions about GyanSetu.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1.5">
                  <h5 className="font-bold text-white flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Is GyanSetu completely free to use?
                  </h5>
                  <p className="text-slate-300 leading-relaxed">
                    Yes, 100% free forever. No registration required, no credit card, no ads, and no hidden fees. We believe quality education is a fundamental human right (Article 21A, Right to Education).
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1.5">
                  <h5 className="font-bold text-white flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Which syllabus and grades are covered?
                  </h5>
                  <p className="text-slate-300 leading-relaxed">
                    GyanSetu covers the entire official <strong>NCERT Curriculum for Classes 6 through 12</strong> across Science, Mathematics, Physics, Chemistry, Biology, and Social Sciences. This is directly applicable to CBSE and all State Boards using NCERT books.
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1.5">
                  <h5 className="font-bold text-white flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Can I ask doubts in Hindi or Hinglish?
                  </h5>
                  <p className="text-slate-300 leading-relaxed">
                    Yes! You can write in Devanagari Hindi (e.g., *&quot;प्रकाश संश्लेषण क्या है?&quot;*), conversational Hinglish (e.g., *&quot;photosynthesis kaise hota hai?&quot;*), or formal English. GyanSetu responds in clear bilingual language with key English scientific terms highlighted.
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1.5">
                  <h5 className="font-bold text-white flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    How does GyanSetu prevent AI hallucination?
                  </h5>
                  <p className="text-slate-300 leading-relaxed">
                    Unlike generic chatbots that guess, GyanSetu uses strict <strong>Retrieval-Augmented Generation (RAG)</strong>. Before answering, it searches our indexed database of 73+ NCERT curriculum sections, verifies confidence, and provides the exact chapter and page number reference.
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1.5">
                  <h5 className="font-bold text-white flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    What if my internet connection is slow or drops?
                  </h5>
                  <p className="text-slate-300 leading-relaxed">
                    GyanSetu is optimized with minimal data payloads. Furthermore, if external cloud AI networks become unreachable, our built-in <strong>Offline Grounded Engine</strong> automatically synthesizes high-accuracy textbook answers directly without crashing.
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1.5">
                  <h5 className="font-bold text-white flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    How can schools or NGOs use the Teacher Intel feature?
                  </h5>
                  <p className="text-slate-300 leading-relaxed">
                    Teachers can tell their class to select a cohort code (like <code>CLASS-10A</code>). As students ask questions and take practice quizzes, the Teacher Intel dashboard automatically analyzes anonymized confusion patterns, giving teachers actionable insights for their next day&apos;s lesson.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-amber-400 font-bold">GyanSetu</span>
            <span>•</span>
            <span>Empowering Equitable Education for Bharat</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Got It / समझ गए
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
