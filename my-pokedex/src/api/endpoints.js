import { getJSON, buildURL } from "./client.js";

const BASE_URL = "https://pokeapi.co/api/v2";

export function getPokemonList({ limit = 20, offset = 0 } = {}) {
    const url = buildURL(`${BASE_URL}/pokemon`, { limit, offset });
    return getJSON(url);
}

export function getAllPokemonNames() {
    return getJSON(`${BASE_URL}/pokemon?limit=10000&offset=0`);
}

export function getPokemonDetail(nameOrId) {
    return getJSON(`${BASE_URL}/pokemon/${nameOrId}`);
}
