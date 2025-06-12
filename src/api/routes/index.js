const express = require("express");
const router = express.Router();
const pokemonRoutes = require("./pokemonRoutes");

// API root endpoint
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Pokemon API is running",
    version: "1.0.0",
    endpoints: {
      pokemon: "/api/pokemon",
      randomPokemon: "/api/pokemon/random",
      pokemonById: "/api/pokemon/:id",
      savedPokemon: "/api/pokemon/saved/all",
      savePokemon: "/api/pokemon/save",
      deleteSavedPokemon: "/api/pokemon/saved/:id",
    },
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// Use the Pokemon routes
router.use("/pokemon", pokemonRoutes);

module.exports = router;
