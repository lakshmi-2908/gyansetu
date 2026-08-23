import React, { useEffect, useState } from "react";
import { BarChart3, AlertCircle, RefreshCw, Users, HelpCircle, XCircle, TrendingUp, BookOpen, CheckCircle, Clock, Copy, Check, FileText, GraduationCap, Flame, Sparkles, Printer } from "lucide-react";
import { TeacherSummaryResponse, TeacherConceptStat } from "../types.ts";
import { ALL_COHORTS } from "../constants/cohorts.ts";
import { TeacherWorksheetModal } from "./TeacherWorksheetModal.tsx";

interface TeacherViewProps {
  classCode: string;
  onClassCodeChange: (code: string) => void;
  selectedClassLevel?: number | "ALL";
  onSelectClassLevel?: (lvl: number | "ALL") => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({
  classCode,
  onClassCodeChange,
  selectedClassLevel,
  onSelectClassLevel
}) => {
  const [data, setData] = useState<TeacherSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedPlan, setCopiedPlan] = useState(false);
  const [isWorksheetModalOpen, setIsWorksheetModalOpen] = useState(false);

  const fetchSummary = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/teacher/summary?classCode=${encodeURIComponent(code)}`);
      if (!res.ok) {
        throw new Error(`Failed to load summary (HTTP ${res.status})`);
      }
      const json: TeacherSummaryResponse = await res.json();
      setData(json);
    } catch (err: any) {
      console.error("[TeacherView] Fetch error:", err);
      setError(err?.message || "Failed to fetch teacher summary data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary(classCode);
  }, [classCode]);

  const handleCopyPlan = () => {
    if (!data?.conceptStats) return;
    const lines = [
      `=== GyanSetu Lesson Revision Plan: ${classCode} ===`,
      `Generated: ${new Date().toLocaleDateString()}`,
      `Total Active Students: ${data.totalStudents}`,
      `Total Logged Interactions: ${data.totalEvents}`,
      "",
      "--- Priority Revision Concepts ---"
    ];

    data.conceptStats.forEach((s, idx) => {
      lines.push(
        `${idx + 1}. ${s.conceptName} (${s.chapterTitle}) - Struggle Score: ${s.struggleScore.toFixed(1)} [${s.doubtCount} doubts, ${s.practiceWrong} practice errors]`
      );
    });

    lines.push("");
    lines.push("Recommended Action: Dedicate 15-20 min in next class to top 2 struggle topics.");
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  // Max struggle score for proportional bar visualization
  const maxScore = data?.conceptStats && data.conceptStats.length > 0
    ? Math.max(...data.conceptStats.map(s => s.struggleScore), 1)
    : 10;

  return (
    <div className="space-y-6">
      {/* Preview — sample data ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono shadow-md">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-200 font-bold text-[11px] uppercase tracking-wider border border-amber-500/40 shrink-0">
            Preview — sample data
          </span>
          <span className="text-slate-300 text-xs">
            Live classroom sync active: Student doubts & practice submissions dynamically update this analytics view.
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-amber-400/80 shrink-0">
          <span>Shared Spine:</span>
          <code className="bg-slate-950 px-2 py-0.5 rounded border border-amber-500/20 text-slate-300">
            events.jsonl
          </code>
        </div>
      </div>

      {/* Top Banner with live status */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/40 border border-slate-800 p-5 shadow-xl shadow-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Curriculum Mastery & Student Struggle Insights <span className="text-purple-400 text-base font-normal font-sans">(शिक्षक डैशबोर्ड)</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time analytics aggregating student doubts, misconceptions, and practice errors across NCERT chapters.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0 flex-wrap">
          <select
            value={classCode}
            onChange={(e) => {
              const val = e.target.value;
              onClassCodeChange(val);
              const found = ALL_COHORTS.find(c => c.code === val);
              if (found && onSelectClassLevel) {
                onSelectClassLevel(found.classLevel);
              }
            }}
            className="bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500 cursor-pointer shadow-inner"
          >
            <option value="ALL-COHORTS">All Cohorts (Classes 6–12 School-wide)</option>

            <optgroup label="Class 6">
              <option value="CLASS-6A">Class 6-A (General)</option>
              <option value="CLASS-6B">Class 6-B (General)</option>
            </optgroup>

            <optgroup label="Class 7">
              <option value="CLASS-7A">Class 7-A (General)</option>
              <option value="CLASS-7B">Class 7-B (General)</option>
            </optgroup>

            <optgroup label="Class 8">
              <option value="CLASS-8A">Class 8-A (General)</option>
              <option value="CLASS-8B">Class 8-B (General)</option>
            </optgroup>

            <optgroup label="Class 9">
              <option value="CLASS-9A">Class 9-A (Science & Math)</option>
              <option value="CLASS-9B">Class 9-B (Science & Math)</option>
            </optgroup>

            <optgroup label="Class 10 (Secondary Board Batch)">
              <option value="CLASS-10A">Class 10-A (Secondary)</option>
              <option value="CLASS-10B">Class 10-B (Secondary)</option>
              <option value="CLASS-10C">Class 10-C (Secondary)</option>
            </optgroup>

            <optgroup label="Class 11 (Senior Streams)">
              <option value="CLASS-11-SCI">Class 11-Science (PCM/PCB)</option>
              <option value="CLASS-11-COM">Class 11-Commerce</option>
              <option value="CLASS-11-ARTS">Class 11-Humanities</option>
            </optgroup>

            <optgroup label="Class 12 (Senior Board Batch)">
              <option value="CLASS-12-SCI">Class 12-Science (PCM/PCB)</option>
              <option value="CLASS-12-COM">Class 12-Commerce</option>
              <option value="CLASS-12-ARTS">Class 12-Humanities</option>
            </optgroup>
          </select>

          <button
            onClick={() => fetchSummary(classCode)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-mono rounded-xl transition-all cursor-pointer disabled:opacity-50"
            title="Refresh analytics data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-purple-400" : "text-slate-400"}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Total Active Learners</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mt-2 font-mono">
            {data?.totalStudents || 0}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">
            Cohort: <strong className="text-cyan-300">{classCode}</strong>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Recorded Interactions</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mt-2 font-mono">
            {data?.totalEvents || 0}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">
            Doubts asked + Practice submitted
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Priority Intervention</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-bold text-rose-400 mt-2 truncate">
            {data?.conceptStats?.[0]?.conceptName || "Analyzing student data..."}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">
            Highest combined struggle index
          </div>
        </div>
      </div>

      {/* Sorted Concept Struggle Bar List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Concept Struggle Ranking
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Sorted by weighted struggle index: <span className="font-mono text-slate-300">(Doubts × 1.5) + (Practice Errors × 2.0)</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsWorksheetModalOpen(true)}
              className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              title="Generate printable offline test paper and CBSE answer key"
            >
              <Printer className="w-4 h-4" />
              <span className="font-mono">Generate Test Paper</span>
            </button>

            <button
              onClick={handleCopyPlan}
              disabled={!data?.conceptStats || data.conceptStats.length === 0}
              className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 cursor-pointer"
              title="Copy formatted lesson revision plan for teachers"
            >
              {copiedPlan ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="font-mono">Plan Copied!</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span className="font-mono">Copy Lesson Plan</span>
                </>
              )}
            </button>
            <span className="font-mono text-xs text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              NCERT Curriculum
            </span>
          </div>
        </div>

        {isLoading && (
          <div className="py-12 text-center text-xs font-mono text-slate-400">
            <div className="w-6 h-6 rounded-full border-2 border-purple-400 border-t-transparent animate-spin mx-auto mb-2" />
            Loading student interaction data...
          </div>
        )}

        {!isLoading && data?.conceptStats && (
          <div className="space-y-3.5 pt-1">
            {data.conceptStats.map((stat, idx) => {
              const widthPct = Math.min(Math.max((stat.struggleScore / maxScore) * 100, 8), 100);
              const isHighStruggle = idx < 2;

              return (
                <div
                  key={stat.conceptTag}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-950 hover:border-slate-700 transition-all space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          #{idx + 1}
                        </span>
                        <span className="text-sm font-bold text-white">
                          {stat.conceptName}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-purple-400">
                        {stat.chapterTitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono flex-wrap">
                      <span className="text-slate-300" title="Doubts Asked">
                        ❓ <strong className="text-amber-400">{stat.doubtCount}</strong> doubts
                      </span>
                      <span className="text-slate-300" title="Practice Incorrect">
                        ❌ <strong className="text-rose-400">{stat.practiceWrong}</strong> errors
                      </span>
                      <span className="font-bold text-slate-200 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                        Score: <span className="text-amber-400">{stat.struggleScore.toFixed(1)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHighStruggle
                          ? "bg-gradient-to-r from-rose-500 to-amber-500"
                          : "bg-gradient-to-r from-amber-500 to-emerald-500"
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Live Event Spine Feed */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">
              Recent Activity Log (Shared Event Spine)
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-500">
            events.jsonl
          </span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {data?.recentEvents && data.recentEvents.length > 0 ? (
            data.recentEvents.map((ev, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold border ${
                      ev.type === "doubt"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                        : ev.correct
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                    }`}
                  >
                    {ev.type === "practice" ? (ev.correct ? "Practice ✓" : "Practice ✗") : "Doubt"}
                  </span>
                  <span className="text-slate-300 truncate font-sans font-medium">
                    {ev.conceptName || ev.concept}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 shrink-0 ml-2">
                  {new Date(ev.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-xs font-mono text-slate-500">
              No events recorded yet for this class code.
            </div>
          )}
        </div>
      </div>

      {/* Teacher Printable Worksheet Generator Modal */}
      <TeacherWorksheetModal
        isOpen={isWorksheetModalOpen}
        onClose={() => setIsWorksheetModalOpen(false)}
        defaultClassCode={classCode}
      />
    </div>
  );
};
