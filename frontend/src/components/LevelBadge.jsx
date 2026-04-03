const levelStyles = {
  INFO: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  WARN: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  ERROR: "border-rose-400/30 bg-rose-400/10 text-rose-100"
};

export function LevelBadge({ level }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${levelStyles[level] || "border-white/10 bg-white/5 text-slate-200"}`}>
      {level}
    </span>
  );
}
