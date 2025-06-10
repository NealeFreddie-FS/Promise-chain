const express = require("express");
const router = express.Router();
const productsRouter = require("./products");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// Use the products router
router.use("/products", productsRouter);

module.exports = router;
