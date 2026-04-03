export function TimelineFilters({ filters, onChange }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <label className="text-sm text-slate-300">
        <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-slate-500">Level</span>
        <select
          value={filters.level}
          onChange={(event) => onChange({ ...filters, level: event.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0"
        >
          <option value="ALL">All levels</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>
      </label>
      <label className="text-sm text-slate-300">
        <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-slate-500">From</span>
        <input
          type="datetime-local"
          value={filters.from}
          onChange={(event) => onChange({ ...filters, from: event.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        />
      </label>
      <label className="text-sm text-slate-300">
        <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-slate-500">To</span>
        <input
          type="datetime-local"
          value={filters.to}
          onChange={(event) => onChange({ ...filters, to: event.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
        />
      </label>
    </div>
  );
}
