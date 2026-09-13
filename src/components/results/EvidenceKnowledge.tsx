import { useState } from "react";
import { Camera, ChevronDown, Database, FileText, SearchCheck, WifiOff, ZoomIn } from "lucide-react";
import { SectionHeader } from "./Shared";
import {
  DEFAULT_DOC,
  DOC_LOG_ROWS,
  EVIDENCE_CHIPS,
  INSPECTION_IMAGE,
  KNOWLEDGE_DOCS,
} from "../../data/mockData";

const ZOOMS = [
  { cls: "text-[9.5px]", label: "100%" },
  { cls: "text-[11px]", label: "118%" },
  { cls: "text-[12.5px]", label: "135%" },
];

function scrollToEvidence() {
  document.getElementById("evidence")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ------------------------------------------------------------------ */
/* 06 — Evidence found by INDRA AI                                     */
/* ------------------------------------------------------------------ */

export function EvidenceSection() {
  const [zoom, setZoom] = useState(0);

  return (
    <section id="evidence">
      <SectionHeader
        index="06 · Evidence"
        icon={Camera}
        title="Evidence Found by INDRA AI"
        sub="Every claim is anchored to a page, a reading, or a region in the source document."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* --- document preview with OCR highlights --- */}
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3">
            <FileText size={15} className="shrink-0 text-brand-600" />
            <span className="truncate text-[13px] font-semibold text-navy-900">{DEFAULT_DOC}</span>
            <span className="chip ml-auto border border-slate-200 bg-slate-50 font-mono text-slate-500">
              p.3 / 14
            </span>
            <button
              onClick={() => setZoom((z) => (z + 1) % ZOOMS.length)}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 font-mono text-[10px] font-semibold text-slate-500 transition hover:border-brand-500/40 hover:text-brand-600"
              title="Cycle zoom"
            >
              <ZoomIn size={12} />
              {ZOOMS[zoom].label}
            </button>
          </div>

          {/* simulated page */}
          <div className="bg-slate-100/80 p-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <p
                className={`font-mono font-semibold uppercase tracking-[0.18em] text-navy-800 ${ZOOMS[zoom].cls}`}
              >
                Gooloo Gooloo Industries — Pump Inspection Report
              </p>
              <p className={`mt-0.5 font-mono text-slate-400 ${ZOOMS[zoom].cls}`}>
                Table 2 · Vibration &amp; thermal log · Pump P-204 (drive end)
              </p>

              <div className="mt-2.5 overflow-hidden rounded-md border border-slate-200">
                <table className={`w-full font-mono ${ZOOMS[zoom].cls}`}>
                  <thead>
                    <tr className="bg-navy-900 text-left text-blue-100">
                      <th className="px-2.5 py-1.5 font-semibold">TIME</th>
                      <th className="px-2.5 py-1.5 font-semibold">VEL (mm/s)</th>
                      <th className="px-2.5 py-1.5 font-semibold">TEMP (°C)</th>
                      <th className="px-2.5 py-1.5 font-semibold">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DOC_LOG_ROWS.map((row) => (
                      <tr
                        key={row.time}
                        className={`border-t border-slate-100 ${
                          row.status === "HIGH"
                            ? "bg-red-50/90 text-red-700"
                            : row.status === "WARN"
                              ? "bg-amber-50/80 text-amber-700"
                              : "text-slate-500"
                        }`}
                      >
                        <td className="px-2.5 py-1.5">{row.time}</td>
                        <td className="px-2.5 py-1.5 font-semibold">{row.vel}</td>
                        <td className="px-2.5 py-1.5">{row.temp}</td>
                        <td className="px-2.5 py-1.5">
                          <span
                            className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide ${
                              row.status === "HIGH"
                                ? "bg-red-500 text-white"
                                : row.status === "WARN"
                                  ? "bg-amber-400 text-white"
                                  : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p
                className={`mt-2 font-mono text-red-500 ${ZOOMS[zoom].cls} flex items-center gap-1.5`}
              >
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                AI FLAG: last 4 readings exceed the 4.5 mm/s SOP threshold
              </p>
            </div>
          </div>

          <p className="border-t border-slate-100 px-4 py-2.5 text-[11px] text-slate-400">
            Highlighted regions extracted by INDRA-Vision (OCR + table parse) · page reference p.3
          </p>
        </div>

        {/* --- inspection image with detected region --- */}
        <div className="card overflow-hidden">
          <div className="relative">
            <img
              src={INSPECTION_IMAGE}
              alt="Inspection photo of Pump P-204 pipework and pressure gauge"
              className="h-64 w-full object-cover md:h-72"
            />
            <span className="chip absolute left-3 top-3 border border-white/30 bg-navy-950/70 text-white backdrop-blur">
              INSPECTION IMAGE · extracted from p.4
            </span>

            {/* AI highlight box */}
            <div className="absolute left-[16%] top-[18%] h-[46%] w-[42%] animate-pop-in rounded-lg border-2 border-red-400 bg-red-500/10 shadow-[0_0_0_4px_rgba(239,68,68,0.18)]">
              <span className="absolute -bottom-7 left-0 whitespace-nowrap rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white shadow-md">
                Drive-end region · thermal discolouration
              </span>
            </div>
          </div>

          {/* evidence readings */}
          <div className="grid gap-2 p-4">
            {EVIDENCE_CHIPS.map((chip) => (
              <div
                key={chip.label}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-blue-100 bg-white text-brand-600">
                  <chip.icon size={14} />
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  {chip.label}
                </span>
                <span className="ml-auto font-mono text-[12.5px] font-semibold text-navy-900">
                  {chip.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 07 — Local knowledge search (expandable source cards)               */
/* ------------------------------------------------------------------ */

export function KnowledgeSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section>
      <SectionHeader
        index="07 · Local knowledge"
        icon={Database}
        title="Local Knowledge Search"
        sub="INDRA AI searched the Gooloo Gooloo local knowledge base for matching procedures and limits."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="chip border border-blue-100 bg-blue-50 text-brand-600">
          <Database size={11} /> 1,284 documents indexed
        </span>
        <span className="chip border border-violet-200 bg-violet-50 text-violet-600">
          <SearchCheck size={11} /> 3 sources matched
        </span>
        <span className="chip border border-emerald-200 bg-emerald-50 text-emerald-700">
          <WifiOff size={11} /> 0 network calls
        </span>
      </div>

      <div className="grid gap-3">
        {KNOWLEDGE_DOCS.map((doc, i) => {
          const isOpen = open === i;
          return (
            <div key={doc.name} className="card overflow-hidden">
              {/* header row */}
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition hover:bg-slate-50/70 md:px-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600">
                  <FileText size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-navy-900">
                    {doc.name}
                  </span>
                  <span className="block text-[11px] text-slate-400">{doc.pages}</span>
                </span>

                {/* relevance */}
                <span className="ml-auto hidden w-40 shrink-0 items-center gap-2 sm:flex">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-violet-500 to-brand-500"
                      style={{ width: `${doc.relevance}%` }}
                    />
                  </span>
                </span>
                <span className="chip shrink-0 border border-violet-200 bg-violet-50 text-violet-700">
                  {doc.relevance}% match
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* expandable body */}
              {isOpen && (
                <div className="animate-fade-up border-t border-slate-100 px-4 py-4 md:px-5">
                  <p className="rounded-xl border-l-2 border-brand-500 bg-slate-50/80 px-4 py-3 text-[13px] leading-relaxed text-slate-600">
                    {doc.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {doc.matches.map((m) => (
                      <span
                        key={m}
                        className="chip border border-slate-200 bg-white text-slate-500"
                      >
                        {m}
                      </span>
                    ))}
                    <button
                      onClick={scrollToEvidence}
                      className="chip ml-auto border border-brand-500/30 bg-blue-50 text-brand-600 transition hover:bg-blue-100"
                    >
                      Preview highlighted page
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
