export function SectionCard({ title, subtitle, action, children, className = "" }) {
  return (
    <section className={`rounded-[28px] border border-white/10 bg-slate-900/75 p-6 shadow-panel backdrop-blur-xl ${className}`}>
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? <h2 className="text-xl font-semibold text-white">{title}</h2> : null}
            {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}
