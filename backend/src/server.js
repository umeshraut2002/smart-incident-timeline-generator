const app = require("./app");
const env = require("./config/env");

app.listen(env.port, () => {
  console.log(`Smart Incident Timeline backend running on port ${env.port}`);
});
