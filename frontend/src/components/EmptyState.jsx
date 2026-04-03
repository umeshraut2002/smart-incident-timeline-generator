export function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-10 text-center shadow-panel">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
