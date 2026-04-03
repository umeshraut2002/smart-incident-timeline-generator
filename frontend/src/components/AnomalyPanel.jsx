import { formatDateTime, formatRelativeMinutes } from "../utils/formatters";

export function AnomalyPanel({ anomalies }) {
  const groups = [
    {
      title: "Error Spikes",
      items: anomalies?.errorSpikes || [],
      render: (item) => `${formatDateTime(item.bucketStart)} - ${item.errorCount} ERROR events`
    },
    {
      title: "Repeated Errors",
      items: anomalies?.duplicateClusters || [],
      render: (item) => `${item.message} (${item.count} repeats)`
    },
    {
      title: "Time Gaps",
      items: anomalies?.timeGaps || [],
      render: (item) => `${formatRelativeMinutes(item.gapMinutes)} gap ending at ${formatDateTime(item.to)}`
    }
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title} className="rounded-3xl border border-rose-300/15 bg-rose-400/5 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-100/80">{group.title}</h3>
          <div className="mt-4 space-y-3">
            {group.items.length === 0 ? (
              <p className="text-sm text-slate-400">No anomalies detected.</p>
            ) : (
              group.items.map((item, index) => (
                <div key={`${group.title}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-200">
                  {group.render(item)}
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
