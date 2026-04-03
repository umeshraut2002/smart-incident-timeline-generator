const floorToBucket = (date, bucketMinutes) => {
  const bucketMs = bucketMinutes * 60 * 1000;
  const timestamp = date.getTime();
  return new Date(Math.floor(timestamp / bucketMs) * bucketMs);
};

module.exports = {
  floorToBucket
};
