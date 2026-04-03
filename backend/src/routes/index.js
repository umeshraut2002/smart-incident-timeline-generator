const express = require("express");
const incidentRoutes = require("./incidentRoutes");
const { healthcheck } = require("../controllers/healthController");

const router = express.Router();

router.get("/health", healthcheck);
router.use("/", incidentRoutes);

module.exports = router;
