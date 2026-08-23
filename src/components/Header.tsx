import React from "react";
import { BookOpen, HelpCircle, CheckCircle2, BarChart3, Sparkles, GraduationCap, Users, ShieldCheck, Flame, ChevronDown, Award, HeartHandshake, Info, Radio } from "lucide-react";
import { ALL_COHORTS, getDefaultCohortForClass } from "../constants/cohorts.ts";

interface HeaderProps {
  activeTab: "doubts" | "practice" | "teacher" | "scholarships";
  setActiveTab: (tab: "doubts" | "practice" | "teacher" | "scholarships") => void;
  classCode: string;
  setClassCode: (code: string) => void;
  studentSessionId: string;
  selectedClassLevel: number | "ALL";
  setSelectedClassLevel: (lvl: number | "ALL") => void;
  selectedSubject: string;
  setSelectedSubject: (subj: string) => void;
  onOpenHealth: () => void;
  onOpenHelp: () => void;
  onOpenLowBandwidth?: () => void;
  healthStatus?: "ok" | "degraded" | "error";
  totalChunksCount?: number;
}

const CLASS_OPTIONS: Array<{ value: number | "ALL"; label: string }> = [
  { value: "ALL", label: "All Classes" },
  { value: 6, label: "Cl 6" },
  { value: 7, label: "Cl 7" },
  { value: 8, label: "Cl 8" },
  { value: 9, label: "Cl 9" },
  { value: 10, label: "Cl 10" },
  { value: 11, label: "Cl 11" },
  { value: 12, label: "Cl 12" }
];

