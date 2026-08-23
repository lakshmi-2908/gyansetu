import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  BookOpen,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Trash2,
  Volume2,
  VolumeX,
  Compass,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Flame,
  X
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { DoubtMessage, Citation, NCERTConceptMeta } from "../types.ts";

interface DoubtsViewProps {
  messages: DoubtMessage[];
  onAskDoubt: (query: string, simplify?: boolean) => Promise<void>;
  onClearThread?: () => void;
  isLoading: boolean;
  loadingPhase: string;
  errorMessage: string | null;
  onClearError: () => void;
  selectedClassLevel: number | "ALL";
  selectedSubject: string;
  onSelectClassLevel: (lvl: number | "ALL") => void;
  onSelectSubject: (subj: string) => void;
  availableConcepts?: NCERTConceptMeta[];
}

const EXAMPLE_DOUBTS = [
  {
    language: "English",
    label: "Class 10 Math",
    text: "What is the discriminant formula and how does it determine the nature of roots?",
    concept: "Discriminant & Roots",
    classLevel: 10,
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30"
  },
  {
    language: "हिंदी (Hindi)",
    label: "कक्षा 10 विज्ञान",
    text: "प्रकाश के अपवर्तन का क्या अर्थ है और स्नेल का नियम समझाइए?",
    concept: "अपवर्तन व स्नेल का नियम",
    classLevel: 10,
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
  },
  {
    language: "Hinglish",
    label: "Class 10 Biology",
    text: "Nephron ka structure kaisa hota hai aur urine filtration Glomerulus me kaise hoti hai?",
    concept: "Nephron & Excretion",
    classLevel: 10,
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
  },
  {
    language: "English",
    label: "Class 9 Physics",
    text: "State Newton's Universal Law of Gravitation and explain why acceleration due to gravity g is independent of mass.",
    concept: "Gravitation & Free Fall",
    classLevel: 9,
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30"
  },
  {
    language: "English",
    label: "Class 12 Physics",
    text: "State Coulomb's Law in vector form and define 1 Coulomb of electric charge.",
    concept: "Electrostatics & Coulomb Law",
    classLevel: 12,
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30"
  },
  {
    language: "English",
    label: "Class 8 Science",
    text: "What is the difference between contact and non-contact forces? Give examples of friction and electrostatic force.",
    concept: "Force & Pressure",
    classLevel: 8,
    badgeColor: "text-teal-400 bg-teal-500/10 border-teal-500/30"
  }
];

const PROMPT_ACCELERATORS = [
  { 
    label: "Formula & Derivation", 
    prefix: "Please provide the step-by-step formula derivation for: ",
    icon: Sparkles,
    defaultTopicByClass: {
      "6": "Prime Numbers & LCM/HCF",
      "7": "Linear Equations in One Variable",
      "8": "Force, Pressure & Friction (P = F/A)",
      "9": "Equations of Uniformly Accelerated Motion (v = u + at, s = ut + 1/2at²)",
      "10": "Quadratic Formula & Nature of Roots (ax² + bx + c = 0, D = b² - 4ac)",
      "11": "Friction & Banking of Roads",
      "12": "Coulomb's Law & Gauss's Law",
      "ALL": "Quadratic Formula (ax² + bx + c = 0)"
    }
  },
  { 
    label: "NCERT Board Exam Tips", 
    prefix: "What are the key NCERT textbook points to write in CBSE Board Exam for: ",
    icon: ShieldCheck,
    defaultTopicByClass: {
      "6": "Nutrients and Balanced Diet",
      "7": "Nutrition in Plants & Photosynthesis",
      "8": "Cell Structure: Plant vs Animal Cells",
      "9": "Newton's Three Laws of Motion & Momentum",
      "10": "Nephron Structure & Urine Filtration",
      "11": "Mole Concept & Molarity",
      "12": "Raoult's Law & Colligative Properties",
      "ALL": "Nephron Structure & Urine Filtration"
    }
  },
  { 
    label: "Real-world Example", 
    prefix: "Explain with an everyday intuitive real-world example: ",
    icon: Lightbulb,
    defaultTopicByClass: {
      "6": "Deficiency Diseases",
      "7": "Autotrophic Nutrition & Stomata",
      "8": "Contact vs Non-contact Forces",
      "9": "Inertia and Conservation of Momentum",
      "10": "Refraction of Light & Snell's Law",
      "11": "Static vs Kinetic Friction",
      "12": "Electric Charge & Coulomb's Law",
      "ALL": "Refraction of Light & Snell's Law"
    }
  },
  { 
    label: "Bilingual (हिंदी+Eng)", 
    prefix: "Explain in simple bilingual Hinglish with key English terms: ",
    icon: HelpCircle,
    defaultTopicByClass: {
      "6": "भोजन के प्रमुख पोषक तत्व (Nutrients)",
      "7": "पादपों में पोषण (Photosynthesis)",
      "8": "बल और दाब (Force & Pressure)",
      "9": "न्यूटन के गति के नियम (Laws of Motion)",
      "10": "द्विघात समीकरण और विविक्तकर (Quadratic Equations)",
      "11": "घर्षण और बंकन (Friction & Motion)",
      "12": "कूलॉम का नियम और गाउस प्रमेय (Coulomb & Gauss Law)",
      "ALL": "द्विघात समीकरण और विविक्तकर (Quadratic Equations)"
    }
  }
];

