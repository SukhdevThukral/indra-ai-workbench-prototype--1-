import { useState } from "react";
import { BadgeCheck, Download, Eye, FileCheck2, Loader2, X } from "lucide-react";
import { SectionHeader } from "./Shared";
import {
  ACTION_NOTE,
  ANALYSIS_ID,
  COMPANY,
  DELIVERABLES,
  EQUIPMENT,
  PARTS_TABLE,
} from "../../data/mockData";
import type { Deliverable } from "../../data/mockData";

/** Creates a small text/CSV download so buttons produce a real file. */
function downloadSimulated(d: Deliverable) {
  let name = d.name;
  let content = "";

  if (d.kind === "xlsx") {
    name = name.replace(".xlsx", ".csv");
    content =
      "Part,Qty,Est. cost,Lead time\n" +
      PARTS_TABLE.map((r) => `${r.part},${r.qty},${r.cost},${r.lead}`).join("\n") +
      "\nTOTAL,,₹33,800,";
  } else if (d.kind === "docx") {
    name = name.replace(".docx", ".txt");
    content = `APPROVAL NOTE — ${ANALYSIS_ID}\n${COMPANY} (fictional)\n\n${ACTION_NOTE}\n\nPrepared by INDRA AI · simulated prototype data`;
  } else {
    name = name.replace(".pdf", ".txt");
    content = `INSPECTION SUMMARY — ${ANALYSIS_ID}\nEquipment: ${EQUIPMENT}\nFinding: Abnormal vibration — 8.7 mm/s RMS (normal 0-4.5)\nSeverity: HIGH · Confidence: 87%\n\n${ACTION_NOTE}\n\nINDRA AI · simulated prototype data`;
  }

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

/* -------- Simulated file bodies for the preview modal -------- */

function PdfBody() {
  const rows: [string, string][] = [
    ["Equipment", `${EQUIPMENT} — centrifugal, 2,980 rpm`],
    ["Finding", "Abnormal vibration — 8.7 mm/s RMS (normal 0–4.5)"],
    ["Pattern", "Dominant 1× running-speed peak, +6 °C drift"],
    ["Severity", "HIGH · Confidence 87%"],
    ["Action", "Bearing + shaft-alignment inspection within 24 h"],
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 font-mono text-[11.5px] leading-relaxed text-slate-600">
      <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-navy-900">
        Inspection Summary
      </p>
      <p className="mb-3 text-slate-400">
        {ANALYSIS_ID} · {COMPANY}
      </p>
      {rows.map(([k, v]) => (
        <p key={k}>
          <span className="text-slate-400">{k.padEnd(10, " ")}</span> {v}
        </p>
      ))}
      <p className="mt-3 border-t border-dashed border-slate-200 pt-3">
        {ACTION_NOTE} — full detail in the dashboard above.
      </p>
    </div>
  );
}

function DocxBody() {
  const memo: [string, string][] = [
    ["TO", "Maintenance Superintendent — Plant 2"],
    ["FROM", "INDRA AI Workbench (local node IND-02)"],
    ["SUBJECT", `Approval request — ${EQUIPMENT} bearing & alignment inspection`],
    ["PRIORITY", "HIGH — 24 h window per SOP-042 §4.3"],
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 text-[12.5px] leading-relaxed text-slate-600">
      {memo.map(([k, v]) => (
        <p key={k}>
          <span className="mr-2 inline-block w-16 font-bold text-navy-900">{k}:</span>
          {v}
        </p>
      ))}
      <p className="mt-3 border-t border-dashed border-slate-200 pt-3">{ACTION_NOTE}</p>
      <p className="mt-3 italic text-slate-400">
        Prepared for digital sign-off · {COMPANY} (simulated document)
      </p>
    </div>
  );
}

function XlsxBody() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="bg-navy-900 text-left text-blue-100">
            <th className="px-3 py-2 font-semibold">Corrective item</th>
            <th className="px-3 py-2 font-semibold">Qty</th>
            <th className="px-3 py-2 font-semibold">Est. cost</th>
            <th className="px-3 py-2 font-semibold">Lead</th>
          </tr>
        </thead>
        <tbody>
          {PARTS_TABLE.map((r) => (
            <tr key={r.part} className="border-t border-slate-100 text-slate-600">
              <td className="px-3 py-2">{r.part}</td>
              <td className="px-3 py-2 font-mono">{r.qty}</td>
              <td className="px-3 py-2 font-mono">{r.cost}</td>
              <td className="px-3 py-2 font-mono">{r.lead}</td>
            </tr>
          ))}
          <tr className="border-t border-slate-200 bg-slate-50 font-semibold text-navy-900">
            <td className="px-3 py-2">TOTAL</td>
            <td className="px-3 py-2" />
            <td className="px-3 py-2 font-mono">₹33,800</td>
            <td className="px-3 py-2" />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------- Section ---------------------------- */

export default function Deliverables({ busy }: { busy: boolean }) {
  const [selected, setSelected] = useState<Deliverable | null>(null);

  return (
    <section>
      <SectionHeader
        index="10 · Deliverables"
        icon={FileCheck2}
        title="Generated Deliverables"
        sub="Business-ready outputs drafted locally by INDRA-Analyst."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {DELIVERABLES.map((d) => (
          <div key={d.name} className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-xl border ${d.accent}`}>
                {busy ? <Loader2 size={18} className="animate-spin" /> : <d.icon size={18} />}
              </span>
              <span className="chip border border-emerald-200 bg-emerald-50 text-emerald-700">
                <BadgeCheck size={11} /> {busy ? "UPDATING" : "GENERATED"}
              </span>
            </div>

            <p className="mt-3 truncate font-display text-[15px] font-semibold text-navy-900">
              {d.name}
            </p>
            <p className="font-mono text-[10.5px] text-slate-400">{d.size}</p>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-500">{d.desc}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setSelected(d)}
                disabled={busy}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-navy-800 disabled:opacity-50"
              >
                <Eye size={13} /> View
              </button>
              <button
                onClick={() => downloadSimulated(d)}
                disabled={busy}
                title="Download (simulated)"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-500/40 hover:text-brand-600 disabled:opacity-50"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Preview modal ---------------- */}
      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-navy-950/45 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="card w-full max-w-2xl animate-pop-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <span className={`grid h-10 w-10 place-items-center rounded-xl border ${selected.accent}`}>
                <selected.icon size={17} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-[15px] font-semibold text-navy-900">
                  {selected.name}
                </p>
                <p className="font-mono text-[10.5px] text-slate-400">{selected.size}</p>
              </div>
              <span className="chip ml-auto border border-amber-200 bg-amber-50 text-amber-600">
                SIMULATED FILE
              </span>
              <button
                onClick={() => setSelected(null)}
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto bg-slate-50/70 p-5">
              {selected.kind === "pdf" && <PdfBody />}
              {selected.kind === "docx" && <DocxBody />}
              {selected.kind === "xlsx" && <XlsxBody />}
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-5 py-3.5">
              <p className="text-[11px] text-slate-400">Rendered locally · no upload</p>
              <button
                onClick={() => downloadSimulated(selected)}
                className="ml-auto flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-brand-500/40 hover:text-brand-600"
              >
                <Download size={13} /> Download (simulated)
              </button>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg bg-navy-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-navy-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
