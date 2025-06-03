const express = require("express");
const morgan = require("morgan");
const app = express();

const routeHandler = require("../app/routes");

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: " This is running", sucess: true });
});

app.use("/api/v1", routeHandler);

app.use("/*wildcard", (req, res) => {
  res.status(404).json({ message: "Not found", sucess: false });
});

module.exports = app;
