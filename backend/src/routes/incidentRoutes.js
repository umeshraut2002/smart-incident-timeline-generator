const express = require("express");
const { upload } = require("../middleware/upload");
const {
  uploadLogFile,
  getTimeline,
  downloadReport,
  mapUploadError
} = require("../controllers/incidentController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadLogFile, mapUploadError);
router.get("/timeline/:id", getTimeline);
router.get("/report/:id", downloadReport);

module.exports = router;
