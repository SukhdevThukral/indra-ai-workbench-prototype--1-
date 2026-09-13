import {
  ArrowDown,
  BookOpen,
  Cpu,
  Database,
  FileOutput,
  FlaskConical,
  Globe,
  Lock,
  Server,
  ShieldCheck,
  Upload,
  WifiOff,
  Zap,
} from "lucide-react";
import { SectionHeader } from "./Shared";
import { COMPANY } from "../../data/mockData";

const STATS = [
  { icon: Server, label: "Local processing", value: "ACTIVE", good: true },
  { icon: Globe, label: "External AI calls", value: "0", good: true },
  { icon: Upload, label: "Data exported", value: "0 MB", good: true },
  { icon: WifiOff, label: "Internet dependency", value: "OFF", good: true },
];

const FLOW = [
  { icon: Database, label: "CONFIDENTIAL DATA", cap: "Plant documents & sensor exports" },
  { icon: Zap, label: "INDRA AI", cap: "Air-gapped inference runtime" },
  { icon: Cpu, label: "LOCAL MODELS", cap: "INDRA-OCR · VibeNet · Analyst 7B" },
  { icon: BookOpen, label: "LOCAL KNOWLEDGE", cap: "1,284 indexed documents" },
  { icon: FileOutput, label: "FINAL OUTPUT", cap: "Report · approval note · workbook" },
];

/** 11 — Dark "security boundary" panel with the local data-flow diagram. */
export default function SecurityPanel() {
  return (
    <section>
      <SectionHeader
        index="11 · Security"
        icon={ShieldCheck}
        title="Security & Data Boundary"
        sub="Why this analysis never left the organization's controlled environment."
      />

      <div className="relative overflow-hidden rounded-[1.5rem] border border-navy-800 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0d2b5e] p-6 text-blue-50 md:p-8">
        {/* texture + watermark */}
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
        <ShieldCheck className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 text-white/[0.04]" />

        {/* header */}
        <div className="relative mb-6 flex flex-wrap items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-300">
            <Lock size={17} />
          </span>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-white">
              SECURITY STATUS
            </p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/60">
              {COMPANY} · Plant 2 enclave
            </p>
          </div>
          <span className="chip ml-auto border border-amber-300/40 bg-amber-400/10 font-bold tracking-wider text-amber-300">
            <FlaskConical size={11} /> SIMULATED PROTOTYPE DATA
          </span>
        </div>

        <div className="relative grid gap-8 lg:grid-cols-2">
          {/* left: stat rows */}
          <div className="space-y-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-sm"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-400/10 text-cyan-300">
                  <s.icon size={15} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200/70">
                  {s.label}
                </span>
                <span
                  className={`ml-auto font-mono text-[15px] font-semibold ${
                    s.value === "0" || s.value === "0 MB" || s.value === "OFF"
                      ? "text-white"
                      : "text-emerald-300"
                  }`}
                >
                  {s.value}
                </span>
                {s.value === "ACTIVE" && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                    <ShieldCheck size={11} />
                  </span>
                )}
              </div>
            ))}

            <p className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[12px] leading-relaxed text-blue-200/70">
              This analysis executed entirely inside the {COMPANY} Plant 2 enclave.
              Zero outbound packets were observed during the run — raw documents,
              embeddings and outputs remain on local storage.
            </p>

            <p className="font-mono text-[10.5px] text-blue-300/50">
              PACKET LEDGER — outbound: 0 B · inbound: 0 B · session isolated · TLS n/a
            </p>
          </div>

          {/* right: local data-flow diagram */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200/60">
              Data path — never crosses the boundary
            </p>
            <div className="space-y-1">
              {FLOW.map((node, i) => (
                <div key={node.label}>
                  <div
                    className={`flex items-center gap-3.5 rounded-xl border px-4 py-3 transition ${
                      node.label === "INDRA AI"
                        ? "border-cyan-300/40 bg-gradient-to-r from-cyan-400/15 to-brand-500/10 shadow-[0_0_30px_-8px_rgba(6,182,212,0.5)]"
                        : "border-white/10 bg-white/[0.05]"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                        node.label === "INDRA AI"
                          ? "bg-gradient-to-br from-brand-500 to-cyan-400 text-white"
                          : "border border-white/15 bg-white/10 text-cyan-200"
                      }`}
                    >
                      <node.icon size={15} />
                    </span>
                    <div>
                      <p className="text-[12.5px] font-bold tracking-[0.1em] text-white">
                        {node.label}
                      </p>
                      <p className="text-[11px] text-blue-200/60">{node.cap}</p>
                    </div>
                    {node.label === "INDRA AI" && (
                      <span className="chip ml-auto border border-cyan-300/40 bg-cyan-400/10 text-cyan-200">
                        THIS RUN
                      </span>
                    )}
                  </div>
                  {i < FLOW.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown size={15} className="text-cyan-300/60" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
