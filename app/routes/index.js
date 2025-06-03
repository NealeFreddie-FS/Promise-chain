const express = require("express");

const router = express.Router();
const authorRoutes = require("../routes/authorRoutes");

router.get("/", (req, res) => {
  res.status(200).json({ message: "From the API layer", success: true });
});

router.use("/authors", authorRoutes);

module.exports = router;
