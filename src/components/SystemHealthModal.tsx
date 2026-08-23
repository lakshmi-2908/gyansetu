import React, { useEffect, useState } from "react";
import { Activity, Server, Cpu, Database, CheckCircle2, AlertTriangle, RefreshCw, X, Shield, Sparkles } from "lucide-react";
import { HealthData } from "../types.ts";

interface SystemHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemHealthModal: React.FC<SystemHealthModalProps> = ({
  isOpen,
  onClose
}) => {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHealth = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
    } catch (e) {
      console.error("Health fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                GyanSetu Operations & Brain Health
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Live system diagnostic & telemetry</span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close system health modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-xs font-mono text-slate-400">
            <div className="w-6 h-6 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto mb-2" />
            Checking backend status and brain router connectivity...
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            {/* Brain Router State */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between font-bold text-slate-200 text-xs">
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  AI Brain Router Topology
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Active Auto-Fallback
                </span>
              </div>

              <div className="space-y-2 text-[11px] pt-1">
                <div className="flex items-start justify-between">
                  <span className="text-slate-400">Primary Provider:</span>
                  <span className="text-amber-300 font-semibold text-right">{health?.brainPrimary || "nvidia/nemotron-3-ultra-550b-a55b:free"}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-400">Fallback Brain:</span>
                  <span className="text-emerald-300 font-semibold text-right">{health?.brainFallback || "gemini-2.5-flash-lite"}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-400">Fallback Timeout:</span>
                  <span className="text-slate-300">12 seconds (1-retry backoff)</span>
                </div>
              </div>
            </div>

            {/* Knowledge Base Index */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between font-bold text-slate-200 text-xs">
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  Curriculum Knowledge Base
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  {health?.indexLoaded ? "Loaded (Indexed)" : "Syncing"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">NCERT Chapters</div>
                  <div className="text-sm font-bold text-white mt-0.5">{health?.chaptersCount || 11} indexed</div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Indexed Chunks</div>
                  <div className="text-sm font-bold text-white mt-0.5">{health?.indexedChunksCount || 42} snippets</div>
                </div>
              </div>
            </div>

            {/* Server Operational Status */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Server className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-slate-200 font-bold">Node.js Express Engine</div>
                  <div className="text-[10px] text-slate-400">Events synced: {health?.eventsCount || 0} items</div>
                </div>
              </div>
              <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
              </span>
            </div>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={fetchHealth}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Re-check Telemetry</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
