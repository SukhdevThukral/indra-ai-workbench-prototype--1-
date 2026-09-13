import { useEffect, useState } from "react";
import { ArrowRight, Check, Cpu, FileText, Loader2, ShieldCheck } from "lucide-react";
import Logo from "./Logo";
import { COMPANY, LOCAL_MODELS, PROCESS_STEPS } from "../data/mockData";
import plantLineart from "../assets/plant-lineart.png";

interface Props {
  task: string;
  fileName: string | null;
  onComplete: () => void;
}

/**
 * Simulated processing screen — walks through the analysis pipeline
 * step-by-step, then hands over to the results page automatically.
 *
 * NOTE: This is a timed simulation only. No real inference happens.
 */
export default function ProcessingScreen({ task, fileName, onComplete }: Props) {
  const total = PROCESS_STEPS.length;
  const [step, setStep] = useState(0); // index of the step currently running
  const [pct, setPct] = useState(0); // smoothly animated percentage

  // advance one pipeline step every ~0.8 s, then finish
  useEffect(() => {
    if (step >= total) {
      const done = setTimeout(onComplete, 800);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setStep((s) => s + 1), 820);
    return () => clearTimeout(next);
  }, [step, total, onComplete]);

  // ease the percentage counter towards the step-based target
  useEffect(() => {
    const target = Math.round((step / total) * 100);
    const id = setInterval(() => {
      setPct((p) => (p < target ? Math.min(p + 1, target) : p));
    }, 18);
    return () => clearInterval(id);
  }, [step, total]);

  const currentTask =
    step < total ? PROCESS_STEPS[step].label : "Analysis complete — compiling report";

  return (
    <div className="mesh-bg relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]" />
      <img
        src={plantLineart}
        alt=""
        className="pointer-events-none absolute -bottom-10 left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.1] mix-blend-multiply select-none"
      />

      <div className="card relative w-full max-w-3xl animate-pop-in p-6 md:p-8">
        {/* header */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="conic-ring absolute -inset-1 animate-ring-spin rounded-[1.1rem] opacity-70 blur-[3px]" />
            <div className="relative">
              <Logo size={52} />
            </div>
          </div>
          <div>
            <p className="bg-gradient-to-r from-brand-600 to-cyan-500 bg-clip-text text-[10px] font-bold uppercase tracking-[0.24em] text-transparent">
              INDRA AI · Sovereign pipeline
            </p>
            <h1 className="font-display text-xl font-semibold tracking-tight text-navy-900 md:text-2xl">
              Analyzing your industrial document&hellip;
            </h1>
          </div>
        </div>

        {/* document chip */}
        <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5">
          <FileText size={15} className="shrink-0 text-brand-600" />
          <span className="truncate text-[13px] font-semibold text-navy-900">
            {fileName ?? "Industrial document"}
          </span>
          <span className="chip ml-auto border border-emerald-200 bg-emerald-50 text-emerald-700">
            SECURE CHANNEL
          </span>
        </div>

        {/* pipeline steps */}
        <div className="mt-5 grid gap-2 md:grid-cols-2">
          {PROCESS_STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div
                key={s.label}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all duration-300 ${
                  done
                    ? "border-emerald-200/80 bg-emerald-50/50"
                    : active
                      ? "border-brand-500/40 bg-blue-50/70 shadow-sm"
                      : "border-slate-200/60 bg-white"
                }`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                    done
                      ? "animate-pop-in bg-emerald-500 text-white"
                      : active
                        ? "bg-brand-600 text-white"
                        : "border-2 border-slate-200 text-transparent"
                  }`}
                >
                  {done ? (
                    <Check size={13} strokeWidth={3} />
                  ) : active ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Check size={13} strokeWidth={3} />
                  )}
                </span>
                <div className="min-w-0">
                  <p
                    className={`truncate text-[12.5px] font-semibold ${
                      done ? "text-slate-700" : active ? "text-brand-700" : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </p>
                  {(done || active) && (
                    <p className="truncate text-[10.5px] text-slate-400">{s.detail}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* progress */}
        <div className="mt-6">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Processing
              </p>
              <p className="mt-0.5 text-[13px] font-semibold text-navy-900">
                Current AI task: <span className="text-brand-600">{currentTask}</span>
              </p>
            </div>
            <p className="font-display text-3xl font-semibold tabular-nums text-navy-900">
              {pct}
              <span className="text-base text-slate-400">%</span>
            </p>
          </div>
          <div className="relative h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-brand-600 via-blue-500 to-cyan-400 transition-[width] duration-300"
              style={{ width: `${Math.max(pct, 3)}%` }}
            >
              <span className="absolute inset-y-0 w-16 animate-shimmer bg-white/40 blur-sm" />
            </div>
          </div>
        </div>

        {/* run metadata */}
        <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
          {[
            { l: "Document", v: "14 pages" },
            { l: "Task type", v: task },
            { l: "Pipeline", v: "3 local models" },
            { l: "Customer", v: "Gooloo Gooloo" },
          ].map((m) => (
            <div key={m.l} className="rounded-xl border border-slate-200/70 bg-slate-50/60 px-3 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {m.l}
              </p>
              <p className="mt-0.5 truncate text-[12.5px] font-semibold text-navy-900">{m.v}</p>
            </div>
          ))}
        </div>

        {/* models in use */}
        <div className="mt-4 rounded-xl border border-slate-200/70 bg-white p-3">
          <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Models being used — all on-premise
          </p>
          <div className="grid gap-1.5 md:grid-cols-3">
            {LOCAL_MODELS.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-2.5 rounded-lg bg-slate-50/80 px-3 py-2"
              >
                <Cpu size={14} className="shrink-0 text-violet-500" />
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold text-navy-900">{m.name}</p>
                  <p className="truncate text-[10.5px] text-slate-400">{m.role}</p>
                </div>
                <span className="chip ml-auto border border-emerald-200 bg-emerald-50 text-emerald-700">
                  LOCAL
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500">
            <ShieldCheck size={13} className="text-emerald-600" />
            {COMPANY} enclave — zero external calls during this run
          </p>
          <button
            onClick={onComplete}
            className="group ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-brand-600"
          >
            Skip demo animation
            <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
