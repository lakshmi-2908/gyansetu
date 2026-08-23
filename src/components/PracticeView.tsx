import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  BookOpen,
  Sparkles,
  Layers,
  Check,
  Target,
  Zap,
  HelpCircle,
  Network,
  Compass,
  BarChart3
} from "lucide-react";
import confetti from "canvas-confetti";
import { PracticeQuestion, NCERTConceptMeta } from "../types.ts";
import { ConceptMapVisualization } from "./ConceptMapVisualization.tsx";

interface PracticeViewProps {
  questions: PracticeQuestion[];
  isLoading: boolean;
  onGeneratePractice: (preferredConcept?: string) => Promise<void>;
  onSubmitAnswer: (conceptTag: string, questionId: string, selectedIndex: number, isCorrect: boolean) => void;
  studentSessionId: string;
  selectedClassLevel: number | "ALL";
  selectedSubject: string;
  onSelectClassLevel: (lvl: number | "ALL") => void;
  onSelectSubject: (subj: string) => void;
  availableConcepts?: NCERTConceptMeta[];
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  questions,
  isLoading,
  onGeneratePractice,
  onSubmitAnswer,
  studentSessionId,
  selectedClassLevel,
  selectedSubject,
  onSelectClassLevel,
  onSelectSubject,
  availableConcepts = []
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"quiz" | "map">("quiz");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<{ selected: number; isCorrect: boolean }>>([]);
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [isCompleted, setIsCompleted] = useState(false);
  const [userLiveAnswers, setUserLiveAnswers] = useState<
    Record<string, { attempts: number; correct: number; wrong: number }>
  >({});

  const currentQ = questions[currentIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIndex);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !currentQ || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQ.correctAnswerIndex;
    setIsAnswerSubmitted(true);

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = { selected: selectedOption, isCorrect };
    setUserAnswers(updatedAnswers);

    // Update live mastery state for the concept
    setUserLiveAnswers((prev) => {
      const existing = prev[currentQ.conceptTag] || { attempts: 0, correct: 0, wrong: 0 };
      const updated = {
        attempts: existing.attempts + 1,
        correct: existing.correct + (isCorrect ? 1 : 0),
        wrong: existing.wrong + (isCorrect ? 0 : 1)
      };
      const newState = { ...prev, [currentQ.conceptTag]: updated };

      // Persist to local session store
      try {
        const key = `gyansetu_mastery_${studentSessionId}`;
        const prevStored = JSON.parse(localStorage.getItem(key) || "{}");
        const merged = {
          ...prevStored,
          [currentQ.conceptTag]: {
            attempts: (prevStored[currentQ.conceptTag]?.attempts || 0) + 1,
            correct: (prevStored[currentQ.conceptTag]?.correct || 0) + (isCorrect ? 1 : 0),
            wrong: (prevStored[currentQ.conceptTag]?.wrong || 0) + (isCorrect ? 0 : 1)
          }
        };
        localStorage.setItem(key, JSON.stringify(merged));
      } catch {
        // ignore
      }

      return newState;
    });

