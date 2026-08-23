import React, { useState, useMemo } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  BookOpen,
  Target,
  Award,
  Layers,
  Zap,
  Search,
  Filter,
  Network,
  Activity,
  ChevronRight,
  Check,
  XCircle,
  Brain,
  RotateCcw,
  ArrowUpRight
} from "lucide-react";
import { NCERTConceptMeta } from "../types.ts";

export type ConceptMasteryStatus = "mastered" | "review" | "in_progress" | "unattempted";

export interface ConceptMasteryRecord {
  attempts: number;
  correct: number;
  wrong: number;
  status: ConceptMasteryStatus;
  scorePct: number;
  lastUpdated?: string;
}

interface ConceptMapVisualizationProps {
  availableConcepts: NCERTConceptMeta[];
  selectedClassLevel: number | "ALL";
  selectedSubject: string;
  studentSessionId: string;
  onSelectConceptForPractice: (conceptTag: string) => void;
  userLiveAnswers?: Record<string, { attempts: number; correct: number; wrong: number }>;
}

export const ConceptMapVisualization: React.FC<ConceptMapVisualizationProps> = ({
  availableConcepts = [],
  selectedClassLevel,
  selectedSubject,
  studentSessionId,
  onSelectConceptForPractice,
  userLiveAnswers = {}
}) => {
  const [viewMode, setViewMode] = useState<"graph" | "roadmap">("graph");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ConceptMasteryStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<NCERTConceptMeta | null>(null);

  // Persistent & live mastery map computation
  const masteryMap = useMemo<Record<string, ConceptMasteryRecord>>(() => {
    // 1. Read stored records for this student session
    let stored: Record<string, { attempts: number; correct: number; wrong: number }> = {};
    try {
      const raw = localStorage.getItem(`gyansetu_mastery_${studentSessionId}`);
      if (raw) stored = JSON.parse(raw);
    } catch {
      // ignore
    }

    // Baseline initial mock seeds for realistic feedback if fresh
    const defaultSeeds: Record<string, { attempts: number; correct: number; wrong: number }> = {
      "fundamental-theorem-of-arithmetic": { attempts: 3, correct: 3, wrong: 0 },
      "quadratic-standard-form": { attempts: 4, correct: 4, wrong: 0 },
      "autotrophic-photosynthesis": { attempts: 3, correct: 3, wrong: 0 },
      "discriminant-nature-of-roots": { attempts: 4, correct: 1, wrong: 3 },
      "excretion-nephron-filtration": { attempts: 3, correct: 1, wrong: 2 },
      "refraction-snells-law-refractive-index": { attempts: 2, correct: 0, wrong: 2 },
      "motion-equations-kinematics": { attempts: 3, correct: 1, wrong: 2 },
      "coulomb-law-gauss-law-electric-field": { attempts: 2, correct: 1, wrong: 1 },
      "quadratic-formula": { attempts: 2, correct: 1, wrong: 1 },
      "respiration-aerobic-anaerobic-atp": { attempts: 2, correct: 1, wrong: 1 }
    };

    const result: Record<string, ConceptMasteryRecord> = {};

    availableConcepts.forEach((c) => {
      const live = userLiveAnswers[c.conceptTag];
      const saved = stored[c.conceptTag];
      const seed = defaultSeeds[c.conceptTag];

      const attempts = (live?.attempts || 0) + (saved?.attempts || 0) + (seed?.attempts || 0);
      const correct = (live?.correct || 0) + (saved?.correct || 0) + (seed?.correct || 0);
      const wrong = (live?.wrong || 0) + (saved?.wrong || 0) + (seed?.wrong || 0);

      let status: ConceptMasteryStatus = "unattempted";
      let scorePct = 0;

      if (attempts > 0) {
        scorePct = Math.round((correct / attempts) * 100);
        if (wrong >= 2 || (attempts >= 2 && scorePct < 60)) {
          status = "review";
        } else if (scorePct >= 75 && attempts >= 2) {
          status = "mastered";
        } else {
          status = "in_progress";
        }
      }

      result[c.conceptTag] = {
        attempts,
        correct,
        wrong,
        status,
        scorePct
      };
    });

    return result;
  }, [availableConcepts, studentSessionId, userLiveAnswers]);

  // Filter concepts based on class level, subject, status and search query
  const filteredConcepts = useMemo(() => {
    return availableConcepts.filter((c) => {
      if (selectedClassLevel !== "ALL" && c.classLevel && c.classLevel !== selectedClassLevel) {
        return false;
      }
      if (selectedSubject !== "ALL" && c.subject && c.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }
      const record = masteryMap[c.conceptTag];
      if (statusFilter !== "ALL" && record?.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = c.conceptName.toLowerCase().includes(q);
        const matchChap = c.chapterTitle.toLowerCase().includes(q);
        const matchTag = c.conceptTag.toLowerCase().includes(q);
        if (!matchName && !matchChap && !matchTag) return false;
      }
      return true;
    });
  }, [availableConcepts, selectedClassLevel, selectedSubject, statusFilter, searchQuery, masteryMap]);

  // Group concepts by Subject and Chapter
  const groupedBySubjectChapter = useMemo(() => {
    const map = new Map<string, Map<string, NCERTConceptMeta[]>>();
    filteredConcepts.forEach((c) => {
      const subj = c.subject || "General NCERT";
      const chap = c.chapterTitle || `Chapter ${c.chapterNumber || 1}`;
      if (!map.has(subj)) {
        map.set(subj, new Map());
      }
      const chapMap = map.get(subj)!;
      if (!chapMap.has(chap)) {
        chapMap.set(chap, []);
      }
      chapMap.get(chap)!.push(c);
    });
    return map;
  }, [filteredConcepts]);

  // Summary Metrics
  const summaryStats = useMemo(() => {
    let masteredCount = 0;
    let reviewCount = 0;
    let inProgressCount = 0;
    let unattemptedCount = 0;

    const scopedConcepts = availableConcepts.filter((c) => {
      if (selectedClassLevel !== "ALL" && c.classLevel && c.classLevel !== selectedClassLevel) return false;
      if (selectedSubject !== "ALL" && c.subject && c.subject.toLowerCase() !== selectedSubject.toLowerCase()) return false;
      return true;
    });

    scopedConcepts.forEach((c) => {
      const rec = masteryMap[c.conceptTag];
      if (!rec || rec.status === "unattempted") unattemptedCount++;
      else if (rec.status === "mastered") masteredCount++;
      else if (rec.status === "review") reviewCount++;
      else if (rec.status === "in_progress") inProgressCount++;
    });

    const total = scopedConcepts.length || 1;
    const overallMasteryPct = Math.round((masteredCount / total) * 100);

    return {
      masteredCount,
      reviewCount,
      inProgressCount,
      unattemptedCount,
      total: scopedConcepts.length,
      overallMasteryPct
    };
  }, [availableConcepts, selectedClassLevel, selectedSubject, masteryMap]);

  const getStatusBadge = (status: ConceptMasteryStatus) => {
    switch (status) {
      case "mastered":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Mastered
          </span>
        );
      case "review":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Needs Review
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            Practicing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2.5 py-0.5 rounded-full border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Analytics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Mastered Metric */}
        <div className="rounded-2xl bg-slate-900/90 border border-emerald-500/30 p-4 relative overflow-hidden shadow-lg backdrop-blur-md">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </div>
          <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
            Mastered
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {summaryStats.masteredCount}
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              ({summaryStats.overallMasteryPct}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">High accuracy (≥75%)</p>
        </div>

        {/* Needs Review Metric */}
        <div className="rounded-2xl bg-slate-900/90 border border-rose-500/30 p-4 relative overflow-hidden shadow-lg backdrop-blur-md">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <AlertTriangle className="w-12 h-12 text-rose-400" />
          </div>
          <span className="text-[11px] font-mono uppercase text-rose-400 font-bold tracking-wider">
            Needs Review
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-200">
              {summaryStats.reviewCount}
            </span>
            <span className="text-xs font-mono text-rose-400 font-bold">
              Target Priority
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Recent errors or doubts</p>
        </div>

        {/* In Progress Metric */}
        <div className="rounded-2xl bg-slate-900/90 border border-amber-500/30 p-4 relative overflow-hidden shadow-lg backdrop-blur-md">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Zap className="w-12 h-12 text-amber-400" />
          </div>
          <span className="text-[11px] font-mono uppercase text-amber-400 font-bold tracking-wider">
            In Progress
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {summaryStats.inProgressCount}
            </span>
            <span className="text-xs font-mono text-amber-400 font-bold">
              Active Sets
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Under active practice</p>
        </div>

        {/* Total Mapped Concepts */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 relative overflow-hidden shadow-lg backdrop-blur-md">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Network className="w-12 h-12 text-indigo-400" />
          </div>
          <span className="text-[11px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
            NCERT Map Nodes
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {summaryStats.total}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Concepts
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {selectedClassLevel === "ALL" ? "All Grades" : `Class ${selectedClassLevel}`} Syllabus
          </p>
        </div>
      </div>

      {/* Control Bar: View Toggle, Status Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {(["ALL", "mastered", "review", "in_progress", "unattempted"] as const).map((st) => {
            const isActive = statusFilter === st;
            const labels = {
              ALL: "All Nodes",
              mastered: "Mastered",
              review: "Needs Review",
              in_progress: "In Progress",
              unattempted: "Not Started"
            };
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`text-xs font-mono px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer border ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20"
                    : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                }`}
              >
                {labels[st]}
              </button>
            );
          })}
        </div>

        {/* Search & Layout Mode */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts or chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
            />
          </div>

          <div className="flex items-center bg-slate-950 rounded-xl p-0.5 border border-slate-800 shrink-0">
            <button
              onClick={() => setViewMode("graph")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                viewMode === "graph"
                  ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Map Graph</span>
            </button>
            <button
              onClick={() => setViewMode("roadmap")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                viewMode === "roadmap"
                  ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Roadmap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Visualization Content */}
      {filteredConcepts.length === 0 ? (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-10 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Matching Concepts in Current Filter</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your subject/grade selectors or resetting your search query to see other NCERT curriculum chapters.
          </p>
          <button
            onClick={() => {
              setStatusFilter("ALL");
              setSearchQuery("");
            }}
            className="px-4 py-2 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-xl hover:bg-amber-500/20 transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : viewMode === "graph" ? (
        /* Visual Knowledge Network Graph View */
        <div className="space-y-6">
          {Array.from(groupedBySubjectChapter.entries()).map(([subjectName, chaptersMap]) => (
            <div
              key={subjectName}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md"
            >
              {/* Subject Banner */}
              <div className="px-5 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Brain className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    {subjectName} <span className="text-slate-400 font-normal font-mono text-xs">• Conceptual Hierarchy</span>
                  </h3>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {Array.from(chaptersMap.values()).flat().length} Nodes
                </span>
              </div>

              {/* Chapters & Interconnected Concept Graph */}
              <div className="p-5 space-y-6">
                {Array.from(chaptersMap.entries()).map(([chapterTitle, conceptsInChapter]) => {
                  const chapterMastered = conceptsInChapter.filter(
                    (c) => masteryMap[c.conceptTag]?.status === "mastered"
                  ).length;
                  const chapterProgressPct = Math.round(
                    (chapterMastered / (conceptsInChapter.length || 1)) * 100
                  );

                  return (
                    <div
                      key={chapterTitle}
                      className="rounded-xl bg-slate-950/80 border border-slate-800/90 p-4 sm:p-5 space-y-4 relative"
                    >
                      {/* Chapter Header with Progress Gauge */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                        <div>
                          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                            {chapterTitle}
                          </span>
                          <h4 className="text-sm font-bold text-slate-100 mt-0.5">
                            Curriculum Concept Chain
                          </h4>
                        </div>

                        {/* Chapter Mastery Meter */}
                        <div className="flex items-center gap-2.5 self-start sm:self-auto">
                          <div className="text-right">
                            <span className="text-[11px] font-mono font-bold text-slate-300">
                              {chapterMastered} / {conceptsInChapter.length} Mastered
                            </span>
                            <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                                style={{ width: `${chapterProgressPct}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                            {chapterProgressPct}%
                          </span>
                        </div>
                      </div>

                      {/* Interactive Graph Node Flow */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                        {conceptsInChapter.map((concept, nodeIdx) => {
                          const record = masteryMap[concept.conceptTag];
                          const status = record?.status || "unattempted";
                          const isSelected = selectedConcept?.conceptTag === concept.conceptTag;

                          let borderColor = "border-slate-800 hover:border-slate-700 bg-slate-900/60";
                          let glowEffect = "";
                          if (status === "mastered") {
                            borderColor = "border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-500/70";
                            glowEffect = "shadow-md shadow-emerald-500/5";
                          } else if (status === "review") {
                            borderColor = "border-rose-500/50 bg-rose-950/20 hover:border-rose-500/80";
                            glowEffect = "shadow-md shadow-rose-500/10";
                          } else if (status === "in_progress") {
                            borderColor = "border-amber-500/40 bg-amber-950/20 hover:border-amber-500/70";
                            glowEffect = "shadow-md shadow-amber-500/5";
                          }

                          if (isSelected) {
                            borderColor = "border-amber-400 ring-2 ring-amber-400/30 bg-slate-900";
                          }

                          return (
                            <div
                              key={concept.conceptTag}
                              onClick={() => setSelectedConcept(concept)}
                              className={`rounded-xl border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 relative ${borderColor} ${glowEffect}`}
                            >
                              {/* Top Bar: Sequence Node Number & Status Pill */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono font-bold flex items-center justify-center text-slate-300">
                                    {nodeIdx + 1}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    p. {concept.pageNumber}
                                  </span>
                                </div>
                                {getStatusBadge(status)}
                              </div>

                              {/* Concept Title & Description */}
                              <div className="space-y-1">
                                <h5 className="text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-amber-300">
                                  {concept.conceptName}
                                </h5>
                                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                                  <span>Score:</span>
                                  <strong
                                    className={
                                      status === "mastered"
                                        ? "text-emerald-400"
                                        : status === "review"
                                        ? "text-rose-400 font-bold"
                                        : "text-slate-300"
                                    }
                                  >
                                    {record?.attempts ? `${record.scorePct}%` : "Not Tested"}
                                  </strong>
                                  {record?.attempts ? (
                                    <span className="text-slate-500">
                                      ({record.correct}/{record.attempts} correct)
                                    </span>
                                  ) : null}
                                </div>
                              </div>

                              {/* Node Action Footer */}
                              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                                <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  <span>{status === "review" ? "Needs Drill" : "Target Concept"}</span>
                                </span>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectConceptForPractice(concept.conceptTag);
                                  }}
                                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg shadow-sm shadow-amber-500/20 transition-all cursor-pointer shrink-0"
                                >
                                  <span>Practice</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Roadmap Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConcepts.map((concept) => {
            const record = masteryMap[concept.conceptTag];
            const status = record?.status || "unattempted";

            return (
              <div
                key={concept.conceptTag}
                onClick={() => setSelectedConcept(concept)}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-5 space-y-4 shadow-xl backdrop-blur-md transition-all cursor-pointer relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/30">
                      Class {concept.classLevel}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {concept.subject}
                    </span>
                  </div>
                  {getStatusBadge(status)}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {concept.chapterTitle} • Page {concept.pageNumber}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {concept.conceptName}
                  </h4>
                </div>

                {/* Score Progress Bar */}
                <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Mastery Rating:</span>
                    <span className="font-bold text-slate-200">
                      {record?.attempts ? `${record.scorePct}%` : "Untested"}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        status === "mastered"
                          ? "bg-emerald-500"
                          : status === "review"
                          ? "bg-rose-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${record?.scorePct || 0}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                    <span>Attempts: {record?.attempts || 0}</span>
                    <span>Correct: {record?.correct || 0}</span>
                    <span>Errors: {record?.wrong || 0}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-slate-400">
                    Tag: <code className="text-slate-300">{concept.conceptTag}</code>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectConceptForPractice(concept.conceptTag);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Practice Concept</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Concept Detail Modal */}
      {selectedConcept && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    Class {selectedConcept.classLevel}
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    {selectedConcept.subject}
                  </span>
                  {getStatusBadge(masteryMap[selectedConcept.conceptTag]?.status || "unattempted")}
                </div>
                <h3 className="text-lg font-bold text-white pt-1">
                  {selectedConcept.conceptName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedConcept(null)}
                aria-label="Close concept detail"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                ✕
              </button>
            </div>

            {/* Textbook Citation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>NCERT Textbook Reference</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                Chapter: <strong className="text-white">{selectedConcept.chapterTitle}</strong> (Ch. {selectedConcept.chapterNumber})
              </p>
              <p className="text-xs font-mono text-slate-400">
                Verified Textbook Page: <span className="text-amber-300 font-bold">Page {selectedConcept.pageNumber}</span>
              </p>
            </div>

            {/* Performance Details */}
            {(() => {
              const rec = masteryMap[selectedConcept.conceptTag];
              return (
                <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase">Attempts</span>
                    <p className="text-base font-bold text-white mt-0.5">{rec?.attempts || 0}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400 uppercase">Correct</span>
                    <p className="text-base font-bold text-emerald-300 mt-0.5">{rec?.correct || 0}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30">
                    <span className="text-[10px] text-rose-400 uppercase">Wrong</span>
                    <p className="text-base font-bold text-rose-300 mt-0.5">{rec?.wrong || 0}</p>
                  </div>
                </div>
              );
            })()}

            {/* Diagnostic advice */}
            <div className="text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
              {masteryMap[selectedConcept.conceptTag]?.status === "review" ? (
                <span className="text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <strong>Review Recommended:</strong> Recent errors indicate a misconception. Practice this topic now to reinforce foundational understanding.
                </span>
              ) : masteryMap[selectedConcept.conceptTag]?.status === "mastered" ? (
                <span className="text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <strong>Concept Mastered:</strong> You have demonstrated high accuracy and deep conceptual clarity on this NCERT chapter.
                </span>
              ) : (
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-amber-400 shrink-0" />
                  <strong>Ready for Practice:</strong> Generate an adaptive NCERT question set to evaluate your mastery on this concept.
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedConcept(null)}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const tag = selectedConcept.conceptTag;
                  setSelectedConcept(null);
                  onSelectConceptForPractice(tag);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice This Concept Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
