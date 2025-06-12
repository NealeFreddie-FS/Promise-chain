const express = require("express");
const path = require("path");
const app = express();
const apiRoutes = require("./api/routes");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
    method: req.method,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message,
  });
});

module.exports = app;
