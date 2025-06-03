const express = require("express");

const router = express.Router();

const authors = [];

router.get("/", (req, res) => {
  res.status(200).json({ message: "From the get API Author", success: true });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(">>>", id);

  res.status(200).json({ message: "From the get API Author", success: true });
});

router.post("/", (req, res) => {
  console.log(">>>", req.body);
  const author = req.body.author;
  authors.push(author);
  console.log("Author", author);

  res.status(200).json({
    message: "From the create API Author",
    data: authors[authors.length - 1],
    success: true,
  });
});

module.exports = router;
