require("dotenv").config();
const http = require("http");
const config = require("./src/config");
const app = require("./src/app");
const { assignmentTask } = require("./src/api/services/pokemonService");

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);

  // Execute the Pokemon API assignment task (kept for backward compatibility)
  console.log("Starting Pokemon API Assignment Task...");
  assignmentTask()
    .then(() => {
      console.log("Pokemon API Assignment Task completed!");
    })
    .catch((error) => {
      console.error("Failed to complete Pokemon API Assignment Task:", error);
    });
});
