import { useState } from "react";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { TASKS } from "../data/mockData";

interface Props {
  value: string;
  onChange: (task: string) => void;
}

/** Dropdown pill that selects the analysis task for the current run. */
export default function TaskSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[12.5px] font-semibold transition ${
          open
            ? "border-brand-500/50 bg-blue-50/70 text-brand-600"
            : "border-slate-200 bg-white text-slate-600 hover:border-brand-500/40 hover:text-brand-600"
        }`}
      >
        <SlidersHorizontal size={13} />
        {value}
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* click-away layer */}
      {open && <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />}

      {/* menu */}
      {open && (
        <div className="absolute bottom-full left-0 z-20 mb-2 w-60 animate-pop-in overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-navy-900/10">
          <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Analysis task
          </p>
          {TASKS.map((task) => (
            <button
              key={task}
              onClick={() => {
                onChange(task);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition ${
                task === value
                  ? "bg-blue-50 text-brand-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-navy-900"
              }`}
            >
              {task}
              {task === value && <Check size={14} className="ml-auto text-brand-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
