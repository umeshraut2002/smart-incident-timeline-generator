const detectErrorSpikes = (timeBuckets, threshold) =>
  timeBuckets
    .filter((bucket) => bucket.errorCount >= threshold)
    .map((bucket) => ({
      type: "ERROR_SPIKE",
      bucketStart: bucket.bucketStart,
      errorCount: bucket.errorCount,
      message: `Detected ${bucket.errorCount} ERROR logs in a ${bucket.events.length}-event bucket.`
    }));

const detectDuplicateErrors = (entries) => {
  const duplicateMap = new Map();

  for (const entry of entries) {
    if (entry.level !== "ERROR") {
      continue;
    }

    const current = duplicateMap.get(entry.message) || {
      type: "DUPLICATE_ERROR_CLUSTER",
      message: entry.message,
      count: 0,
      timestamps: []
    };

    current.count += 1;
    current.timestamps.push(entry.timestamp);
    duplicateMap.set(entry.message, current);
  }

  return [...duplicateMap.values()]
    .filter((cluster) => cluster.count > 1)
    .sort((left, right) => right.count - left.count);
};

const detectTimeGaps = (entries) => {
  const gaps = [];

  for (let index = 1; index < entries.length; index += 1) {
    const previous = new Date(entries[index - 1].timestamp).getTime();
    const current = new Date(entries[index].timestamp).getTime();
    const gapMinutes = (current - previous) / (1000 * 60);

    if (gapMinutes >= 5) {
      gaps.push({
        type: "TIME_GAP",
        from: entries[index - 1].timestamp,
        to: entries[index].timestamp,
        gapMinutes: Number(gapMinutes.toFixed(2)),
        message: `No log activity detected for ${gapMinutes.toFixed(2)} minutes.`
      });
    }
  }

  return gaps;
};

const detectAnomalies = ({ entries, timeBuckets, errorSpikeThreshold }) => {
  const errorSpikes = detectErrorSpikes(timeBuckets, errorSpikeThreshold);
  const duplicateClusters = detectDuplicateErrors(entries);
  const timeGaps = detectTimeGaps(entries);

  return {
    errorSpikes,
    duplicateClusters,
    timeGaps
  };
};

module.exports = {
  detectAnomalies
};
