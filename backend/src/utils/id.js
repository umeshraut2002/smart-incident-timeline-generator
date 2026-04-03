const crypto = require("crypto");

const createIncidentId = () => crypto.randomUUID();

module.exports = {
  createIncidentId
};
