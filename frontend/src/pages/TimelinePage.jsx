import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnomalyPanel } from "../components/AnomalyPanel";
import { EmptyState } from "../components/EmptyState";
import { SectionCard } from "../components/SectionCard";
import { StatCard } from "../components/StatCard";
import { TimelineFilters } from "../components/TimelineFilters";
import { TimelineView } from "../components/TimelineView";
import { useIncident } from "../hooks/useIncidentStore";
import { useTimelineFilters } from "../hooks/useTimelineFilters";
import { getTimeline } from "../services/api";
import { formatDateTime } from "../utils/formatters";

export function TimelinePage() {
  const { incidentId, timelineData, setTimelineData } = useIncident();
  const [filters, setFilters] = useState({ level: "ALL", from: "", to: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!incidentId || timelineData?.incidentId === incidentId) {
      return;
    }

    const loadTimeline = async () => {
      setIsLoading(true);
      setError("");
      try {
        const payload = await getTimeline(incidentId);
        setTimelineData(payload);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTimeline();
  }, [incidentId, setTimelineData, timelineData?.incidentId]);

  const filteredTimeline = useTimelineFilters(timelineData?.timeline || [], filters);

  const stats = useMemo(() => {
    if (!timelineData?.summary) return [];
    return [
      { label: "Events", value: timelineData.summary.totalEvents, tone: "default" },
      { label: "Errors", value: timelineData.summary.errorCount, tone: "error" },
      { label: "Skipped Lines", value: timelineData.summary.skippedLines, tone: "warn" },
      { label: "Buckets", value: timelineData.timeBuckets.length, tone: "info" }
    ];
  }, [timelineData]);

  if (!incidentId) {
    return (
      <EmptyState
        title="No incident loaded"
        description="Upload a log file first so the dashboard has timeline data to render."
        action={<Link to="/" className="rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950">Go to Upload</Link>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <SectionCard
        title="Incident Overview"
        subtitle={timelineData ? `Window: ${formatDateTime(timelineData.summary.startTime)} to ${formatDateTime(timelineData.summary.endTime)}` : "Loading timeline data..."}
      >
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        {isLoading ? <p className="text-sm text-slate-400">Loading timeline...</p> : null}
        {timelineData ? <AnomalyPanel anomalies={timelineData.anomalies} /> : null}
      </SectionCard>

      <SectionCard title="Filters" subtitle="Refine the vertical timeline by severity and time window.">
        <TimelineFilters filters={filters} onChange={setFilters} />
      </SectionCard>

      <SectionCard title="Vertical Timeline" subtitle={`${filteredTimeline.length} event(s) match the current filters.`}>
        <TimelineView timeline={filteredTimeline} />
      </SectionCard>
    </div>
  );
}
