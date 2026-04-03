const fs = require("fs/promises");
const path = require("path");
const env = require("../config/env");

const writeJson = async (dirPath, fileName, value) => {
  const filePath = path.join(dirPath, fileName);
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
  return filePath;
};

const readJson = async (dirPath, fileName) => {
  const filePath = path.join(dirPath, fileName);
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
};

const writeText = async (dirPath, fileName, value) => {
  const filePath = path.join(dirPath, fileName);
  await fs.writeFile(filePath, value, "utf8");
  return filePath;
};

const getProcessedFileName = (incidentId) => `${incidentId}.json`;
const getReportFileName = (incidentId) => `${incidentId}.md`;

const saveIncidentData = async (incidentId, payload) =>
  writeJson(env.processedDir, getProcessedFileName(incidentId), payload);

const loadIncidentData = async (incidentId) =>
  readJson(env.processedDir, getProcessedFileName(incidentId));

const saveReport = async (incidentId, content) =>
  writeText(env.reportsDir, getReportFileName(incidentId), content);

const getReportPath = (incidentId) => path.join(env.reportsDir, getReportFileName(incidentId));

module.exports = {
  saveIncidentData,
  loadIncidentData,
  saveReport,
  getReportPath
};
