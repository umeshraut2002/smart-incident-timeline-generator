const buildRootCauseHints = ({ anomalies, duplicateClusters }) => {
  const hints = [];

  if (anomalies.errorSpikes.length > 0) {
    hints.push("Error volume spiked sharply within a short time window. Inspect the first spike bucket and nearby deployment or dependency activity.");
  }

  if (duplicateClusters.length > 0) {
    const topCluster = duplicateClusters[0];
    hints.push(`Repeated error pattern detected: "${topCluster.message}". This often points to a single failing dependency, retry loop, or bad configuration.`);
  }

  if (anomalies.timeGaps.length > 0) {
    hints.push("A notable time gap appears in the logs. This can indicate service stalls, restarts, blocked processing, or missing log forwarding.");
  }

  if (hints.length === 0) {
    hints.push("No strong anomaly-driven root cause hint was found. Review WARN entries immediately before the first ERROR for additional context.");
  }

  return hints;
};

module.exports = {
  buildRootCauseHints
};