export const DoubtsView: React.FC<DoubtsViewProps> = ({
  messages,
  onAskDoubt,
  onClearThread,
  isLoading,
  loadingPhase,
  errorMessage,
  onClearError,
  selectedClassLevel,
  selectedSubject,
  onSelectClassLevel,
  onSelectSubject,
  availableConcepts = []
}) => {
  const [inputQuery, setInputQuery] = useState("");
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    const q = inputQuery.trim();
    setInputQuery("");
    onAskDoubt(q);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleExampleClick = (text: string) => {
    setInputQuery(text);
    inputRef.current?.focus();
  };

  const handleAcceleratorClick = (acc: typeof PROMPT_ACCELERATORS[0]) => {
    const classKey = String(selectedClassLevel);
    const defaultTopic = acc.defaultTopicByClass[classKey as keyof typeof acc.defaultTopicByClass] || acc.defaultTopicByClass["ALL"];

    if (inputQuery.trim()) {
      setInputQuery(`${acc.prefix}${inputQuery.trim()}`);
    } else if (messages.length > 0) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === "user")?.content || defaultTopic;
      const cleanPrev = lastUserMsg.replace(/^(Please provide the step-by-step formula derivation for|What are the key NCERT textbook points to write in CBSE Board Exam for|Explain with an everyday intuitive real-world example|Explain in simple bilingual Hinglish with key English terms)[\s:]*/i, "");
      setInputQuery(`${acc.prefix}${cleanPrev}`);
    } else {
      setInputQuery(`${acc.prefix}${defaultTopic}`);
    }
    inputRef.current?.focus();
  };

  const handleSimplify = (lastUserQuestion: string) => {
    onAskDoubt(lastUserQuestion, true);
  };

  const handleCopyAnswer = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSpeak = (id: string, text: string) => {
    if (!("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown formatting & citations
    const cleanText = text
      .replace(/\[NCERT.*?\]/g, "")
      .replace(/[*#`_\[\]()]/g, " ")
      .replace(/\n+/g, ". ");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Check if Hindi text is present to select Hindi or Indian English voice
    const hasHindiChars = /[\u0900-\u097F]/.test(cleanText);
    const voices = window.speechSynthesis.getVoices();
    
    if (hasHindiChars) {
      const hiVoice = voices.find(v => v.lang.startsWith("hi") || v.name.includes("Hindi"));
      if (hiVoice) utterance.voice = hiVoice;
      utterance.lang = "hi-IN";
    } else {
      const inVoice = voices.find(v => v.lang.includes("en-IN") || v.name.includes("India") || v.lang.startsWith("en"));
      if (inVoice) utterance.voice = inVoice;
      utterance.lang = "en-IN";
    }

    utterance.rate = 0.95; // Slightly slower, clear teaching pace
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingId(id);
  };

  const filteredExamples = EXAMPLE_DOUBTS.filter((ex) => {
    if (selectedClassLevel === "ALL") return true;
    return ex.classLevel === selectedClassLevel;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/70 border border-slate-800 p-5 shadow-xl shadow-black/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  NCERT Grounded Doubt Solver <span className="text-amber-400 text-base font-normal font-sans">(संदेह निवारण)</span>
                </h2>
                <span className="font-mono text-[11px] bg-emerald-500/10 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-medium">
                  {selectedClassLevel === "ALL" ? "Classes 6–12" : `Class ${selectedClassLevel}`} • {selectedSubject}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-2xl">
                Ask any doubt in <strong className="text-amber-300 font-semibold">English</strong>, <strong className="text-emerald-300 font-semibold">हिंदी</strong>, or <strong className="text-cyan-300 font-semibold">Hinglish</strong>. Powered by direct NCERT curriculum grounding with verified chapter references and step-by-step reasoning.
              </p>
            </div>
          </div>

          {messages.length > 0 && onClearThread && (
            <button
              onClick={onClearThread}
              className="shrink-0 flex items-center gap-1 text-[11px] font-mono text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm"
              title="Clear current doubt thread"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Thread</span>
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="bg-rose-950/40 border border-rose-800/80 rounded-xl p-3.5 flex items-start justify-between gap-3 text-xs sm:text-sm text-rose-300">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={onClearError} className="font-mono text-xs underline hover:opacity-80 cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Suggested Starting Questions */}
      {messages.length === 0 && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-lg backdrop-blur-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              What do you want to learn today?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
              Select an example question below or type any doubt from your textbook:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left pt-2">
            {filteredExamples.map((ex, i) => (
              <button
                key={i}
                onClick={() => handleExampleClick(ex.text)}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 hover:border-amber-500/40 text-xs transition-all flex flex-col justify-between gap-2 hover:shadow-md hover:shadow-amber-500/5 group cursor-pointer"
              >
                <div className="flex items-center justify-between gap-1 w-full font-mono text-[10px]">
                  <span className={`px-2 py-0.5 rounded-md font-semibold border ${ex.badgeColor}`}>
                    {ex.language}
                  </span>
                  <span className="text-slate-400 font-medium group-hover:text-amber-300 transition-colors">{ex.label}</span>
                </div>
                <p className="font-medium text-slate-200 group-hover:text-white line-clamp-2 leading-relaxed">{ex.text}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conversation Thread */}
      {messages.length > 0 && (
        <div className="space-y-6">
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";

            if (isUser) {
              return (
                <div key={msg.id || index} className="flex justify-end">
                  <div className="max-w-[85%] bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 rounded-2xl rounded-tr-xs px-5 py-3.5 shadow-lg shadow-amber-500/10">
                    <div className="flex items-center justify-between gap-3 text-[11px] font-mono text-slate-900/70 mb-1 font-semibold">
                      <span>Student Doubt</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <p className="text-sm font-semibold whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                </div>
              );
            }

            // Assistant Response Card
            const isUngrounded = msg.groundingStatus === "ungrounded" || !msg.isGrounded;

            return (
              <div
                key={msg.id || index}
                className={`rounded-2xl p-5 sm:p-6 border shadow-xl backdrop-blur-md space-y-4 ${
                  isUngrounded
                    ? "bg-slate-900/95 border-amber-500/30 shadow-amber-500/5"
                    : "bg-slate-900/90 border-slate-800 shadow-black/20"
                }`}
              >
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full border ${
                        isUngrounded
                          ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
                          : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-xs shadow-emerald-500/10"
                      }`}
                    >
                      {isUngrounded ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      ) : (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                      <span>{msg.groundingBadge || (isUngrounded ? "Not found in indexed chapters" : "NCERT Grounded")}</span>
                    </span>

                    {!isUngrounded && msg.classLevel && (
                      <span className="text-[11px] font-mono bg-purple-500/10 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30 font-semibold">
                        Class {msg.classLevel} {msg.subject ? `• ${msg.subject}` : ""}
                      </span>
                    )}

                    {msg.isSimplified && (
                      <span className="text-[11px] font-mono bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
                        Simplified Language
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    {msg.brainUsed && (
                      <span className="bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800 text-slate-300" title="AI Brain Engine">
                        Brain: <strong className="text-amber-400 font-semibold">{msg.brainUsed}</strong>
                      </span>
                    )}
                    {msg.latencyMs && <span className="text-slate-500">{msg.latencyMs}ms</span>}
                  </div>
                </div>

                {/* Markdown Answer */}
                <div className="prose prose-invert max-w-none text-sm sm:text-[15px] leading-relaxed text-slate-200">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-3 last:mb-0 text-slate-200">{children}</p>,
                      ol: ({ children }) => <ol className="space-y-2 my-2 list-decimal list-inside text-slate-200">{children}</ol>,
                      ul: ({ children }) => <ul className="space-y-1.5 my-2 list-disc list-inside text-slate-200">{children}</ul>,
                      li: ({ children }) => <li className="leading-relaxed text-slate-200">{children}</li>,
                      strong: ({ children }) => <strong className="font-bold text-amber-300">{children}</strong>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-emerald-500 pl-3 my-2 text-xs italic bg-slate-950/80 p-2.5 rounded-r text-slate-300">
                          {children}
                        </blockquote>
                      ),
                      code: ({ children }) => (
                        <code className="font-mono text-xs bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-semibold">
                          {children}
                        </code>
                      )
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Citations List & Actions */}
                <div className="pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {msg.citations && msg.citations.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-mono font-medium text-slate-400 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        Source pages:
                      </span>
                      {msg.citations.map((c, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => setSelectedCitation(c)}
                          className="font-mono text-[11px] bg-slate-950 hover:bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                          title={`Click to view verified snippet from Class ${c.classLevel || 10} ${c.subject || ""} ${c.chapter}`}
                        >
                          <span className="font-bold text-amber-300">Class {c.classLevel || msg.classLevel || 10}</span>
                          <span className="text-slate-500">•</span>
                          <span>p. {c.pageNumber}</span>
                          <span className="text-slate-500 text-[10px]">({c.conceptTag.split("-")[0]})</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] font-mono text-amber-400/90 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Ungrounded response (concept not found in indexed NCERT chapters)</span>
                    </div>
                  )}

                  {/* Audio, Copy & Simplification */}
                  <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
                    <button
                      onClick={() => handleToggleSpeak(msg.id || `msg-${index}`, msg.content)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        speakingId === (msg.id || `msg-${index}`)
                          ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20"
                          : "bg-slate-950 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700"
                      }`}
                      title={speakingId === (msg.id || `msg-${index}`) ? "Stop Audio Playback" : "Suno & Seekho (Listen in Vernacular Hindi/English Voice)"}
                    >
                      {speakingId === (msg.id || `msg-${index}`) ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-slate-950" />
                          <span className="font-mono font-bold">Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Suno &amp; Seekho (Audio)</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyAnswer(msg.id || `msg-${index}`, msg.content)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                      title="Copy explanation"
                    >
                      {copiedId === (msg.id || `msg-${index}`) ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {!isUngrounded && (
                      <button
                        onClick={() => {
                          const prevUserMsg = messages[index - 1]?.content || "Explain this topic";
                          handleSimplify(prevUserMsg);
                        }}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-300 hover:text-amber-200 border border-amber-500/30 hover:border-amber-500/60 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                        title="Explain with simpler vocabulary"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Explain simply (सरल भाषा)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg animate-pulse">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-300">
                <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin shrink-0" />
                <span className="font-mono text-amber-300">
                  {loadingPhase || "Retrieving NCERT textbook chunks across indexed chapters..."}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input & Form Area */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4.5 shadow-2xl backdrop-blur-md sticky bottom-4 space-y-3">
        {/* Quick Format Accelerators */}
        <div className="flex flex-col gap-1.5 pb-1">
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
            <span className="text-slate-500 shrink-0">Quick format:</span>
            {PROMPT_ACCELERATORS.map((acc, aIdx) => {
              const Icon = acc.icon;
              return (
                <button
                  key={aIdx}
                  type="button"
                  onClick={() => handleAcceleratorClick(acc)}
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer font-medium"
                >
                  <Icon className="w-3 h-3 text-amber-400" />
                  <span>{acc.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Topic Chips */}
          {availableConcepts && availableConcepts.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono text-slate-400">
              <span className="text-slate-600 shrink-0">Insert topic:</span>
              {availableConcepts
                .filter(c => selectedClassLevel === "ALL" || c.classLevel === selectedClassLevel)
                .slice(0, 7)
                .map((c, cIdx) => (
                  <button
                    key={cIdx}
                    type="button"
                    onClick={() => {
                      const prefix = inputQuery.trim() ? `${inputQuery.trim()} ` : "Explain ";
                      setInputQuery(`${prefix}${c.conceptName} (Class ${c.classLevel})`);
                      inputRef.current?.focus();
                    }}
                    className="shrink-0 px-2 py-0.5 rounded-md bg-slate-950/70 hover:bg-emerald-950/50 text-slate-400 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer"
                  >
                    + {c.conceptName.split(" ")[0]} {c.conceptName.split(" ")[1] || ""}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1 relative bg-slate-950 rounded-xl border border-slate-800 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500/30 transition-all shadow-inner">
            <textarea
              ref={inputRef}
              id="input-doubt-query"
              rows={2}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your doubt in English, हिंदी or Hinglish (e.g., Why does concave mirror form real image?)..."
              disabled={isLoading}
              className="w-full bg-transparent px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none resize-none font-sans"
            />
          </div>

          <button
            id="btn-submit-doubt"
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            aria-label="Send doubt"
            className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/25 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            title="Send doubt (Enter)"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Verified Citation Modal */}
      {selectedCitation && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Verified NCERT Excerpt
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedCitation.chapter} (Page {selectedCitation.pageNumber})
                </h3>
              </div>
              <button
                onClick={() => setSelectedCitation(null)}
                aria-label="Close citation preview"
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-h-60 overflow-y-auto">
              "{selectedCitation.textSnippet}"
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
              <span>Concept Tag: {selectedCitation.conceptTag}</span>
              <button
                onClick={() => setSelectedCitation(null)}
                className="px-3 py-1.5 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
