export function PokemonCard(pokemon) {
    // Pokemon details are fetched separately, or passed in. 
    // We expect pokemon to have: name, id, types, sprites
    const apiTypes = pokemon.types.map(t => t.type.name);
    const typeClass = apiTypes[0]; // Primary type for styling

    // Format ID to #001
    const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

    return `
    <div class="pokemon-card type-${typeClass}">
      <div class="card-header">
        <span class="pokemon-name">${pokemon.name}</span>
        <span class="pokemon-id">${formattedId}</span>
      </div>
      <div class="card-image-container">
        <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
             alt="${pokemon.name}" 
             class="pokemon-image"
             loading="lazy">
      </div>
      <div class="card-types">
        ${apiTypes.map(type => `<span class="type-badge ${type}">${type}</span>`).join('')}
      </div>
      <div class="card-stats">
        <div class="stat">
            <span class="stat-label">HP</span>
            <span class="stat-value">${pokemon.stats[0].base_stat}</span>
        </div>
        <div class="stat">
            <span class="stat-label">ATK</span>
            <span class="stat-value">${pokemon.stats[1].base_stat}</span>
        </div>
        <div class="stat">
            <span class="stat-label">DEF</span>
            <span class="stat-value">${pokemon.stats[2].base_stat}</span>
        </div>
      </div>
    </div>
  `;
}
