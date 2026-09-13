import { ScanSearch, ShieldAlert } from "lucide-react";
import { LevelPill, SectionHeader, levelColor, useMounted } from "./Shared";
import { MATRIX_MARKERS, RISKS, ROOT_CAUSES } from "../../data/mockData";

/* ------------------------------------------------------------------ */
/* 03 — Possible root causes with animated confidence bars             */
/* ------------------------------------------------------------------ */

export function RootCausesSection() {
  const mounted = useMounted();

  return (
    <section>
      <SectionHeader
        index="03 · Diagnosis"
        icon={ScanSearch}
        title="Possible Root Causes"
        sub="Hypotheses ranked by spectral match against INDRA's local fault library."
      />

      <div className="card divide-y divide-slate-100">
        {ROOT_CAUSES.map((cause, i) => (
          <div key={cause.name} className="flex items-center gap-3.5 px-4 py-3.5 md:px-5">
            {/* rank */}
            <span className="w-7 shrink-0 font-display text-sm font-semibold text-slate-300">
              0{i + 1}
            </span>

            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
                i === 0
                  ? "border-red-100 bg-red-50 text-red-500"
                  : "border-blue-100 bg-blue-50 text-brand-600"
              }`}
            >
              <cause.icon size={17} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[14px] font-semibold text-navy-900">{cause.name}</p>
                {i === 0 && (
                  <span className="chip border border-red-200 bg-red-50 text-red-600">
                    MOST LIKELY
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-slate-400">{cause.note}</p>

              {/* confidence bar */}
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{
                    width: mounted ? `${cause.confidence}%` : "0%",
                    background:
                      i === 0
                        ? "linear-gradient(90deg,#f59e0b,#ef4444)"
                        : "linear-gradient(90deg,#2e63ff,#06b6d4)",
                  }}
                />
              </div>
            </div>

            <span className="w-14 shrink-0 text-right">
              <span className="font-display text-xl font-semibold tabular-nums text-navy-900">
                {cause.confidence}
              </span>
              <span className="text-[11px] font-medium text-slate-400">%</span>
              <span className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                conf.
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Risk analysis: rows + likelihood × impact matrix              */
/* ------------------------------------------------------------------ */

function matrixTint(l: number, i: number) {
  const s = l + i;
  if (s <= 3) return "bg-emerald-100/70";
  if (s <= 5) return "bg-amber-100/90";
  if (s <= 6) return "bg-orange-200/90";
  return "bg-red-200/90";
}

export function RiskSection() {
  const mounted = useMounted(140);

  return (
    <section>
      <SectionHeader
        index="04 · Risk analysis"
        icon={ShieldAlert}
        title="Risk Analysis"
        sub="Consequence × likelihood, weighted with Plant 2 operating context."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* risk rows */}
        <div className="card flex flex-col justify-center gap-3 p-5">
          {RISKS.map((r) => (
            <div
              key={r.label}
              className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3.5"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-blue-100 bg-white text-brand-600">
                  <r.icon size={16} />
                </span>
                <p className="text-[13.5px] font-semibold text-navy-900">{r.label}</p>
                <span className="ml-auto">
                  <LevelPill level={r.level} />
                </span>
              </div>
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-200/70">
                <div
                  className="h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{
                    width: mounted ? `${r.score}%` : "0%",
                    background: `linear-gradient(90deg, ${levelColor[r.level]}99, ${levelColor[r.level]})`,
                  }}
                />
              </div>
              <p className="mt-1.5 text-[11.5px] text-slate-400">{r.note}</p>
            </div>
          ))}
        </div>

        {/* risk matrix */}
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-[15px] font-semibold text-navy-900">
              Risk matrix
            </p>
            <span className="chip border border-slate-200 bg-slate-50 text-slate-500">
              LIKELIHOOD × IMPACT
            </span>
          </div>

          <div className="flex gap-2">
            {/* y-axis label */}
            <div className="flex items-center">
              <p className="-rotate-90 whitespace-nowrap text-[9px] font-bold tracking-[0.2em] text-slate-400">
                LIKELIHOOD →
              </p>
            </div>

            <div className="flex-1">
              {/* grid: likelihood rows 4 → 1, impact cols 1 → 4 */}
              <div className="grid grid-cols-4 gap-1.5">
                {[4, 3, 2, 1].map((l) =>
                  [1, 2, 3, 4].map((i) => {
                    const marker = MATRIX_MARKERS.find((m) => m.l === l && m.i === i);
                    return (
                      <div
                        key={`${l}-${i}`}
                        className={`flex h-12 items-center justify-center rounded-lg transition md:h-14 ${matrixTint(l, i)}`}
                      >
                        {marker && (
                          <span
                            title={marker.label}
                            className="grid h-7 w-7 animate-pop-in place-items-center rounded-full text-[11px] font-bold text-white shadow-md ring-2 ring-white"
                            style={{ background: marker.color }}
                          >
                            {marker.key}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
              <p className="mt-2 text-center text-[9px] font-bold tracking-[0.2em] text-slate-400">
                IMPACT →
              </p>
            </div>
          </div>

          {/* marker legend */}
          <div className="mt-3 grid gap-1.5 border-t border-slate-100 pt-3">
            {MATRIX_MARKERS.map((m) => (
              <p key={m.key} className="flex items-center gap-2 text-[12px] text-slate-500">
                <span
                  className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold text-white"
                  style={{ background: m.color }}
                >
                  {m.key}
                </span>
                {m.label}
                <span className="ml-auto font-mono text-[10.5px] text-slate-400">
                  L{m.l} · I{m.i}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
