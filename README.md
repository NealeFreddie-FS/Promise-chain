# Pokemon Explorer

## Overview

This application demonstrates using the Pokemon API with asynchronous JavaScript. It features a beautiful landing page where users can explore Pokemon, view their details, and save their favorites to a collection.

## Features

- Fetch Pokemon data using async/await from the Pokemon API
- Display Pokemon in an attractive card layout
- View detailed information including types, habitat, and descriptions
- Save favorite Pokemon to a personal collection
- Responsive design for all devices
- Complete CRUD operations through API endpoints

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Data**: Pokemon API (https://pokeapi.co/)
- **Storage**: In-memory data storage for saved Pokemon

## Project Structure

```
├── server.js              # Application entry point
├── src/                   # Source code
│   ├── app.js             # Express application setup
│   ├── config/            # Configuration files
│   │   └── index.js       # Main configuration
│   ├── api/               # API related code
│   │   ├── controllers/   # Request handlers
│   │   │   └── pokemonController.js
│   │   ├── routes/        # API routes
│   │   │   ├── index.js   # API router
│   │   │   └── pokemonRoutes.js
│   │   ├── services/      # Business logic
│   │   │   └── pokemonService.js
│   │   └── models/        # Data models
│   └── public/            # Static assets
│       ├── index.html     # Main landing page
│       ├── css/           # Stylesheets
│       │   └── styles.css
│       └── js/            # Client-side JavaScript
│           └── main.js
```

## API Endpoints

- `GET /api/pokemon/random` - Get a random Pokemon
- `GET /api/pokemon/:id` - Get a specific Pokemon by ID
- `GET /api/pokemon/saved/all` - Get all saved Pokemon
- `POST /api/pokemon/save` - Save a Pokemon to the collection
- `DELETE /api/pokemon/saved/:id` - Remove a Pokemon from the collection

## Implementation Details

### Pokemon Data Service

The project includes functions for interacting with the Pokemon API:

#### `getPokemonData(id)`

This async function:

- Takes a Pokemon ID as input (1-151)
- Makes an API call to get basic Pokemon data
- Makes a second API call to get species data
- Extracts and combines data from both endpoints
- Returns a compiled object with all relevant Pokemon information

#### `getRandomPokemon()`

This async function:

- Generates a random Pokemon ID between 1 and 151
- Calls `getPokemonData()` with the random ID
- Returns the Pokemon data

### Data Format

The Pokemon data is returned in the following format:

```javascript
{
  id: 25,
  name: "pikachu",
  height: 0.4, // in meters
  weight: 6.0, // in kilograms
  types: ["electric"],
  flavorText: "When several of these POKéMON gather, their electricity could build and cause lightning storms.",
  habitat: "forest",
  isLegendary: false
}
```

## Running the Project

To run the application:

```bash
# Install dependencies
npm install

# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Then open your browser to http://localhost:3000 to view the application.

## Credits

- Pokemon data provided by [PokeAPI](https://pokeapi.co/)
- Pokemon images from the official Pokemon resources
- This is a fan-made application for educational purposes

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file if needed (see configuration section)
4. Start the server: `npm run dev`
5. Open your browser and navigate to `http://localhost:3000`

**IMPORTANT**: This application must be accessed through the Node.js server at `http://localhost:3000` and NOT through VS Code's Live Server extension (which uses port 5500). The frontend depends on API endpoints served by the Node.js backend.
