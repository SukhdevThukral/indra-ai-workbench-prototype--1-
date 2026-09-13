import { Activity } from "lucide-react";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHeader, toneTile, toneValue } from "./Shared";
import {
  CONDITIONS,
  CRITICAL_LIMIT,
  VIBRATION_DATA,
  WARNING_LIMIT,
} from "../../data/mockData";

/* Custom tooltip for the vibration chart */
function ChartTip(props: any) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  const v = payload[0].value as number;
  const status = v > CRITICAL_LIMIT ? "CRITICAL" : v > WARNING_LIMIT ? "WARNING" : "NORMAL";
  const color =
    v > CRITICAL_LIMIT ? "text-red-500" : v > WARNING_LIMIT ? "text-amber-600" : "text-emerald-600";
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
      <p className="font-mono text-[10.5px] text-slate-400">{label}</p>
      <p className="font-display text-base font-semibold text-navy-900">
        {v.toFixed(1)} <span className="text-[11px] font-medium text-slate-400">mm/s RMS</span>
      </p>
      <p className={`text-[10px] font-bold tracking-wider ${color}`}>{status}</p>
    </div>
  );
}

/** 02 — Observed conditions + vibration trend chart. */
export default function AnomalySection() {
  return (
    <section>
      <SectionHeader
        index="02 · Anomaly analysis"
        icon={Activity}
        title="Detailed Anomaly Analysis"
        sub="Operating conditions reconstructed from the inspection log and sensor exports."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_1fr]">
        {/* observed conditions */}
        <div className="card p-4">
          <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Observed conditions
          </p>
          <div className="grid gap-2">
            {CONDITIONS.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5 transition hover:border-slate-200"
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${toneTile[c.tone]}`}
                >
                  <c.icon size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-medium text-slate-400">{c.label}</span>
                  <span
                    className={`block font-mono text-[13.5px] font-semibold ${toneValue[c.tone]}`}
                  >
                    {c.value}
                  </span>
                </span>
                <span className="ml-auto max-w-[112px] text-right text-[10.5px] leading-tight text-slate-400">
                  {c.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* vibration chart */}
        <div className="card p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div>
              <p className="font-display text-[15px] font-semibold text-navy-900">
                Vibration trend — Pump P-204
              </p>
              <p className="text-xs text-slate-400">
                Drive-end velocity RMS · last 20 h of logged readings
              </p>
            </div>
            <span className="chip ml-auto border border-slate-200 bg-slate-50 font-mono text-slate-500">
              mm/s
            </span>
            <span className="chip border border-red-200 bg-red-50 text-red-600">
              LATEST 8.7 mm/s
            </span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={VIBRATION_DATA} margin={{ top: 16, right: 12, bottom: 0, left: -16 }}>
                <defs>
                  <linearGradient id="vibStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2e63ff" />
                    <stop offset="55%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 6" vertical={false} />
                <XAxis
                  dataKey="t"
                  tick={{ fontSize: 10.5, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  interval={2}
                />
                <YAxis
                  domain={[0, 10]}
                  tickCount={6}
                  tick={{ fontSize: 10.5, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={<ChartTip />}
                  cursor={{ stroke: "#2e63ff", strokeWidth: 1, strokeDasharray: "4 4" }}
                />
                {/* normal operating band */}
                <ReferenceArea
                  y1={0}
                  y2={WARNING_LIMIT}
                  fill="#10b981"
                  fillOpacity={0.07}
                  label={{
                    value: "NORMAL RANGE",
                    position: "insideTopLeft",
                    fontSize: 9.5,
                    fill: "#059669",
                  }}
                />
                {/* abnormal region */}
                <ReferenceArea
                  x1="13:00"
                  x2="01:00"
                  fill="#ef4444"
                  fillOpacity={0.06}
                  label={{
                    value: "ABNORMAL REGION",
                    position: "insideTopRight",
                    fontSize: 9.5,
                    fill: "#ef4444",
                  }}
                />
                <ReferenceLine
                  y={WARNING_LIMIT}
                  stroke="#f59e0b"
                  strokeDasharray="7 5"
                  strokeWidth={1.8}
                  label={{
                    value: "WARNING 4.5",
                    position: "insideBottomRight",
                    fontSize: 9.5,
                    fill: "#d97706",
                  }}
                />
                <ReferenceLine
                  y={CRITICAL_LIMIT}
                  stroke="#ef4444"
                  strokeDasharray="7 5"
                  strokeWidth={1.8}
                  label={{
                    value: "CRITICAL 7.5",
                    position: "insideTopRight",
                    fontSize: 9.5,
                    fill: "#ef4444",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="url(#vibStroke)"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, fill: "#1d4ed8", stroke: "#fff", strokeWidth: 2 }}
                />
                <ReferenceDot x="01:00" y={8.7} r={5} fill="#ef4444" stroke="#fff" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* legend */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-4 rounded-sm bg-gradient-to-r from-brand-500 to-red-400" />
              Actual vibration
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-4 rounded-sm bg-emerald-400/50" />
              Normal range (0–4.5)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0 w-4 border-t-2 border-dashed border-amber-500" />
              Warning 4.5
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0 w-4 border-t-2 border-dashed border-red-500" />
              Critical 7.5
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-4 rounded-sm bg-red-300/40" />
              Abnormal region
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
