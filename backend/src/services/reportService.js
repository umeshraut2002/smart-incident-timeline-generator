const buildMarkdownReport = ({ incidentId, originalFileName, summary, timeline, anomalies, rootCauseHints }) => {
  const timelineRows = timeline
    .map(
      (entry) =>
        `| ${entry.timestamp} | ${entry.level} | ${entry.message.replace(/\|/g, "\\|")} |`
    )
    .join("\n");

  const anomalyLines = [
    ...anomalies.errorSpikes.map(
      (item) => `- [ERROR_SPIKE] ${item.bucketStart}: ${item.errorCount} ERROR events`
    ),
    ...anomalies.duplicateClusters.map(
      (item) => `- [DUPLICATE_ERROR_CLUSTER] "${item.message}" repeated ${item.count} times`
    ),
    ...anomalies.timeGaps.map(
      (item) => `- [TIME_GAP] ${item.from} -> ${item.to} (${item.gapMinutes} minutes)`
    )
  ];

  const hints = rootCauseHints.map((hint) => `- ${hint}`).join("\n");

  return `# Incident Report: ${incidentId}

## Incident Summary

- Source File: ${originalFileName}
- Total Parsed Events: ${summary.totalEvents}
- INFO Events: ${summary.infoCount}
- WARN Events: ${summary.warnCount}
- ERROR Events: ${summary.errorCount}
- Skipped Lines: ${summary.skippedLines}
- Time Range: ${summary.startTime || "N/A"} -> ${summary.endTime || "N/A"}

## Timeline Table

| Timestamp | Level | Message |
| --- | --- | --- |
${timelineRows || "| N/A | N/A | No events parsed |"}

## Detected Anomalies

${anomalyLines.length > 0 ? anomalyLines.join("\n") : "- No anomalies detected"}

## Root Cause Hints

${hints}
`;
};

module.exports = {
  buildMarkdownReport
};
