export function StatCard({ label, value, tone = "default" }) {
  const toneClass = {
    default: "from-slate-800 to-slate-900 text-white",
    info: "from-sky-500/20 to-slate-900 text-sky-100",
    warn: "from-amber-500/20 to-slate-900 text-amber-100",
    error: "from-rose-500/20 to-slate-900 text-rose-100",
    success: "from-emerald-500/20 to-slate-900 text-emerald-100"
  }[tone];

  return (
    <div className={`rounded-3xl border border-white/10 bg-gradient-to-br ${toneClass} p-5`}>
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}
