const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const rootDir = path.resolve(__dirname, "../..");

const resolveDataPath = (targetPath, fallback) => {
  const candidate = targetPath || fallback;
  return path.isAbsolute(candidate) ? candidate : path.join(rootDir, candidate);
};

const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  uploadDir: resolveDataPath(process.env.UPLOAD_DIR, "data/uploads"),
  processedDir: resolveDataPath(process.env.PROCESSED_DIR, "data/processed"),
  reportsDir: resolveDataPath(process.env.REPORTS_DIR, "data/reports"),
  maxFileSizeBytes: Number(process.env.MAX_FILE_SIZE_BYTES || 5 * 1024 * 1024),
  timeBucketMinutes: Number(process.env.TIME_BUCKET_MINUTES || 1),
  errorSpikeThreshold: Number(process.env.ERROR_SPIKE_THRESHOLD || 5),
  healthcheckEnabled: process.env.HEALTHCHECK_ENABLED !== "false"
};

for (const dir of [env.uploadDir, env.processedDir, env.reportsDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

module.exports = env;
