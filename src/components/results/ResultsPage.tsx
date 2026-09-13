import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Clock3,
  Cog,
  FileText,
  FlaskConical,
  Plus,
  Settings,
  Sparkles,
  Wrench,
} from "lucide-react";
import Logo from "../Logo";
import { LevelPill, useMounted } from "./Shared";
import AnomalySection from "./AnomalySection";
import { RootCausesSection, RiskSection } from "./Diagnosis";
import { EvidenceSection, KnowledgeSection } from "./EvidenceKnowledge";
import AgentWorkflow from "./AgentWorkflow";
import FollowUpChat from "./FollowUpChat";
import Deliverables from "./Deliverables";
import SecurityPanel from "./SecurityPanel";
import {
  ANALYSIS_ID,
  COMPANY,
  DEFAULT_DOC,
  PLANT,
  RECOMMENDATION_TEXT,
} from "../../data/mockData";

interface Props {
  fileName: string | null;
  task: string;
  prompt: string;
  onNewAnalysis: () => void;
  onOpenSettings: () => void;
}

/* ---------- Animated confidence dial (SVG) ---------- */
function ConfidenceDial({ value }: { value: number }) {
  const mounted = useMounted();
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#dialGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={mounted ? c * (1 - value / 100) : c}
          style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <defs>
          <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2e63ff" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid rotate-0 place-items-center text-center">
        <div>
          <p className="font-display text-2xl font-semibold tabular-nums text-navy-900">{value}%</p>
          <p className="text-[9px] font-bold tracking-[0.16em] text-slate-400">CONFIDENCE</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------ Results page ------------------------ */

export default function ResultsPage({
  fileName,
  task,
  prompt,
  onNewAnalysis,
  onOpenSettings,
}: Props) {
  const [reportBusy, setReportBusy] = useState(false);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });

  const handleGenerateReport = () => {
    scrollTo("deliverables");
    setReportBusy(true);
    setTimeout(() => setReportBusy(false), 1800);
  };

  return (
    <div className="mesh-bg min-h-screen">
      {/* ---------------- header ---------------- */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-6">
          <button
            onClick={onNewAnalysis}
            title="Back to workbench"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand-500/40 hover:text-brand-600"
          >
            <ArrowLeft size={16} />
          </button>
          <Logo size={34} />
          <div className="leading-tight">
            <h1 className="font-display text-[16px] font-semibold tracking-tight text-navy-900">
              Analysis Results
            </h1>
            <p className="font-mono text-[10px] text-slate-400">{ANALYSIS_ID}</p>
          </div>

          <span className="chip ml-2 hidden border border-emerald-200 bg-emerald-50 text-emerald-700 md:inline-flex">
            <BadgeCheck size={12} /> Analysis Verified
          </span>

          <div className="ml-auto flex items-center gap-2">
            <span className="chip hidden border border-amber-200 bg-amber-50 font-bold tracking-wider text-amber-600 lg:inline-flex">
              <FlaskConical size={11} /> SIMULATED PROTOTYPE DATA
            </span>
            <button
              onClick={onNewAnalysis}
              className="flex items-center gap-1.5 rounded-xl bg-navy-900 px-3.5 py-2 text-[13px] font-semibold text-white shadow-md shadow-navy-900/20 transition hover:bg-navy-800"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span className="hidden sm:inline">New Analysis</span>
            </button>
            <button
              onClick={onOpenSettings}
              title="Settings"
              className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand-500/40 hover:text-brand-600"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* meta strip */}
        <div className="border-t border-slate-100 bg-slate-50/80">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-0.5 px-4 py-1.5 font-mono text-[10px] text-slate-400 md:px-6">
            <span>TASK: {task.toUpperCase()}</span>
            <span className="text-slate-300">·</span>
            <span>DOC: {(fileName ?? DEFAULT_DOC).toUpperCase()}</span>
            <span className="text-slate-300">·</span>
            <span>RUNTIME: 7.4 S</span>
            <span className="text-slate-300">·</span>
            <span className="truncate">
              QUERY: “{(prompt || "Analyze the uploaded Pump P-204 inspection report").slice(0, 60)}”
            </span>
            <span className="ml-auto hidden items-center gap-1.5 text-emerald-600 md:flex">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
              FULLY LOCAL
            </span>
          </div>
        </div>
      </header>

      {/* ---------------- content ---------------- */}
      <main className="mx-auto max-w-7xl space-y-14 px-4 py-8 md:px-6 md:py-10">
        {/* ====== 01 · Summary ====== */}
        <section className="animate-fade-up">
          <div className="card relative overflow-hidden p-6 md:p-7">
            {/* accent ribbon */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-brand-500" />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip border border-red-200 bg-red-50 font-bold tracking-wider text-red-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                    ANOMALY DETECTED
                  </span>
                  <span className="chip border border-slate-200 bg-slate-50 font-mono text-slate-500">
                    <FileText size={11} /> {fileName ?? DEFAULT_DOC}
                  </span>
                </div>

                <h2 className="mt-3.5 font-display text-2xl font-semibold leading-tight tracking-tight text-navy-900 md:text-[1.75rem]">
                  Abnormal Vibration Detected
                </h2>
                <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-slate-500">
                  Primary issue: sustained vibration beyond the Zone C boundary at the
                  drive-end bearing, with a rising thermal drift and a dominant 1×
                  running-speed component.
                </p>

                {/* meta tiles */}
                <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <Cog size={11} /> Equipment
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-navy-900">Pump P-204</p>
                    <p className="text-[10.5px] text-slate-400">Centrifugal · 2,980 rpm</p>
                  </div>
                  <div className="rounded-xl border border-red-100 bg-red-50/60 px-3.5 py-3">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-red-400">
                      <AlertTriangle size={11} /> Severity
                    </p>
                    <p className="mt-1">
                      <LevelPill level="HIGH" />
                    </p>
                    <p className="mt-1 text-[10.5px] text-red-400">Act within 24 hours</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <FileText size={11} /> Report ref.
                    </p>
                    <p className="mt-1 font-mono text-[12.5px] font-semibold text-navy-900">
                      14 pages
                    </p>
                    <p className="text-[10.5px] text-slate-400">p.3–4 flagged by AI</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <Clock3 size={11} /> Detected
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-navy-900">14:32 IST</p>
                    <p className="text-[10.5px] text-slate-400">06 Mar 2026 · {PLANT.split("·")[0]}</p>
                  </div>
                </div>
              </div>

              {/* confidence dial */}
              <div className="flex flex-col items-center gap-2 border-slate-100 lg:border-l lg:pl-8">
                <ConfidenceDial value={87} />
                <p className="text-center text-[10.5px] leading-tight text-slate-400">
                  Reconciled across OCR,
                  <br />
                  spectral &amp; KB evidence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== 02 · Anomaly detail + chart ====== */}
        <AnomalySection />

        {/* ====== 03 · Root causes ====== */}
        <RootCausesSection />

        {/* ====== 04 · Risk analysis ====== */}
        <RiskSection />

        {/* ====== 05 · AI recommendation ====== */}
        <section>
          <div className="rounded-[1.4rem] bg-gradient-to-r from-brand-600 via-cyan-500 to-violet-500 p-[1.5px] shadow-lg shadow-blue-600/15">
            <div className="rounded-[1.3rem] bg-white px-6 py-6 md:px-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-cyan-500 text-white shadow-md shadow-blue-500/30">
                  <Sparkles size={17} />
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-600">
                  05 · AI Recommendation
                </p>
              </div>

              <p className="mt-4 max-w-4xl font-display text-xl font-medium leading-snug text-navy-900 md:text-[1.55rem]">
                “{RECOMMENDATION_TEXT}”
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Recommended Priority
                </span>
                <LevelPill level="HIGH" />
                <span className="mx-1 h-4 w-px bg-slate-200" />
                <span className="chip border border-blue-200 bg-blue-50 text-brand-700">
                  <Wrench size={11} /> Inspection + preventive maintenance
                </span>
                <span className="chip border border-slate-200 bg-slate-50 text-slate-500">
                  <Clock3 size={11} /> Window: within 24 hours
                </span>
                <span className="chip border border-slate-200 bg-slate-50 text-slate-500">
                  <Activity size={11} /> Continuous vibration monitoring
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ====== 06 · Evidence ====== */}
        <EvidenceSection />

        {/* ====== 07 · Knowledge search ====== */}
        <KnowledgeSection />

        {/* ====== 08 · Agentic workflow ====== */}
        <AgentWorkflow />

        {/* ====== 09 · Follow-up conversation ====== */}
        <FollowUpChat
          onShowEvidence={() => scrollTo("evidence")}
          onGenerateReport={handleGenerateReport}
        />

        {/* ====== 10 · Deliverables ====== */}
        <div id="deliverables">
          <Deliverables busy={reportBusy} />
        </div>

        {/* ====== 11 · Security ====== */}
        <SecurityPanel />
      </main>

      {/* footer */}
      <footer className="border-t border-slate-200/70 bg-white/60 py-7 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 text-xs text-slate-400">
          <Logo size={18} />
          <span className="font-semibold text-slate-500">INDRA AI</span>
          <span>· SIH 2026 prototype (SIH26117) · {COMPANY} (fictional)</span>
          <span>· all figures on this page are simulated.</span>
        </div>
      </footer>
    </div>
  );
}
