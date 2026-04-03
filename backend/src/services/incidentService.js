const path = require("path");
const env = require("../config/env");
const { createIncidentId } = require("../utils/id");
const { parseLogFile } = require("./logParserService");
const { sortEntries, bucketizeEntries } = require("./timelineService");
const { detectAnomalies } = require("./anomalyDetectionService");
const { buildRootCauseHints } = require("../utils/rootCauseHints");
const { buildMarkdownReport } = require("./reportService");
const {
  saveIncidentData,
  loadIncidentData,
  saveReport,
  getReportPath
} = require("./storageService");

const buildSummary = ({ timeline, skippedLines }) => ({
  totalEvents: timeline.length,
  infoCount: timeline.filter((entry) => entry.level === "INFO").length,
  warnCount: timeline.filter((entry) => entry.level === "WARN").length,
  errorCount: timeline.filter((entry) => entry.level === "ERROR").length,
  skippedLines: skippedLines.length,
  startTime: timeline[0]?.timestamp || null,
  endTime: timeline[timeline.length - 1]?.timestamp || null
});

const processIncidentFile = async (file) => {
  const incidentId = createIncidentId();
  const parsed = await parseLogFile(file.path);

  if (parsed.entries.length === 0) {
    const error = new Error("No supported log lines were found in the uploaded file.");
    error.statusCode = 422;
    throw error;
  }

  const timeline = sortEntries(parsed.entries);
  const timeBuckets = bucketizeEntries(timeline, env.timeBucketMinutes);
  const anomalies = detectAnomalies({
    entries: timeline,
    timeBuckets,
    errorSpikeThreshold: env.errorSpikeThreshold
  });
  const summary = buildSummary({
    timeline,
    skippedLines: parsed.skippedLines
  });
  const rootCauseHints = buildRootCauseHints({
    anomalies,
    duplicateClusters: anomalies.duplicateClusters
  });

  const payload = {
    incidentId,
    originalFileName: file.originalname,
    uploadedFileName: path.basename(file.path),
    summary,
    timeline,
    timeBuckets,
    anomalies,
    rootCauseHints,
    skippedLines: parsed.skippedLines
  };

  await saveIncidentData(incidentId, payload);

  const reportContent = buildMarkdownReport({
    incidentId,
    originalFileName: file.originalname,
    summary,
    timeline,
    anomalies,
    rootCauseHints
  });

  await saveReport(incidentId, reportContent);

  return payload;
};

const getIncidentTimeline = async (incidentId) => loadIncidentData(incidentId);

const getIncidentReportPath = async (incidentId) => {
  await loadIncidentData(incidentId);
  return getReportPath(incidentId);
};

module.exports = {
  processIncidentFile,
  getIncidentTimeline,
  getIncidentReportPath
};
