/**
 * Application configuration
 */
const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  api: {
    pokemon: {
      baseUrl: "https://pokeapi.co/api/v2",
      limit: 151, // Original Kanto Pokemon limit
    },
  },
  cors: {
    allowedOrigins: ["http://localhost:3000"],
  },
};

module.exports = config;
