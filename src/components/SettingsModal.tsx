import { useState } from "react";
import { Info, Lock, Settings2, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface ToggleProps {
  label: string;
  hint: string;
  on: boolean;
  onChange: (v: boolean) => void;
}

/** Small switch used in the settings rows. */
function Toggle({ label, hint, on, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      className="flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
    >
      <span>
        <span className="block text-[13px] font-semibold text-navy-900">{label}</span>
        <span className="block text-xs text-slate-400">{hint}</span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-gradient-to-r from-brand-600 to-cyan-500" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            on ? "left-[1.375rem]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}

/** Simulated settings panel — changes only live for the demo session. */
export default function SettingsModal({ open, onClose }: Props) {
  const [ocr, setOcr] = useState(true);
  const [vision, setVision] = useState(true);
  const [knowledge, setKnowledge] = useState(true);
  const [deliverables, setDeliverables] = useState(false);
  const [model, setModel] = useState("INDRA-Analyst 7B (Q4, local)");

  if (!open) return null;

  const reset = () => {
    setOcr(true);
    setVision(true);
    setKnowledge(true);
    setDeliverables(false);
    setModel("INDRA-Analyst 7B (Q4, local)");
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-navy-950/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-md animate-pop-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-brand-600">
            <Settings2 size={15} />
          </span>
          <div>
            <p className="font-display text-[15px] font-semibold text-navy-900">Workbench Settings</p>
            <p className="text-xs text-slate-400">Prototype — simulated preferences</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
          <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Processing
          </p>
          <Toggle label="OCR extraction" hint="Parse tables & scanned pages" on={ocr} onChange={setOcr} />
          <Toggle label="Vision image analysis" hint="Scan embedded inspection photos" on={vision} onChange={setVision} />
          <Toggle label="Local knowledge search" hint="Query the Gooloo Gooloo KB" on={knowledge} onChange={setKnowledge} />
          <Toggle
            label="Auto-generate deliverables"
            hint="Draft report files after each run"
            on={deliverables}
            onChange={setDeliverables}
          />

          <p className="px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Reasoning model
          </p>
          <div className="px-3 pb-2">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[13px] font-medium text-navy-900 outline-none transition focus:border-brand-500/60"
            >
              <option>INDRA-Analyst 7B (Q4, local)</option>
              <option>INDRA-Analyst 13B (Q5, local)</option>
              <option>INDRA-VibeNet only (fast scan)</option>
            </select>
          </div>

          <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Security
          </p>
          <div className="mx-3 mb-3 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-2.5">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-emerald-800">
              <Lock size={14} /> Local-only mode
            </span>
            <span className="chip border border-emerald-300 bg-white text-emerald-700">ENFORCED</span>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3.5">
          <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Info size={12} /> Saved for this demo session only
          </p>
          <button
            onClick={reset}
            className="ml-auto rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-navy-900"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-navy-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-navy-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
