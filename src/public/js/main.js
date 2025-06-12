// DOM Elements
const pokemonContainer = document.getElementById("pokemonContainer");
const savedPokemonContainer = document.getElementById("savedPokemonContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const randomPokemonBtn = document.getElementById("randomPokemonBtn");

// State
let savedPokemon = [];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Load initial Pokemon
  loadRandomPokemon(6);

  // Load saved Pokemon
  loadSavedPokemon();

  // Event Listeners
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => loadRandomPokemon(3));
  }

  if (randomPokemonBtn) {
    randomPokemonBtn.addEventListener("click", () => loadRandomPokemon(1));
  }
});

/**
 * Load random Pokemon
 * @param {number} count - Number of random Pokemon to load
 */
async function loadRandomPokemon(count) {
  showLoader();

  try {
    const promises = [];

    for (let i = 0; i < count; i++) {
      promises.push(
        fetch("/api/pokemon/random")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch random Pokemon");
            }
            return response.json();
          })
          .then((data) => data.data)
      );
    }

    const pokemonDataArray = await Promise.all(promises);

    pokemonDataArray.forEach((pokemonData) => {
      renderPokemonCard(pokemonData);
    });
  } catch (error) {
    console.error("Error loading random Pokemon:", error);
    showError("Failed to load Pokemon. Please try again later.");
  } finally {
    hideLoader();
  }
}

/**
 * Load saved Pokemon from the API
 */
async function loadSavedPokemon() {
  try {
    const response = await fetch("/api/pokemon/saved/all");

    if (!response.ok) {
      throw new Error("Failed to fetch saved Pokemon");
    }

    const data = await response.json();
    savedPokemon = data.data || [];

    renderSavedPokemon();
  } catch (error) {
    console.error("Error loading saved Pokemon:", error);
  }
}

/**
 * Save a Pokemon to the collection
 * @param {Object} pokemonData - Pokemon data to save
 */
async function savePokemon(pokemonData) {
  try {
    const response = await fetch("/api/pokemon/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemonData),
    });

    if (!response.ok) {
      throw new Error("Failed to save Pokemon");
    }

    const data = await response.json();
    savedPokemon.push(data.data);

    // Update UI
    renderSavedPokemon();

    // Update save button
    const saveBtn = document.querySelector(
      `[data-pokemon-id="${pokemonData.name}"]`
    );
    if (saveBtn) {
      saveBtn.textContent = "Saved";
      saveBtn.classList.add("saved");
      saveBtn.disabled = true;
    }

    showToast(`${pokemonData.name} has been saved to your collection!`);
  } catch (error) {
    console.error("Error saving Pokemon:", error);
    showToast("Failed to save Pokemon. Please try again.", "error");
  }
}

/**
 * Delete a saved Pokemon
 * @param {number} id - ID of the saved Pokemon to delete
 */