    if (isCorrect) {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 }
      });
    }

    onSubmitAnswer(currentQ.conceptTag, currentQ.id, selectedOption, isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = (topic: string = selectedTopic) => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setIsCompleted(false);
    setActiveSubTab("quiz");
    onGeneratePractice(topic === "ALL" ? undefined : topic);
  };

  const handleSelectConceptFromMap = (conceptTag: string) => {
    setSelectedTopic(conceptTag);
    handleRestart(conceptTag);
  };

  const filteredConcepts = availableConcepts.filter((c) => {
    if (selectedClassLevel !== "ALL" && c.classLevel && c.classLevel !== selectedClassLevel) return false;
    if (selectedSubject !== "ALL" && c.subject && c.subject.toLowerCase() !== selectedSubject.toLowerCase()) return false;
    return true;
  });

  const correctCount = userAnswers.filter((a) => a?.isCorrect).length;
  const totalCount = questions.length;

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/40 border border-slate-800 p-5 shadow-xl shadow-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Adaptive Practice & Conceptual Mastery <span className="text-amber-400 text-base font-normal font-sans">(अभ्यास एवं ज्ञान मानचित्र)</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Targeted NCERT questions & progress tracking dynamically mapped across{" "}
            <span className="font-semibold text-amber-300 font-mono">
              {selectedClassLevel === "ALL" ? "Classes 6–12" : `Class ${selectedClassLevel}`} ({selectedSubject})
            </span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0 flex-wrap">
          <select
            id="select-practice-topic"
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              handleRestart(e.target.value);
            }}
            disabled={isLoading}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-amber-500 cursor-pointer shadow-inner"
          >
            <option value="ALL">Adaptive (Auto-target weak concepts)</option>
            {filteredConcepts.map((t) => (
              <option key={t.conceptTag} value={t.conceptTag}>
                {t.classLevel ? `Cl.${t.classLevel} ` : ""}{t.chapterTitle}: {t.conceptName}
              </option>
            ))}
            {filteredConcepts.length === 0 && (
              <>
                <option value="discriminant-nature-of-roots">Ch 4: Discriminant & Nature of Roots (Class 10)</option>
                <option value="quadratic-formula">Ch 4: Quadratic Formula & Roots (Class 10)</option>
                <option value="excretion-nephron-filtration">Ch 6: Nephron & Excretion (Class 10)</option>
                <option value="respiration-aerobic-anaerobic-atp">Ch 6: Respiration & ATP (Class 10)</option>
                <option value="refraction-snells-law-refractive-index">Ch 10: Snell's Law & Refraction (Class 10)</option>
                <option value="gravitation-universal-law">Ch 10: Gravitation & Free Fall (Class 9)</option>
                <option value="electrostatics-coulombs-law">Ch 1: Coulomb's Law & Electric Fields (Class 12)</option>
                <option value="force-contact-friction">Ch 11: Force & Pressure (Class 8)</option>
                <option value="components-of-food-nutrients">Ch 2: Components of Food (Class 6)</option>
              </>
            )}
          </select>

          <button
            id="btn-generate-practice"
            onClick={() => handleRestart(selectedTopic)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Set</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation: Switch between Practice Quiz & Conceptual Map */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab("quiz")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
              activeSubTab === "quiz"
                ? "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10"
                : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <Target className="w-4 h-4 text-amber-400" />
            <span>Active Practice Quiz</span>
            {questions.length > 0 && !isCompleted && (
              <span className="ml-1 px-1.5 py-0.2 rounded-md bg-amber-400/20 text-amber-300 text-[10px]">
                {currentIndex + 1}/{questions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab("map")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
              activeSubTab === "map"
                ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/40 shadow-sm shadow-indigo-500/10"
                : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <Network className="w-4 h-4 text-indigo-400" />
            <span>Conceptual Progress Map</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px]">
              {availableConcepts.length} Nodes
            </span>
          </button>
        </div>

        <span className="hidden sm:inline-flex text-[11px] font-mono text-slate-400 items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Click any concept to target practice</span>
        </span>
      </div>

      {/* VIEW 1: Conceptual Progress Map */}
      {activeSubTab === "map" && (
        <ConceptMapVisualization
          availableConcepts={availableConcepts}
          selectedClassLevel={selectedClassLevel}
          selectedSubject={selectedSubject}
          studentSessionId={studentSessionId}
          onSelectConceptForPractice={handleSelectConceptFromMap}
          userLiveAnswers={userLiveAnswers}
        />
      )}

      {/* VIEW 2: Active Practice Quiz */}
      {activeSubTab === "quiz" && (
        <>
          {/* Loading State */}
          {isLoading && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3.5 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full border-3 border-amber-400 border-t-transparent animate-spin mx-auto" />
              <p className="font-bold text-base text-white">
                Formulating Grounded NCERT Questions...
              </p>
              <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto">
                Cross-referencing textbook chapters & adapting difficulty based on recent doubt patterns
              </p>
            </div>
          )}

          {/* Active Practice Interface */}
          {!isLoading && questions.length > 0 && !isCompleted && currentQ && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
              {/* Progress Bar & Badges */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800 flex-wrap">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    Class {currentQ.classLevel || currentQ.citation?.classLevel || 10} • {currentQ.subject || currentQ.citation?.subject || "NCERT"}
                  </span>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    {currentQ.conceptName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {questions.map((_, idx) => {
                    const ans = userAnswers[idx];
                    let bg = "bg-slate-800";
                    if (idx === currentIndex) bg = "bg-amber-400 ring-2 ring-amber-400/40";
                    else if (ans?.isCorrect === true) bg = "bg-emerald-500";
                    else if (ans?.isCorrect === false) bg = "bg-rose-500";

                    return (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all ${bg}`}
                        title={`Question ${idx + 1}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  {currentQ.citation.chapterTitle} (p. {currentQ.citation.pageNumber})
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((optionText, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrectOpt = optIdx === currentQ.correctAnswerIndex;

                  let optionStyle = "bg-slate-950/70 border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200";

                  if (isAnswerSubmitted) {
                    if (isCorrectOpt) {
                      optionStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold shadow-lg shadow-emerald-500/10";
                    } else if (isSelected && !isCorrectOpt) {
                      optionStyle = "bg-rose-950/50 border-rose-500 text-rose-200 font-medium";
                    } else {
                      optionStyle = "bg-slate-950/30 border-slate-800/40 text-slate-500 opacity-50";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-amber-950/30 border-amber-500 ring-2 ring-amber-500/30 text-white font-medium shadow-md shadow-amber-500/10";
                  }

                  const optionLetters = ["A", "B", "C", "D"];

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optIdx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center bg-slate-900 border border-current shrink-0">
                          {optionLetters[optIdx] || optIdx + 1}
                        </span>
                        <span className="leading-relaxed">{optionText}</span>
                      </div>

                      {isAnswerSubmitted && isCorrectOpt && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrectOpt && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Section */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 sm:p-5 rounded-xl border space-y-2 animate-in fade-in duration-200 ${
                    userAnswers[currentIndex]?.isCorrect
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-100"
                      : "bg-rose-950/30 border-rose-500/40 text-rose-100"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {userAnswers[currentIndex]?.isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono">
                        <Check className="w-4 h-4" /> Correct Answer!
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 font-mono">
                        <XCircle className="w-4 h-4" /> Incorrect Answer
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-slate-400">
                      • Grounded in NCERT {currentQ.citation.chapterTitle}, Page {currentQ.citation.pageNumber}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Action Footer */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-400">
                  Session Score: <strong className="text-amber-400">{correctCount}</strong> / {userAnswers.filter(Boolean).length}
                </span>

                {!isAnswerSubmitted ? (
                  <button
                    id="btn-confirm-answer"
                    onClick={handleConfirmAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    id="btn-next-question"
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <span>{currentIndex < questions.length - 1 ? "Next Question" : "View Results"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Completion Summary Card */}
          {!isLoading && isCompleted && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-2xl backdrop-blur-md">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30 shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  Practice Completed
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  Score: {correctCount} / {totalCount} ({Math.round((correctCount / (totalCount || 1)) * 100)}%)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  {correctCount === totalCount
                    ? "Outstanding! You demonstrated strong conceptual mastery across all tested NCERT textbook concepts."
                    : "Great practice effort! All results have been logged to your Conceptual Map for targeted review and teacher analysis."}
                </p>
              </div>

              {/* Breakdown per question */}
              <div className="bg-slate-950 rounded-xl p-4 sm:p-5 max-w-lg mx-auto text-left space-y-2.5 border border-slate-800">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase">Question Breakdown</h4>
                {questions.map((q, idx) => {
                  const isCorrect = userAnswers[idx]?.isCorrect;
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/80 last:border-0">
                      <span className="truncate pr-2 text-slate-200">{idx + 1}. {q.conceptName}</span>
                      {isCorrect ? (
                        <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                          <Check className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="font-mono text-rose-400 font-semibold flex items-center gap-1 shrink-0">
                          <XCircle className="w-3.5 h-3.5" /> p. {q.citation.pageNumber}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handleRestart(selectedTopic)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Practice More Questions</span>
                </button>

                <button
                  onClick={() => setActiveSubTab("map")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <Network className="w-4 h-4" />
                  <span>View Updated Concept Map</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

