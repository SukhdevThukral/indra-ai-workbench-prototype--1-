import { Plus, Server, Settings } from "lucide-react";
import Logo from "./Logo";

interface Props {
  onNewAnalysis: () => void;
  onOpenSettings: () => void;
}

/** Top navigation bar shown on the input / chat page. */
export default function SiteHeader({ onNewAnalysis, onOpenSettings }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-6">
        <Logo size={36} />

        <div className="leading-tight">
          <p className="font-display text-[15px] font-semibold tracking-tight text-navy-900">
            INDRA <span className="text-brand-600">AI</span>
          </p>
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:block">
            Sovereign Industrial Intelligence
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Local / on-premise status badge */}
          <span className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 sm:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-500" />
            </span>
            <Server size={12} className="text-emerald-600" />
            <span className="text-[11px] font-bold tracking-wide text-emerald-700">
              LOCAL · ON-PREMISE
            </span>
          </span>

          <button
            onClick={onNewAnalysis}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-navy-900 shadow-sm transition hover:border-brand-500/40 hover:bg-blue-50/60 hover:text-brand-600"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span className="hidden sm:inline">New Analysis</span>
            <span className="sm:hidden">New</span>
          </button>

          <button
            onClick={onOpenSettings}
            title="Settings"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-brand-500/40 hover:text-brand-600"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
