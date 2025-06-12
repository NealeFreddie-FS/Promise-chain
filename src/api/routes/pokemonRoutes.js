const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

// GET random Pokemon
router.get("/random", pokemonController.getRandomPokemon);

// GET all saved Pokemon
router.get("/saved/all", pokemonController.getAllSavedPokemon);

// GET Pokemon by ID
router.get("/:id", pokemonController.getPokemonById);

// POST save a Pokemon
router.post("/save", pokemonController.savePokemon);

// DELETE saved Pokemon by ID
router.delete("/saved/:id", pokemonController.deleteSavedPokemon);

module.exports = router;
