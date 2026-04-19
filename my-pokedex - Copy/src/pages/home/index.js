import { getAllPokemonNames, getPokemonDetail } from "../../api/endpoints.js";
import { PokemonCard } from "../../components/PokemonCard.js";
import { PokemonModal } from "../../components/PokemonModal.js";
import { Navbar } from "../../components/Navbar.js";

// Inject Navbar
const navbarRoot = document.getElementById("navbar-root");
if (navbarRoot) navbarRoot.innerHTML = Navbar();

const grid = document.getElementById("pokedex-grid");
const loadingElement = document.getElementById("loading");
const searchInput = document.getElementById("search-input");
const paginationContainer = document.getElementById("pagination");
const modal = document.getElementById("pokemon-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

// State
let allPokemons = []; // Full list of { name, url }
let filteredPokemons = [];
let currentPage = 1;
const itemsPerPage = 20;

async function init() {
    try {
        loadingElement.style.display = "block";
        grid.innerHTML = "";

        // 1. Fetch ALL pokemon names (lightweight)
        const data = await getAllPokemonNames();
        allPokemons = data.results;
        filteredPokemons = [...allPokemons];

        // 2. Initial Render
        await renderPage(1);

        // 3. Setup Listeners
        setupEventListeners();

        loadingElement.style.display = "none";
    } catch (error) {
        console.error("Failed to init:", error);
        loadingElement.textContent = "Failed to load Pokémon data. Please refresh.";
    }
}

function setupEventListeners() {
    // Search
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        filteredPokemons = allPokemons.filter(p => p.name.includes(query));
        currentPage = 1; // Reset to page 1 on search
        renderPage(1);
    });

    // Modal Close
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

async function renderPage(page) {
    currentPage = page;

    // Clear grid and show loading state if needed (optional, for warmer UX we might keep old cards until new ones allow)
    // For now, let's just clear providing immediate feedback
    grid.innerHTML = "";
    loadingElement.style.display = "block";
    paginationContainer.innerHTML = ""; // Hide pagination during load

    // Calculate slice
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredPokemons.slice(start, end);

    // Fetch details for current page items
    try {
        const detailPromises = pageItems.map(p => getPokemonDetail(p.name));
        const results = await Promise.allSettled(detailPromises);

        const pokemons = results
            .filter(r => r.status === 'fulfilled')
            .map(r => r.value);

        loadingElement.style.display = "none";

        // Render Cards
        grid.innerHTML = pokemons.map(p => {
            // We add a data-name attribute to easily identify the card
            return `<div onclick="window.openPokemonModal('${p.name}')">${PokemonCard(p)}</div>`;
        }).join("");

        // Store rendered pokemons temporarily for modal access without re-fetching
        // Or we can just re-perform the fetch or pass the object. 
        // Optimization: attach event listener to each card element instead of inline onclick strings, 
        // but to keep it simple with our innerHTML string approach:

        // We update the click handlers after inserting HTML
        Array.from(grid.children).forEach((child, index) => {
            child.onclick = () => openModal(pokemons[index]);
        });

        renderPagination();

    } catch (err) {
        console.error(err);
        loadingElement.textContent = "Error loading page.";
    }
}

function renderPagination() {
    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.innerHTML = "";
        return;
    }

    // Prev Button
    const prevBtn = document.createElement("button");
    prevBtn.className = "pagination-btn";
    prevBtn.innerText = "Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => renderPage(currentPage - 1);

    // Next Button
    const nextBtn = document.createElement("button");
    nextBtn.className = "pagination-btn";
    nextBtn.innerText = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => renderPage(currentPage + 1);

    // Info Text
    const info = document.createElement("span");
    info.className = "pagination-info";
    info.innerText = ` Page ${currentPage} of ${totalPages} `;

    paginationContainer.appendChild(prevBtn);
    paginationContainer.appendChild(info);
    paginationContainer.appendChild(nextBtn);
}

function openModal(pokemon) {
    modalBody.innerHTML = PokemonModal(pokemon);
    modal.style.display = "block";
}

// Global binding for the inline onclick (backward compatibility if needed, though we attach listeners)
window.openPokemonModal = (name) => {
    // This is a backup if the listener attachment fails, but we primarily use the click listener.
    // However, since we don't have the object here, we might need to find it from cache.
    // Ideally, the listeners attached in renderPage handle this. 
};

init();
