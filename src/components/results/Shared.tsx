import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { RiskLevel, Tone } from "../../data/mockData";

/** True shortly after mount — lets CSS transitions animate in. */
export function useMounted(delay = 80) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return mounted;
}

/** Consistent numbered heading used by every dashboard section. */
export function SectionHeader({
  index,
  icon: Icon,
  title,
  sub,
}: {
  index: string;
  icon: LucideIcon;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3.5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-navy-800 to-brand-600 text-white shadow-md shadow-blue-600/25">
        <Icon size={19} />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-600">
          {index}
        </p>
        <h2 className="font-display text-lg font-semibold tracking-tight text-navy-900 md:text-[1.35rem]">
          {title}
        </h2>
        {sub && <p className="mt-0.5 max-w-2xl text-[13px] leading-relaxed text-slate-500">{sub}</p>}
      </div>
    </div>
  );
}

/** Coloured icon tile used by condition tiles and similar rows. */
export const toneTile: Record<Tone, string> = {
  good: "bg-emerald-50 text-emerald-600 border-emerald-100",
  warn: "bg-amber-50 text-amber-600 border-amber-100",
  bad: "bg-red-50 text-red-500 border-red-100",
  neutral: "bg-blue-50 text-brand-600 border-blue-100",
};

export const toneValue: Record<Tone, string> = {
  good: "text-emerald-600",
  warn: "text-amber-600",
  bad: "text-red-500",
  neutral: "text-navy-900",
};

/** HIGH / MEDIUM / LOW severity chip. */
export function LevelPill({ level }: { level: RiskLevel }) {
  const styles: Record<RiskLevel, string> = {
    HIGH: "border-red-200 bg-red-50 text-red-600",
    MEDIUM: "border-amber-200 bg-amber-50 text-amber-600",
    LOW: "border-emerald-200 bg-emerald-50 text-emerald-600",
  };
  return <span className={`chip border ${styles[level]}`}>{level}</span>;
}

export const levelColor: Record<RiskLevel, string> = {
  HIGH: "#ef4444",
  MEDIUM: "#f59e0b",
  LOW: "#10b981",
};
