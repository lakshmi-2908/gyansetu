
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header.tsx";
import { DoubtsView } from "./components/DoubtsView.tsx";
import { PracticeView } from "./components/PracticeView.tsx";
import { TeacherView } from "./components/TeacherView.tsx";
import { ScholarshipView } from "./components/ScholarshipView.tsx";
import { SystemHealthModal } from "./components/SystemHealthModal.tsx";
import { HelpAndExplainerModal } from "./components/HelpAndExplainerModal.tsx";
import { LowBandwidthModal } from "./components/LowBandwidthModal.tsx";
import { DoubtMessage, PracticeQuestion, NCERTConceptMeta } from "./types.ts";

export default function App() {
  const [activeTab, setActiveTab] = useState<"doubts" | "practice" | "teacher" | "scholarships">("doubts");
  const [classCode, setClassCode] = useState<string>("CLASS-10A");
  const [studentSessionId, setStudentSessionId] = useState<string>("");
  const [selectedClassLevel, setSelectedClassLevel] = useState<number | "ALL">(10);
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [availableConcepts, setAvailableConcepts] = useState<NCERTConceptMeta[]>([]);
  
  // Doubts State
  const [messages, setMessages] = useState<DoubtMessage[]>([]);
  const [isDoubtLoading, setIsDoubtLoading] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Practice State
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>([]);
  const [isPracticeLoading, setIsPracticeLoading] = useState<boolean>(false);

  // Health Modal State
  const [isHealthOpen, setIsHealthOpen] = useState<boolean>(false);
  const [healthStatus, setHealthStatus] = useState<"ok" | "degraded" | "error">("ok");
  const [totalChunksCount, setTotalChunksCount] = useState<number>(0);

  // Help & Explainer Modal State
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // 2G / Low Bandwidth WhatsApp Simulator Modal State
  const [isLowBandwidthOpen, setIsLowBandwidthOpen] = useState<boolean>(false);

  // Initialize unique student session & fetch concept repository
  useEffect(() => {
    let sid = sessionStorage.getItem("gyansetu_student_session");
    if (!sid) {
      sid = `stud-${crypto.randomUUID().slice(0, 8)}`;
      sessionStorage.setItem("gyansetu_student_session", sid);
    }
    setStudentSessionId(sid);

    // Initial health check
    fetch("/api/health")
      .then((res) => res.json())
      .then((d) => {
        setHealthStatus(d.status || "ok");
        if (d.indexedChunksCount) setTotalChunksCount(d.indexedChunksCount);
      })
      .catch(() => setHealthStatus("degraded"));

    // Fetch available NCERT concepts
    fetch("/api/concepts")
      .then((res) => res.json())
      .then((d) => {
        if (Array.isArray(d.concepts)) {
          setAvailableConcepts(d.concepts);
        }
      })
      .catch((err) => console.error("Error fetching concepts:", err));
  }, []);

  // Handle Doubt Query Submission
  const handleAskDoubt = async (query: string, simplify: boolean = false) => {
    setIsDoubtLoading(true);
    setErrorMessage(null);
    setLoadingPhase(
      selectedClassLevel === "ALL"
        ? "Searching NCERT repository across all classes..."
        : `Consulting NCERT Class ${selectedClassLevel} curriculum...`
    );

    // Append user message immediately to the thread
    const userMsgId = `user_${Date.now()}`;
    const newUserMsg: DoubtMessage = {
      id: userMsgId,
      role: "user",
      content: simplify ? `[Explain more simply] ${query}` : query,
      timestamp: new Date().toISOString(),
      classLevel: selectedClassLevel === "ALL" ? undefined : selectedClassLevel,
      subject: selectedSubject === "ALL" ? undefined : selectedSubject
    };

    setMessages((prev) => [...prev, newUserMsg]);

    const phaseTimer1 = setTimeout(() => {
      setLoadingPhase("Matching textbook chapters & verifying citation confidence...");
    }, 450);

    const phaseTimer2 = setTimeout(() => {
      setLoadingPhase("Structuring grounded step-by-step NCERT explanation...");
    }, 1100);

    try {
      // Build history payload for multi-turn thread
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          studentSessionId,
          classCode,
          classLevel: selectedClassLevel === "ALL" ? undefined : selectedClassLevel,
          subjectFilter: selectedSubject === "ALL" ? undefined : selectedSubject,
          history: historyPayload,
          simplify
        })
      });

      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: DoubtMessage = {
        id: `assist_${Date.now()}`,
        role: "assistant",
        content: data.answer,
        timestamp: new Date().toISOString(),
        isGrounded: data.isGrounded,
        groundingBadge: data.groundingBadge,
        groundingStatus: data.groundingStatus,
        citations: data.citations || [],
        conceptTag: data.conceptTag,
        brainUsed: data.brainUsed,
        latencyMs: data.latencyMs,
        isSimplified: simplify
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      console.error("[App] Doubt submission error:", err);
      setErrorMessage(
        err?.message || "Could not connect to the doubt solving service. Please check your connection or retry."
      );
    } finally {
      setIsDoubtLoading(false);
      setLoadingPhase("");
    }
  };

  // Generate Practice Questions
  const handleGeneratePractice = async (preferredConcept?: string) => {
    setIsPracticeLoading(true);
    try {
      const res = await fetch("/api/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentSessionId,
          classCode,
          classLevel: selectedClassLevel === "ALL" ? undefined : selectedClassLevel,
          subjectFilter: selectedSubject === "ALL" ? undefined : selectedSubject,
          preferredConcept
        })
      });

      if (!res.ok) {
        throw new Error("Failed to load practice questions");
      }

      const data = await res.json();
      if (Array.isArray(data.questions) && data.questions.length > 0) {
        setPracticeQuestions(data.questions);
      }
    } catch (err) {
      console.error("[App] Practice load error:", err);
    } finally {
      setIsPracticeLoading(false);
    }
  };

  // Auto load practice on tab switch if empty
  useEffect(() => {
    if (activeTab === "practice" && practiceQuestions.length === 0 && !isPracticeLoading) {
      handleGeneratePractice();
    }
  }, [activeTab, selectedClassLevel, selectedSubject]);

  // Submit Practice Answer
  const handleSubmitAnswer = async (
    conceptTag: string,
    questionId: string,
    selectedIndex: number,
    isCorrect: boolean
  ) => {
    try {
      await fetch("/api/practice/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentSessionId,
          classCode,
          conceptTag,
          questionId,
          selectedOptionIndex: selectedIndex,
          isCorrect
        })
      });
    } catch (err) {
      console.error("[App] Submit practice error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#e2e8f0] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Subtle Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top Header & Navigation */}
      <div className="relative z-10">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          classCode={classCode}
          setClassCode={setClassCode}
          studentSessionId={studentSessionId}
          selectedClassLevel={selectedClassLevel}
          setSelectedClassLevel={setSelectedClassLevel}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          onOpenHealth={() => setIsHealthOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
          onOpenLowBandwidth={() => setIsLowBandwidthOpen(true)}
          healthStatus={healthStatus}
          totalChunksCount={totalChunksCount}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {activeTab === "doubts" && (
          <DoubtsView
            messages={messages}
            onAskDoubt={handleAskDoubt}
            onClearThread={() => setMessages([])}
            isLoading={isDoubtLoading}
            loadingPhase={loadingPhase}
            errorMessage={errorMessage}
            onClearError={() => setErrorMessage(null)}
            selectedClassLevel={selectedClassLevel}
            selectedSubject={selectedSubject}
            onSelectClassLevel={setSelectedClassLevel}
            onSelectSubject={setSelectedSubject}
            availableConcepts={availableConcepts}
          />
        )}

        {activeTab === "practice" && (
          <PracticeView
            questions={practiceQuestions}
            isLoading={isPracticeLoading}
            onGeneratePractice={handleGeneratePractice}
            onSubmitAnswer={handleSubmitAnswer}
            studentSessionId={studentSessionId}
            selectedClassLevel={selectedClassLevel}
            selectedSubject={selectedSubject}
            onSelectClassLevel={setSelectedClassLevel}
            onSelectSubject={setSelectedSubject}
            availableConcepts={availableConcepts}
          />
        )}

        {activeTab === "teacher" && (
          <TeacherView
            classCode={classCode}
            onClassCodeChange={setClassCode}
            selectedClassLevel={selectedClassLevel}
            onSelectClassLevel={setSelectedClassLevel}
          />
        )}

        {activeTab === "scholarships" && (
          <ScholarshipView
            studentSessionId={studentSessionId}
            selectedClassLevel={selectedClassLevel}
          />
        )}
      </main>

      {/* Modern Dark Footer */}
      <footer className="relative z-10 border-t border-slate-850 bg-slate-950/80 backdrop-blur-md py-4 px-4 mt-auto text-xs font-mono text-slate-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">GyanSetu <span className="text-amber-400">(ज्ञानसेतु)</span></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">NCERT Classes 6–12 Curriculum Engine</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
            <button
              onClick={() => setIsHelpOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition-colors underline cursor-pointer"
            >
              Need Help &amp; Explainer / सहायता
            </button>
            <span>•</span>
            <button
              onClick={() => setIsHealthOpen(true)}
              className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Ops Monitor
            </button>
            <span>•</span>
            <span className="text-emerald-400">Strict NCERT Citation Grounding</span>
          </div>
        </div>
      </footer>

      {/* Help and Explainer Modal */}
      <HelpAndExplainerModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsHelpOpen(false);
        }}
      />

      {/* System Health / Operations Modal */}
      <SystemHealthModal
        isOpen={isHealthOpen}
        onClose={() => setIsHealthOpen(false)}
      />

      {/* 2G & Low-Bandwidth WhatsApp Simulator Modal */}
      <LowBandwidthModal
        isOpen={isLowBandwidthOpen}
        onClose={() => setIsLowBandwidthOpen(false)}
        selectedClassLevel={selectedClassLevel}
      />
    </div>
  );
}
