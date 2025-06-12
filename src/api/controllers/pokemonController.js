const pokemonService = require("../services/pokemonService");

// In-memory data storage for saved Pokemon
let savedPokemon = [];

// Helper function to find the next available ID
const getNextId = () => {
  return savedPokemon.length > 0
    ? Math.max(...savedPokemon.map((p) => p.id)) + 1
    : 1;
};

/**
 * Get a random Pokemon
 */
const getRandomPokemon = async (req, res) => {
  try {
    const pokemonData = await pokemonService.getRandomPokemon();

    res.status(200).json({
      message: "Random Pokemon fetched successfully",
      data: pokemonData,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } catch (error) {
    console.error("Error fetching random Pokemon:", error);
    res.status(500).json({
      message: "Failed to fetch random Pokemon",
      error: error.message,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }
};

/**
 * Get Pokemon by ID
 */
const getPokemonById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1 || id > 151) {
      return res.status(400).json({
        message: "Invalid Pokemon ID. Must be between 1 and 151",
        metadata: {
          hostname: req.hostname,
          method: req.method,
        },
      });
    }

    const pokemonData = await pokemonService.getPokemonData(id);

    res.status(200).json({
      message: `Pokemon with ID ${id} fetched successfully`,
      data: pokemonData,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } catch (error) {
    console.error(`Error fetching Pokemon with ID ${req.params.id}:`, error);
    res.status(500).json({
      message: `Failed to fetch Pokemon with ID ${req.params.id}`,
      error: error.message,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }
};

/**
 * Get all saved Pokemon
 */
const getAllSavedPokemon = (req, res) => {
  res.status(200).json({
    message: "All saved Pokemon fetched successfully",
    count: savedPokemon.length,
    data: savedPokemon,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
};

/**
 * Save a Pokemon
 */
const savePokemon = (req, res) => {
  const pokemonData = req.body;

  if (!pokemonData || !pokemonData.name) {
    return res.status(400).json({
      message: "Invalid Pokemon data. Name is required.",
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }

  // Check if Pokemon is already saved
  const existingPokemon = savedPokemon.find((p) => p.name === pokemonData.name);

  if (existingPokemon) {
    return res.status(409).json({
      message: `Pokemon ${pokemonData.name} is already saved`,
      data: existingPokemon,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }

  const newSavedPokemon = {
    id: getNextId(),
    ...pokemonData,
    savedAt: new Date().toISOString(),
  };

  savedPokemon.push(newSavedPokemon);

  res.status(201).json({
    message: `Pokemon ${pokemonData.name} saved successfully`,
    data: newSavedPokemon,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
};

/**
 * Delete saved Pokemon by ID
 */
const deleteSavedPokemon = (req, res) => {
  const id = parseInt(req.params.id);
  const index = savedPokemon.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `Saved Pokemon with ID ${id} not found`,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }

  const deletedPokemon = savedPokemon[index];
  savedPokemon = savedPokemon.filter((p) => p.id !== id);

  res.status(200).json({
    message: `Saved Pokemon ${deletedPokemon.name} deleted successfully`,
    data: deletedPokemon,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
};

module.exports = {
  getRandomPokemon,
  getPokemonById,
  getAllSavedPokemon,
  savePokemon,
  deleteSavedPokemon,
};
