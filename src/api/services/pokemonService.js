const fetch = require("node-fetch");

/**
 * Fetches Pokemon data from the Pokemon API by ID
 * Makes two API calls:
 * 1. To get basic Pokemon data
 * 2. To get species data for flavor text, habitat, and legendary status
 *
 * @param {number} id - Pokemon ID (1-151)
 * @returns {object} Compiled Pokemon data
 */
const getPokemonData = async (id) => {
  try {
    // First API call to get basic Pokemon data
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    if (!pokemonResponse.ok) {
      throw new Error(
        `Failed to fetch Pokemon data: ${pokemonResponse.status}`
      );
    }

    const pokemonData = await pokemonResponse.json();

    // Extract types as an array of type names
    const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);

    // Second API call to get species data
    const speciesResponse = await fetch(pokemonData.species.url);

    if (!speciesResponse.ok) {
      throw new Error(
        `Failed to fetch species data: ${speciesResponse.status}`
      );
    }

    const speciesData = await speciesResponse.json();

    // Find English flavor text
    const englishFlavorText = speciesData.flavor_text_entries
      .find((entry) => entry.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") // Replace form feed characters with spaces
      .replace(/\n/g, " "); // Replace newlines with spaces

    // Compile all the required data
    const compiledData = {
      id: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height / 10, // Convert to meters
      weight: pokemonData.weight / 10, // Convert to kilograms
      types: types,
      flavorText: englishFlavorText || "No description available.",
      habitat: speciesData.habitat?.name || "Unknown",
      isLegendary: speciesData.is_legendary,
    };

    return compiledData;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    throw error;
  }
};

/**
 * Generates a random Pokemon ID between 1 and 151 (original Pokemon),
 * fetches the Pokemon data, and logs it to the console
 */
const getRandomPokemon = async () => {
  try {
    // Generate random ID between 1 and 151
    const randomId = Math.floor(Math.random() * 151) + 1;

    // Call getPokemonData with the random ID
    const pokemonData = await getPokemonData(randomId);

    return pokemonData;
  } catch (error) {
    console.error("Error in getRandomPokemon:", error);
    throw error;
  }
};

/**
 * Original assignment task - kept for compatibility
 */
const assignmentTask = async () => {
  try {
    // Generate random ID between 1 and 151
    const randomId = Math.floor(Math.random() * 151) + 1;

    console.log(`Fetching data for Pokemon ID: ${randomId}`);

    // Call getPokemonData with the random ID
    const pokemonData = await getPokemonData(randomId);

    // Log the Pokemon data in a readable format
    console.log("\nPokemon Data:");
    console.log("=============");
    console.log(
      `Name: ${
        pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)
      }`
    );
    console.log(`Height: ${pokemonData.height} m`);
    console.log(`Weight: ${pokemonData.weight} kg`);
    console.log(`Types: ${pokemonData.types.join(", ")}`);
    console.log(`Habitat: ${pokemonData.habitat}`);
    console.log(`Legendary: ${pokemonData.isLegendary ? "Yes" : "No"}`);
    console.log(`\nDescription: ${pokemonData.flavorText}`);

    return pokemonData;
  } catch (error) {
    console.error("Error in assignmentTask:", error);
  }
};

// Export the functions
module.exports = {
  getPokemonData,
  getRandomPokemon,
  assignmentTask,
};
