import { useState } from "react";
import { BadgeCheck, Clock3, Workflow } from "lucide-react";
import { SectionHeader } from "./Shared";
import { WORKFLOW_STEPS } from "../../data/mockData";

/** 08 — Clickable agentic-AI pipeline visualisation. */
export default function AgentWorkflow() {
  const [selected, setSelected] = useState(3); // default: DETECT ANOMALY
  const step = WORKFLOW_STEPS[selected];

  return (
    <section>
      <SectionHeader
        index="08 · Agentic workflow"
        icon={Workflow}
        title="How INDRA AI Produced This Answer"
        sub="Click any step to inspect what the agent did, how long it took, and what it produced."
      />

      <div className="card p-5">
        {/* horizontal pipeline */}
        <div className="-mx-1 overflow-x-auto px-1 pb-2">
          <div className="flex min-w-max items-stretch">
            {WORKFLOW_STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <button
                  onClick={() => setSelected(i)}
                  className={`group flex w-[7.6rem] flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition ${
                    selected === i
                      ? "border-brand-500/50 bg-blue-50/70 shadow-sm"
                      : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`relative grid h-11 w-11 place-items-center rounded-xl border transition ${
                      selected === i
                        ? "border-brand-500/50 bg-gradient-to-br from-brand-600 to-cyan-500 text-white shadow-md shadow-blue-500/30"
                        : "border-slate-200 bg-white text-slate-500 group-hover:border-brand-500/40 group-hover:text-brand-600"
                    }`}
                  >
                    <s.icon size={17} />
                    {/* completion tick */}
                    <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                      <BadgeCheck size={10} />
                    </span>
                  </span>
                  <span
                    className={`text-[9.5px] font-bold tracking-[0.12em] ${
                      selected === i ? "text-brand-700" : "text-slate-500"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="font-mono text-[9.5px] text-slate-400">{s.duration}</span>
                </button>

                {/* connector */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <span className="mx-1 h-0.5 w-5 shrink-0 rounded bg-gradient-to-r from-brand-500/50 to-cyan-400/50" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* detail panel */}
        <div
          key={selected}
          className="mt-4 animate-fade-up rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-cyan-500 text-white">
              <step.icon size={15} />
            </span>
            <p className="font-display text-[15px] font-semibold tracking-wide text-navy-900">
              {step.label}
            </p>
            <span className="chip border border-emerald-200 bg-emerald-50 text-emerald-700">
              <BadgeCheck size={11} /> COMPLETE
            </span>
            <span className="chip ml-auto border border-slate-200 bg-white font-mono text-slate-500">
              <Clock3 size={11} /> {step.duration}
            </span>
          </div>

          <p className="mt-3 max-w-3xl text-[13.5px] leading-relaxed text-slate-600">
            {step.desc}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Outputs
            </span>
            {step.outputs.map((o) => (
              <span key={o} className="chip border border-blue-100 bg-blue-50 text-brand-700">
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
