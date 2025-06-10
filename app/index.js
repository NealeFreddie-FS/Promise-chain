const express = require("express");
const app = express();
const router = require("./routes");

app.use(express.json());

// Localhost:3000
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Service is up",
  });
});

app.use("/api", router);

module.exports = app;
