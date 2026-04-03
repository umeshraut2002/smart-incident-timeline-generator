const { floorToBucket } = require("../utils/date");

const sortEntries = (entries) =>
  [...entries].sort((left, right) => new Date(left.timestamp) - new Date(right.timestamp));

const bucketizeEntries = (entries, bucketMinutes) => {
  const buckets = new Map();

  for (const entry of entries) {
    const bucketStart = floorToBucket(new Date(entry.timestamp), bucketMinutes).toISOString();
    const current = buckets.get(bucketStart) || {
      bucketStart,
      total: 0,
      infoCount: 0,
      warnCount: 0,
      errorCount: 0,
      events: []
    };

    current.total += 1;
    current.events.push(entry);

    if (entry.level === "INFO") current.infoCount += 1;
    if (entry.level === "WARN") current.warnCount += 1;
    if (entry.level === "ERROR") current.errorCount += 1;

    buckets.set(bucketStart, current);
  }

  return [...buckets.values()].sort(
    (left, right) => new Date(left.bucketStart) - new Date(right.bucketStart)
  );
};

module.exports = {
  sortEntries,
  bucketizeEntries
};
