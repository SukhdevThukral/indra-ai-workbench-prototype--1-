import { Zap } from "lucide-react";

/** INDRA AI brand mark — a small gradient tile with the thunderbolt glyph. */
export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <div
      className="relative grid shrink-0 place-items-center rounded-[0.8rem] bg-gradient-to-br from-[#123a7a] via-brand-600 to-cyan-500 shadow-lg shadow-blue-600/25"
      style={{ width: size, height: size }}
    >
      <Zap
        size={size * 0.52}
        strokeWidth={2.2}
        className="fill-white text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
      />
      {/* tiny cyan node accent */}
      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-white/80 bg-cyan-300" />
    </div>
  );
}
