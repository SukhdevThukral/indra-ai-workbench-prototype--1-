import {
  ArrowUpRight,
  Bot,
  Database,
  FileText,
  FileUp,
  Image as ImageIcon,
  Paperclip,
  ShieldCheck,
  Sparkles,
  UserRound,
  WifiOff,
  X,
} from "lucide-react";
import Logo from "./Logo";
import SiteHeader from "./SiteHeader";
import TaskSelector from "./TaskSelector";
import { COMPANY, DEFAULT_DOC, EXAMPLE_PROMPTS } from "../data/mockData";
import plantLineart from "../assets/plant-lineart.png";

interface Props {
  prompt: string;
  setPrompt: (v: string) => void;
  fileName: string | null;
  setFileName: (v: string | null) => void;
  task: string;
  setTask: (v: string) => void;
  onRun: () => void;
  onNewAnalysis: () => void;
  onOpenSettings: () => void;
}

/* ---------------------------------------------------------------- */
/* Small ambient widgets (visible on wide screens only)              */
/* ---------------------------------------------------------------- */

function SystemStatusCard() {
  return (
    <div className="card animate-float-slow p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          System status
        </p>
        <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-500" />
      </div>
      <div className="space-y-2 text-[12px] font-medium text-slate-600">
        <div className="flex items-center justify-between">
          <span>Local models</span>
          <span className="chip border border-emerald-200 bg-emerald-50 text-emerald-700">ONLINE</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Knowledge base</span>
          <span className="font-mono text-[11px] text-slate-500">1,284 docs</span>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span>GPU node · plant-2</span>
            <span className="font-mono text-[11px] text-slate-500">68%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" />
          </div>
        </div>
        {/* tiny activity sparkline */}
        <svg viewBox="0 0 100 26" className="mt-1 h-7 w-full text-cyan-500">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            points="0,20 12,16 24,18 36,10 48,14 60,8 72,12 84,6 100,10"
          />
        </svg>
        <p className="text-[10.5px] text-slate-400">Inference activity — last 24 h (idle)</p>
      </div>
    </div>
  );
}

