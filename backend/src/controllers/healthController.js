const env = require("../config/env");

const healthcheck = (_req, res) => {
  res.json({
    status: env.healthcheckEnabled ? "ok" : "disabled",
    service: "smart-incident-timeline-backend",
    uptimeSeconds: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  healthcheck
};
