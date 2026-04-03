import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileDropzone } from "../components/FileDropzone";
import { SectionCard } from "../components/SectionCard";
import { StatCard } from "../components/StatCard";
import { uploadLogFile } from "../services/api";
import { useIncident } from "../hooks/useIncidentStore";

export function UploadPage() {
  const navigate = useNavigate();
  const { setIncidentId, setUploadSummary, setTimelineData, setReportMarkdown, uploadSummary } = useIncident();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const stats = useMemo(() => {
    if (!uploadSummary?.summary) return [];
    return [
      { label: "Total Events", value: uploadSummary.summary.totalEvents, tone: "default" },
      { label: "INFO", value: uploadSummary.summary.infoCount, tone: "info" },
      { label: "WARN", value: uploadSummary.summary.warnCount, tone: "warn" },
      { label: "ERROR", value: uploadSummary.summary.errorCount, tone: "error" }
    ];
  }, [uploadSummary]);

  const handleUpload = async (file) => {
    setSelectedFile(file);
    setError("");
    setIsLoading(true);

    try {
      const result = await uploadLogFile(file);
      setIncidentId(result.incidentId);
      setUploadSummary(result);
      setTimelineData(null);
      setReportMarkdown("");
      navigate("/timeline");
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Log Intake"
        subtitle="Push a raw log into the analysis pipeline. Supported formats include ISO timestamps, bracketed levels, and common service log patterns."
      >
        <FileDropzone onFileSelect={handleUpload} selectedFile={selectedFile} isLoading={isLoading} />
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.length > 0
          ? stats.map((stat) => <StatCard key={stat.label} {...stat} />)
          : [
              <StatCard key="pipeline" label="Pipeline" value="Ready" tone="success" />,
              <StatCard key="formats" label="Formats" value="4" tone="info" />,
              <StatCard key="bucket" label="Bucket Size" value="1 min" tone="warn" />,
              <StatCard key="output" label="Report Output" value="Markdown" tone="default" />
            ]}
      </div>
    </div>
  );
}