function AiActivityCard() {
  const events = [
    { text: "VibeNet baseline sync", when: "06:00" },
    { text: "SOP-042 re-indexed", when: "Yesterday" },
    { text: "P-204 report archived", when: "Mon" },
  ];
  const bars = [40, 55, 35, 70, 30, 62, 48];
  return (
    <div className="card animate-float-slow p-4" style={{ animationDelay: "1.2s" }}>
      <div className="mb-3 flex items-center gap-2">
        <Bot size={14} className="text-brand-600" />
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          AI activity
        </p>
      </div>
      <div className="space-y-2">
        {events.map((e) => (
          <div key={e.text} className="flex items-center justify-between text-[12px]">
            <span className="font-medium text-slate-600">{e.text}</span>
            <span className="font-mono text-[10.5px] text-slate-400">{e.when}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-10 items-end gap-1 border-t border-slate-100 pt-2.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-brand-500/70 to-cyan-400/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="mt-1 text-[10.5px] text-slate-400">Analyses this week — 14 total</p>
    </div>
  );
}

function DocumentStackCard() {
  const docs = [
    { name: "Pump_P204_Inspection_Report.pdf", size: "2.1 MB" },
    { name: "Maintenance_SOP_042.pdf", size: "860 KB" },
    { name: "Vibration_Standard.pdf", size: "1.2 MB" },
  ];
  return (
    <div className="card animate-float-slow p-4" style={{ animationDelay: "0.6s" }}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Local document library
        </p>
        <span className="chip border border-blue-100 bg-blue-50 text-brand-600">SECURE</span>
      </div>
      <div className="space-y-2">
        {docs.map((d) => (
          <div key={d.name} className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50/60 px-2.5 py-2">
            <FileText size={14} className="shrink-0 text-brand-600" />
            <span className="truncate text-[11.5px] font-semibold text-navy-900">{d.name}</span>
            <span className="ml-auto shrink-0 font-mono text-[10px] text-slate-400">{d.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataBoundaryCard() {
  const lines = ["No external AI calls", "No cloud storage", "Air-gap ready"];
  return (
    <div className="card animate-float-slow overflow-hidden p-4" style={{ animationDelay: "1.8s" }}>
      <div className="mb-2 flex items-center gap-2">
        <ShieldCheck size={14} className="text-emerald-600" />
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Data boundary
        </p>
      </div>
      <div className="space-y-1.5">
        {lines.map((l) => (
          <p key={l} className="flex items-center gap-2 text-[12px] font-medium text-slate-600">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            {l}
          </p>
        ))}
      </div>
      <img
        src={plantLineart}
        alt=""
        className="mt-3 h-20 w-full rounded-lg object-cover opacity-80 mix-blend-multiply"
      />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main input / chat page                                            */
/* ---------------------------------------------------------------- */

export default function InputPage({
  prompt,
  setPrompt,
  fileName,
  setFileName,
  task,
  setTask,
  onRun,
  onNewAnalysis,
  onOpenSettings,
}: Props) {
  const attach = (name: string) => setFileName(name);

  const tryExample = (text: string) => {
    setPrompt(text);
    if (!fileName) setFileName(DEFAULT_DOC);
    document.getElementById("indra-composer")?.focus();
  };

  return (
    <div className="mesh-bg relative min-h-screen overflow-x-clip">
      {/* faint dot texture + industrial illustration backdrop */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(75%_55%_at_50%_28%,black,transparent)]" />
      <img
        src={plantLineart}
        alt=""
        className="pointer-events-none absolute left-1/2 top-[8.5rem] w-[820px] max-w-none -translate-x-1/2 opacity-[0.13] mix-blend-multiply select-none"
      />
      {/* soft colour blooms */}
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-72 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

      <SiteHeader onNewAnalysis={onNewAnalysis} onOpenSettings={onOpenSettings} />

      {/* ambient side widgets — wide screens only, kept out of the focus zone */}
      <div className="pointer-events-none absolute left-5 top-32 z-10 hidden w-64 flex-col gap-4 xl:flex 2xl:left-10">
        <SystemStatusCard />
        <AiActivityCard />
      </div>
      <div className="pointer-events-none absolute right-5 top-32 z-10 hidden w-64 flex-col gap-4 xl:flex 2xl:right-10">
        <DocumentStackCard />
        <DataBoundaryCard />
      </div>

      <main className="relative mx-auto max-w-3xl px-4 pb-16 pt-14 md:pt-20">
        {/* hero */}
        <div className="animate-fade-up text-center">
          <span className="chip mx-auto border border-blue-200 bg-white/80 text-brand-600 shadow-sm">
            <Sparkles size={12} />
            Agentic industrial AI · runs entirely inside your network
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-navy-900 md:text-[3.4rem]">
            Hello, how can{" "}
            <span className="bg-gradient-to-r from-brand-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              INDRA&nbsp;AI
            </span>{" "}
            help?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-base">
            Analyze confidential industrial documents without sending sensitive data
            outside your organization.
          </p>
        </div>

        {/* composer */}
        <div
          className="card mt-8 animate-fade-up bg-white/90 p-3 text-left backdrop-blur transition focus-within:border-brand-500/50 focus-within:shadow-[0_0_0_4px_rgba(46,99,255,0.08),0_16px_40px_-24px_rgba(11,31,63,0.25)]"
          style={{ animationDelay: "0.1s" }}
        >
          {/* attached document chip */}
          {fileName && (
            <div className="mb-2 flex animate-pop-in items-center gap-2.5 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-600 shadow-sm">
                <FileText size={15} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-navy-900">
                  {fileName}
                </span>
                <span className="block text-[11px] text-slate-400">2.1 MB · 14 pages · scanned image layer</span>
              </span>
              <span className="chip ml-auto border border-emerald-200 bg-emerald-50 text-emerald-700">
                ATTACHED
              </span>
              <button
                onClick={() => setFileName(null)}
                title="Remove document"
                className="grid h-6 w-6 place-items-center rounded-md text-slate-400 transition hover:bg-white hover:text-red-500"
              >
                <X size={13} />
              </button>
            </div>
          )}

          <textarea
            id="indra-composer"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") onRun();
            }}
            placeholder="Describe your problem or upload an industrial document..."
            className="w-full resize-none bg-transparent px-3 py-2.5 text-[15px] leading-relaxed text-navy-900 outline-none placeholder:text-slate-400"
          />

          {/* action bar */}
          <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 px-1.5 pb-1 pt-2.5">
            <button
              onClick={() => attach(DEFAULT_DOC)}
              title="Upload a document"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-brand-600"
            >
              <FileUp size={17} />
            </button>
            <button
              onClick={() => attach(DEFAULT_DOC)}
              title="Attach document"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-brand-600"
            >
              <Paperclip size={17} />
            </button>
            <button
              onClick={() => attach("P204_housing_photo.jpg")}
              title="Upload inspection image"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-brand-600"
            >
              <ImageIcon size={17} />
            </button>

            <span className="mx-1 h-6 w-px bg-slate-200" />

            <TaskSelector value={task} onChange={setTask} />

            <span className="ml-auto hidden items-center gap-1 font-mono text-[10.5px] text-slate-400 md:flex">
              Ctrl + Enter
            </span>

            <button
              onClick={onRun}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-500/40 hover:brightness-105 active:scale-[0.98]"
            >
              <Sparkles size={15} className="transition group-hover:rotate-12" />
              Run Analysis
            </button>
          </div>
        </div>

        {/* trust row */}
        <div
          className="mt-4 flex animate-fade-up flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[12px] font-medium text-slate-500"
          style={{ animationDelay: "0.18s" }}
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-600" /> 100% local processing
          </span>
          <span className="flex items-center gap-1.5">
            <WifiOff size={13} className="text-brand-600" /> No internet needed
          </span>
          <span className="flex items-center gap-1.5">
            <Database size={13} className="text-violet-500" /> {COMPANY} KB connected
          </span>
        </div>

        {/* example prompts */}
        <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.26s" }}>
          <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Try an example
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {EXAMPLE_PROMPTS.map((ex) => (
              <button
                key={ex.text}
                onClick={() => tryExample(ex.text)}
                className="card group relative flex items-start gap-3 p-4 text-left transition hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-lg hover:shadow-blue-600/10"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand-600 transition group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-cyan-500 group-hover:text-white">
                  <ex.icon size={16} />
                </span>
                <span>
                  <span className="block text-[13.5px] font-semibold leading-snug text-navy-900">
                    {ex.text}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-400">{ex.hint}</span>
                </span>
                <ArrowUpRight
                  size={15}
                  className="ml-auto shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600"
                />
              </button>
            ))}
          </div>
        </div>

        {/* simulated customer conversation */}
        <div
          className="card mx-auto mt-12 max-w-2xl animate-fade-up p-5 md:p-6"
          style={{ animationDelay: "0.34s" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Demo exchange
            </p>
            <span className="chip border border-violet-200 bg-violet-50 text-violet-600">
              {COMPANY} · simulated
            </span>
          </div>

          {/* customer message */}
          <div className="flex items-end justify-end gap-2.5">
            <div className="max-w-[85%] rounded-2xl rounded-br-md bg-navy-900 px-4 py-3 text-right shadow-md shadow-navy-900/15">
              <p className="mb-1 text-[10px] font-bold tracking-[0.14em] text-cyan-300">
                CUSTOMER · MAINTENANCE LEAD
              </p>
              <p className="text-[13.5px] leading-relaxed text-blue-50">
                Analyze the uploaded Pump P-204 inspection report and identify anything
                abnormal.
              </p>
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm">
              <UserRound size={15} />
            </span>
          </div>

          {/* INDRA reply */}
          <div className="mt-3.5 flex items-end gap-2.5">
            <Logo size={30} />
            <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50/80 px-4 py-3">
              <p className="mb-1 bg-gradient-to-r from-brand-600 to-cyan-500 bg-clip-text text-[10px] font-bold tracking-[0.14em] text-transparent">
                INDRA AI
              </p>
              <p className="text-[13.5px] leading-relaxed text-slate-600">
                I&rsquo;m ready to analyze the document using local processing. Attach your
                report above and press <span className="font-semibold text-navy-900">Run Analysis</span> —
                no data will leave this workstation.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="relative border-t border-slate-200/70 bg-white/50 py-6 backdrop-blur">
        <p className="text-center text-xs text-slate-400">
          INDRA AI · SIH 2026 prototype (SIH26117) · {COMPANY} (fictional) — all data on
          this demo is simulated.
        </p>
      </footer>
    </div>
  );
}
