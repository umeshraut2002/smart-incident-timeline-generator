import { LevelBadge } from "./LevelBadge";
import { formatDateTime } from "../utils/formatters";

const levelDotClass = {
  INFO: "bg-sky-400 shadow-[0_0_0_6px_rgba(70,181,255,0.12)]",
  WARN: "bg-amber-400 shadow-[0_0_0_6px_rgba(255,202,95,0.12)]",
  ERROR: "bg-rose-400 shadow-[0_0_0_6px_rgba(255,107,107,0.16)]"
};

export function TimelineView({ timeline }) {
  if (timeline.length === 0) {
    return <p className="text-sm text-slate-400">No events match the active filters.</p>;
  }

  return (
    <div className="space-y-6">
      {timeline.map((event) => (
        <div key={`${event.timestamp}-${event.lineNumber}`} className="grid gap-4 md:grid-cols-[160px_28px_1fr] md:items-start">
          <div className="text-sm text-slate-400">{formatDateTime(event.timestamp)}</div>
          <div className="relative flex justify-center">
            <div className="absolute top-3 h-full w-px bg-white/10" />
            <div className={`relative z-10 mt-1 h-3.5 w-3.5 rounded-full ${levelDotClass[event.level] || "bg-slate-400"}`} />
          </div>
          <article className={`rounded-3xl border p-4 ${event.level === "ERROR" ? "border-rose-300/20 bg-rose-500/8" : event.level === "WARN" ? "border-amber-300/20 bg-amber-500/8" : "border-sky-300/20 bg-sky-500/8"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <LevelBadge level={event.level} />
              <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Line {event.lineNumber}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-100">{event.message}</p>
          </article>
        </div>
      ))}
    </div>
  );
}
