const express = require("express");
const router = express.Router();

// In-memory data storage
let products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 800, category: "Electronics" },
  { id: 3, name: "Headphones", price: 150, category: "Accessories" },
];

// Helper function to find the next available ID
const getNextId = () => {
  return products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
};

// GET all products
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Get all products",
    count: products.length,
    data: products,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// GET product by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: `Product with ID ${id} not found`,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }

  res.status(200).json({
    message: `GET product with ID ${id}`,
    data: product,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// POST new product
router.post("/", (req, res) => {
  const newProduct = {
    id: getNextId(),
    ...req.body,
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created",
    data: newProduct,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// PUT/PATCH product by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `Product with ID ${id} not found`,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }

  const updatedProduct = {
    id: id,
    ...req.body,
  };

  products[index] = updatedProduct;

  res.status(200).json({
    message: `Updated product with ID ${id}`,
    data: updatedProduct,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// DELETE product by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `Product with ID ${id} not found`,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }

  const deletedProduct = products[index];
  products = products.filter((p) => p.id !== id);

  res.status(200).json({
    message: `Deleted product with ID ${id}`,
    data: deletedProduct,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

module.exports = router;