const SUBJECT_OPTIONS = [
  { value: "ALL", label: "All Subjects" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Science", label: "Science" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Biology", label: "Biology" },
  { value: "Social Science", label: "Social Science" }
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  classCode,
  setClassCode,
  studentSessionId,
  selectedClassLevel,
  setSelectedClassLevel,
  selectedSubject,
  setSelectedSubject,
  onOpenHealth,
  onOpenHelp,
  onOpenLowBandwidth,
  healthStatus = "ok",
  totalChunksCount = 28
}) => {
  const handleClassLevelChange = (lvl: number | "ALL") => {
    setSelectedClassLevel(lvl);
    const targetCohort = getDefaultCohortForClass(lvl);
    setClassCode(targetCohort);
  };

  return (
    <header className="border-b border-slate-800/80 bg-[#0d1322]/90 sticky top-0 z-30 backdrop-blur-md transition-all shadow-xl shadow-black/20">
      {/* Top micro bar */}
      <div className="border-b border-slate-800/50 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Grounded Engine
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            NCERT Classes 6–12 ({totalChunksCount} Sections)
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          {/* Help & Explainer Button */}
          <button
            id="btn-help-guide"
            onClick={onOpenHelp}
            aria-label="Open help and guide"
            className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-all py-1 px-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 cursor-pointer hover:bg-amber-500/20 font-semibold shadow-xs"
            title="Learn what GyanSetu is and how to use it"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Help &amp; Guide / सहायता</span>
          </button>

          {/* Cohort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700/60 text-slate-300">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Cohort:</span>
            <select
              id="class-code-select"
              value={classCode}
              onChange={(e) => {
                const newCode = e.target.value;
                setClassCode(newCode);
                const found = ALL_COHORTS.find(c => c.code === newCode);
                if (found && found.classLevel !== "ALL" && found.classLevel !== selectedClassLevel) {
                  setSelectedClassLevel(found.classLevel);
                } else if (found && found.classLevel === "ALL") {
                  setSelectedClassLevel("ALL");
                }
              }}
              className="bg-transparent font-semibold text-amber-300 cursor-pointer focus:outline-none max-w-[140px] sm:max-w-none text-ellipsis"
            >
              <option value="ALL-COHORTS" className="bg-slate-900 text-slate-200">All Cohorts (6–12)</option>
              <optgroup label="Class 6" className="bg-slate-900 text-slate-300">
                <option value="CLASS-6A">Class 6-A</option>
                <option value="CLASS-6B">Class 6-B</option>
              </optgroup>
              <optgroup label="Class 7" className="bg-slate-900 text-slate-300">
                <option value="CLASS-7A">Class 7-A</option>
                <option value="CLASS-7B">Class 7-B</option>
              </optgroup>
              <optgroup label="Class 8" className="bg-slate-900 text-slate-300">
                <option value="CLASS-8A">Class 8-A</option>
                <option value="CLASS-8B">Class 8-B</option>
              </optgroup>
              <optgroup label="Class 9" className="bg-slate-900 text-slate-300">
                <option value="CLASS-9A">Class 9-A</option>
                <option value="CLASS-9B">Class 9-B</option>
              </optgroup>
              <optgroup label="Class 10 (Board Batch)" className="bg-slate-900 text-slate-300">
                <option value="CLASS-10A">Class 10-A</option>
                <option value="CLASS-10B">Class 10-B</option>
                <option value="CLASS-10C">Class 10-C</option>
              </optgroup>
              <optgroup label="Class 11 (Senior Streams)" className="bg-slate-900 text-slate-300">
                <option value="CLASS-11-SCI">Class 11-Science</option>
                <option value="CLASS-11-COM">Class 11-Commerce</option>
                <option value="CLASS-11-ARTS">Class 11-Arts</option>
              </optgroup>
              <optgroup label="Class 12 (Senior Board Batch)" className="bg-slate-900 text-slate-300">
                <option value="CLASS-12-SCI">Class 12-Science</option>
                <option value="CLASS-12-COM">Class 12-Commerce</option>
                <option value="CLASS-12-ARTS">Class 12-Arts</option>
              </optgroup>
            </select>
          </div>

          {onOpenLowBandwidth && (
            <button
              onClick={onOpenLowBandwidth}
              aria-label="Open low-bandwidth simulator mode"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors py-1 px-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 cursor-pointer hover:bg-emerald-900/60 text-[11px] font-mono font-semibold shadow-xs"
              title="Switch to 2G / Low-Bandwidth WhatsApp Simulator Mode (< 5 KB)"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>2G WhatsApp Mode</span>
            </button>
          )}

          <button
            id="btn-health-check"
            onClick={onOpenHealth}
            aria-label="Open system health status"
            className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors py-1 px-2 rounded-lg bg-slate-900/80 border border-slate-700/60 cursor-pointer hover:border-emerald-500/40"
            title="Inspect Brain Router & Indexed Chunks status"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                healthStatus === "ok" ? "bg-emerald-400 shadow-xs shadow-emerald-400" : healthStatus === "degraded" ? "bg-amber-400" : "bg-rose-500"
              }`}
            />
            <span className="font-semibold">Ops Status</span>
          </button>
        </div>
      </div>

      {/* Main Title & Nav */}
      <div className="max-w-5xl mx-auto px-4 pt-3.5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div 
              onClick={onOpenHelp}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform"
              title="Click to learn What is GyanSetu"
            >
              <div className="w-full h-full bg-[#0d1322] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight flex items-center gap-2">
                  ज्ञानसेतु <span className="text-amber-400 font-sans text-lg font-semibold tracking-normal">— GyanSetu</span>
                </h1>
                <button
                  onClick={onOpenHelp}
                  className="text-[11px] font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                  title="What is GyanSetu?"
                >
                  <Info className="w-3 h-3 text-amber-400" />
                  <span>What is this? / क्या है?</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Citation-grounded bilingual tutor &amp; adaptive practice engine for CBSE Classes 6 to 12
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <nav aria-label="Main Navigation" className="flex bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-inner self-start sm:self-auto flex-wrap gap-1">
            <button
              id="tab-doubts"
              onClick={() => setActiveTab("doubts")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "doubts"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Doubt Solver</span>
            </button>

            <button
              id="tab-practice"
              onClick={() => setActiveTab("practice")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "practice"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Practice Set</span>
            </button>

            <button
              id="tab-teacher"
              onClick={() => setActiveTab("teacher")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "teacher"
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md shadow-blue-500/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Teacher Intel</span>
            </button>

            <button
              id="tab-scholarships"
              onClick={() => setActiveTab("scholarships")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "scholarships"
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Scholarships &amp; Aid</span>
            </button>
          </nav>
        </div>

        {/* Dynamic Class & Subject Filter Ribbon */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 font-mono text-slate-400 text-[11px]">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-slate-300">Grade:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {CLASS_OPTIONS.map((c) => (
                <button
                  key={String(c.value)}
                  onClick={() => handleClassLevelChange(c.value)}
                  className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedClassLevel === c.value
                      ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/40"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400 text-[11px]">Subject:</span>
            <select
              id="select-subject-header"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 text-[11px] font-semibold text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {SUBJECT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value} className="bg-slate-900 text-slate-200">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