async function deleteSavedPokemon(id) {
  try {
    const response = await fetch(`/api/pokemon/saved/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete Pokemon");
    }

    const data = await response.json();

    // Update local state
    savedPokemon = savedPokemon.filter((pokemon) => pokemon.id !== id);

    // Update UI
    renderSavedPokemon();

    // Update save button on main list if present
    const saveBtn = document.querySelector(
      `[data-pokemon-id="${data.data.name}"]`
    );
    if (saveBtn) {
      saveBtn.textContent = "Save";
      saveBtn.classList.remove("saved");
      saveBtn.disabled = false;
    }

    showToast(`${data.data.name} has been removed from your collection.`);
  } catch (error) {
    console.error("Error deleting saved Pokemon:", error);
    showToast("Failed to delete Pokemon. Please try again.", "error");
  }
}

/**
 * Render a Pokemon card in the main container
 * @param {Object} pokemon - Pokemon data
 */
function renderPokemonCard(pokemon) {
  if (!pokemonContainer) return;

  const isSaved = savedPokemon.some((p) => p.name === pokemon.name);

  // Get the official artwork URL (modify the ID to match the format)
  const paddedId = String(pokemon.id).padStart(3, "0");
  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  const card = document.createElement("div");
  card.className = "pokemon-card";

  card.innerHTML = `
    <div class="pokemon-card-header">
      <span class="pokemon-id">#${pokemon.id}</span>
      <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-img">
    </div>
    <div class="pokemon-card-body">
      <h3 class="pokemon-name">${pokemon.name}</h3>
      <div class="pokemon-types">
        ${pokemon.types
          .map((type) => `<span class="type-badge ${type}">${type}</span>`)
          .join("")}
      </div>
      <div class="pokemon-stats">
        <div class="stat">
          <div class="stat-label">Height</div>
          <div class="stat-value">${pokemon.height} m</div>
        </div>
        <div class="stat">
          <div class="stat-label">Weight</div>
          <div class="stat-value">${pokemon.weight} kg</div>
        </div>
      </div>
      <p class="pokemon-description">${pokemon.flavorText}</p>
    </div>
    <div class="pokemon-card-footer">
      <span class="pokemon-habitat">Habitat: ${pokemon.habitat}</span>
      <button class="save-btn ${isSaved ? "saved" : ""}" 
              data-pokemon-id="${pokemon.name}"
              ${isSaved ? "disabled" : ""}>
        ${isSaved ? "Saved" : "Save"}
      </button>
    </div>
  `;

  // Add event listener for save button
  const saveBtn = card.querySelector(".save-btn");
  if (saveBtn && !isSaved) {
    saveBtn.addEventListener("click", () => {
      savePokemon(pokemon);
    });
  }

  pokemonContainer.appendChild(card);
}

/**
 * Render saved Pokemon cards
 */
function renderSavedPokemon() {
  if (!savedPokemonContainer) return;

  savedPokemonContainer.innerHTML = "";

  if (savedPokemon.length === 0) {
    savedPokemonContainer.innerHTML = `
      <div class="no-saved-message">
        <p>You haven't saved any Pokemon yet. Click the "Save" button on a Pokemon card to add it to your collection.</p>
      </div>
    `;
    return;
  }

  savedPokemon.forEach((pokemon) => {
    // Get the official artwork URL (modify the ID to match the format)
    const paddedId = String(pokemon.id).padStart(3, "0");
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

    const card = document.createElement("div");
    card.className = "pokemon-card";

    card.innerHTML = `
      <div class="pokemon-card-header">
        <span class="pokemon-id">#${pokemon.id}</span>
        <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-img">
      </div>
      <div class="pokemon-card-body">
        <h3 class="pokemon-name">${pokemon.name}</h3>
        <div class="pokemon-types">
          ${pokemon.types
            .map((type) => `<span class="type-badge ${type}">${type}</span>`)
            .join("")}
        </div>
        <div class="pokemon-stats">
          <div class="stat">
            <div class="stat-label">Height</div>
            <div class="stat-value">${pokemon.height} m</div>
          </div>
          <div class="stat">
            <div class="stat-label">Weight</div>
            <div class="stat-value">${pokemon.weight} kg</div>
          </div>
        </div>
        <p class="pokemon-description">${pokemon.flavorText}</p>
      </div>
      <div class="pokemon-card-footer">
        <span class="pokemon-habitat">Habitat: ${pokemon.habitat}</span>
        <button class="save-btn delete-btn" data-saved-id="${
          pokemon.id
        }">Remove</button>
      </div>
    `;

    // Add event listener for delete button
    const deleteBtn = card.querySelector(".delete-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        deleteSavedPokemon(pokemon.id);
      });
    }

    savedPokemonContainer.appendChild(card);
  });
}

/**
 * Show loader
 */
function showLoader() {
  const loaderContainer = document.getElementById("loaderContainer");
  if (loaderContainer) {
    loaderContainer.style.display = "flex";
  }
}

/**
 * Hide loader
 */
function hideLoader() {
  const loaderContainer = document.getElementById("loaderContainer");
  if (loaderContainer) {
    loaderContainer.style.display = "none";
  }
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  const errorContainer = document.getElementById("errorContainer");
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = "block";

    setTimeout(() => {
      errorContainer.style.display = "none";
    }, 5000);
  }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error)
 */
function showToast(message, type = "success") {
  // Create toast element if it doesn't exist
  let toastContainer = document.getElementById("toastContainer");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.style.position = "fixed";
    toastContainer.style.bottom = "20px";
    toastContainer.style.right = "20px";
    toastContainer.style.zIndex = "1000";
    document.body.appendChild(toastContainer);
  }

  // Create toast
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.style.backgroundColor = type === "success" ? "#4CAF50" : "#F44336";
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "4px";
  toast.style.marginTop = "10px";
  toast.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
  toast.textContent = message;

  // Add to container
  toastContainer.appendChild(toast);

  // Remove after delay
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s";

    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 500);
  }, 3000);
}
