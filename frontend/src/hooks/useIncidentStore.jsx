import { createContext, useContext, useEffect, useMemo, useState } from "react";

const IncidentContext = createContext(null);

const STORAGE_KEY = "smart-incident-timeline-state";

export function IncidentProvider({ children }) {
  const [incidentId, setIncidentId] = useState("");
  const [uploadSummary, setUploadSummary] = useState(null);
  const [timelineData, setTimelineData] = useState(null);
  const [reportMarkdown, setReportMarkdown] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setIncidentId(parsed.incidentId || "");
      setUploadSummary(parsed.uploadSummary || null);
      setTimelineData(parsed.timelineData || null);
      setReportMarkdown(parsed.reportMarkdown || "");
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ incidentId, uploadSummary, timelineData, reportMarkdown })
    );
  }, [incidentId, uploadSummary, timelineData, reportMarkdown]);

  const value = useMemo(
    () => ({
      incidentId,
      setIncidentId,
      uploadSummary,
      setUploadSummary,
      timelineData,
      setTimelineData,
      reportMarkdown,
      setReportMarkdown
    }),
    [incidentId, uploadSummary, timelineData, reportMarkdown]
  );

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
}

export const useIncident = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error("useIncident must be used within IncidentProvider");
  }
  return context;
};
