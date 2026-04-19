import { getAllPokemonNames, getPokemonDetail } from "./api/endpoints.js";
import { Navbar } from "./components/Navbar.js";
import { PokemonCard } from "./components/PokemonCard.js";

// Inject Navbar
document.getElementById("navbar-root").innerHTML = Navbar();

// State
let allPokemons = [];
let fighter1 = null;
let fighter2 = null;

// Elements
const battleBtn = document.getElementById("battle-btn");
const battleLog = document.getElementById("battle-log");

const fighters = {
    1: {
        input: document.getElementById("search-1"),
        suggestions: document.getElementById("suggestions-1"),
        display: document.getElementById("display-1"),
        data: null,
    },
    2: {
        input: document.getElementById("search-2"),
        suggestions: document.getElementById("suggestions-2"),
        display: document.getElementById("display-2"),
        data: null,
    }
};

async function init() {
    const data = await getAllPokemonNames();
    allPokemons = data.results;

    setupSearch(1);
    setupSearch(2);

    battleBtn.onclick = startBattle;
}

function setupSearch(id) {
    const { input, suggestions } = fighters[id];

    input.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            suggestions.style.display = "none";
            return;
        }

        const matches = allPokemons
            .filter(p => p.name.includes(query))
            .slice(0, 5); // Limit to 5 suggestions

        renderSuggestions(id, matches);
    });

    // Hide suggestions on click outside
    document.addEventListener("click", (e) => {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = "none";
        }
    });
}

function renderSuggestions(id, matches) {
    const { suggestions, input } = fighters[id];

    if (matches.length === 0) {
        suggestions.style.display = "none";
        return;
    }

    suggestions.innerHTML = matches.map(m => `
      <div class="suggestion-item" data-name="${m.name}">
          ${m.name}
      </div>
  `).join("");

    suggestions.style.display = "block";

    // Click handler for items
    suggestions.querySelectorAll(".suggestion-item").forEach(item => {
        item.onclick = async () => {
            input.value = item.dataset.name;
            suggestions.style.display = "none";
            await selectFighter(id, item.dataset.name);
        };
    });
}

async function selectFighter(id, name) {
    const { display } = fighters[id];
    display.innerHTML = '<div class="placeholder-fighter">...</div>';

    try {
        const data = await getPokemonDetail(name);
        fighters[id].data = data;

        display.innerHTML = PokemonCard(data);

        // Reset any battle effects
        const card = display.querySelector('.pokemon-card');
        if (card) {
            card.style.opacity = "";
            card.style.filter = "";
            card.classList.remove('anim-winner', 'anim-damage');
        }

        checkReady();
    } catch (err) {
        console.error(err);
        display.innerHTML = '<div class="placeholder-fighter">?</div>';
    }
}

function checkReady() {
    if (fighters[1].data && fighters[2].data) {
        battleBtn.disabled = false;
    }
}

// Helper sleep
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function startBattle() {
    const p1 = fighters[1].data;
    const p2 = fighters[2].data;

    // UI Elements
    const card1 = fighters[1].display.querySelector('.pokemon-card');
    const card2 = fighters[2].display.querySelector('.pokemon-card');
    const vsBadge = document.querySelector('.vs-badge');

    // Reset state
    battleLog.style.display = "none";
    card1.classList.remove('anim-winner', 'anim-damage');
    card2.classList.remove('anim-winner', 'anim-damage');
    card1.style.opacity = "1";
    card1.style.filter = "grayscale(0%)";
    card2.style.opacity = "1";
    card2.style.filter = "grayscale(0%)";
    vsBadge.innerText = "VS";

    // 1. Initial Tension
    battleBtn.disabled = true;
    battleBtn.innerText = "FIGHTING...";
    vsBadge.innerText = "!!!";
    vsBadge.classList.add('anim-shake');
    await sleep(800);
    vsBadge.classList.remove('anim-shake');

    // 2. Attack Phase
    // P1 Attacks
    card1.classList.add('anim-attack-p1');
    await sleep(300); // Wait for impact frame
    card2.classList.add('anim-damage'); // P2 takes hit
    await sleep(400); // Finish anim
    card1.classList.remove('anim-attack-p1');
    card2.classList.remove('anim-damage');

    await sleep(300);

    // P2 Attacks
    card2.classList.add('anim-attack-p2');
    await sleep(300);
    card1.classList.add('anim-damage'); // P1 takes hit
    await sleep(400);
    card2.classList.remove('anim-attack-p2');
    card1.classList.remove('anim-damage');

    await sleep(500);

    // 3. Logic & Result
    const stats1 = p1.stats.reduce((acc, s) => acc + s.base_stat, 0);
    const stats2 = p2.stats.reduce((acc, s) => acc + s.base_stat, 0);

    const luck1 = Math.random() * 50;
    const luck2 = Math.random() * 50;

    const score1 = stats1 + luck1;
    const score2 = stats2 + luck2;

    let winner, loserCard, winnerCard;
    let log = [];

    log.push(`${p1.name} (Stats: ${stats1}) vs ${p2.name} (Stats: ${stats2})`);

    if (score1 > score2) {
        winner = p1;
        winnerCard = card1;
        loserCard = card2;
        log.push(`CRITICAL HIT! ${p1.name} overpowers ${p2.name}!`);
    } else {
        winner = p2;
        winnerCard = card2;
        loserCard = card1;
        log.push(`It's super effective! ${p2.name} deals massive damage to ${p1.name}!`);
    }

    // 4. Winner Effect
    winnerCard.classList.add('anim-winner');
    loserCard.style.opacity = "0.7"; // Dim the loser
    loserCard.style.filter = "grayscale(100%)"; // Grey out loser (optional styling directly here or class)

    // 5. Restore Button
    battleBtn.innerText = "Battle Again";
    battleBtn.disabled = false;

    renderLog(winner, log);
}

function renderLog(winner, logLines) {
    battleLog.style.display = "block";
    battleLog.innerHTML = `
        <div class="winner-announcement">
            Winner: ${winner.name.toUpperCase()}!
        </div>
        <div class="logs">
            ${logLines.map(l => `<div class="log-entry">${l}</div>`).join("")}
        </div>
    `;

    // Scroll to log
    battleLog.scrollIntoView({ behavior: 'smooth' });
}

init();
