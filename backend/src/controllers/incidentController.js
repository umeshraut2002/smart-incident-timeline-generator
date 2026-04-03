const { multer } = require("../middleware/upload");
const {
  processIncidentFile,
  getIncidentTimeline,
  getIncidentReportPath
} = require("../services/incidentService");

const uploadLogFile = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Log file is required." });
      return;
    }

    const incident = await processIncidentFile(req.file);

    res.status(201).json({
      incidentId: incident.incidentId,
      summary: incident.summary,
      anomalies: incident.anomalies,
      rootCauseHints: incident.rootCauseHints
    });
  } catch (error) {
    next(error);
  }
};

const getTimeline = async (req, res, next) => {
  try {
    const incident = await getIncidentTimeline(req.params.id);
    res.json(incident);
  } catch (error) {
    next(error);
  }
};

const downloadReport = async (req, res, next) => {
  try {
    const reportPath = await getIncidentReportPath(req.params.id);
    res.download(reportPath);
  } catch (error) {
    next(error);
  }
};

const mapUploadError = (error, _req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      res.status(413).json({ error: "Uploaded file exceeds the configured size limit." });
      return;
    }

    res.status(400).json({ error: "Only one .log or .txt file can be uploaded per request." });
    return;
  }

  next(error);
};

module.exports = {
  uploadLogFile,
  getTimeline,
  downloadReport,
  mapUploadError
};
