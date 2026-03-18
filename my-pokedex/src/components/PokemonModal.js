export function PokemonModal(pokemon) {
    // Similar to Card, but with more details if available
    // For now, we reuse the card data structure but display it differently

    const apiTypes = pokemon.types.map(t => t.type.name);
    const typeClass = apiTypes[0];
    const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

    // Height and Weight are in decimeters and hectograms
    const height = pokemon.height / 10; // m
    const weight = pokemon.weight / 10; // kg

    return `
      <div class="modal-header type-${typeClass}">
          <h2>${pokemon.name}</h2>
          <span class="modal-id">${formattedId}</span>
      </div>
      <div class="modal-body-content">
          <div class="modal-image-container">
               <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
               alt="${pokemon.name}">
          </div>
          <div class="modal-info">
              <div class="modal-types">
                  ${apiTypes.map(type => `<span class="type-badge ${type}">${type}</span>`).join('')}
              </div>
              
              <div class="modal-measurements">
                  <div class="measurement">
                      <span class="label">Height</span>
                      <span class="value">${height} m</span>
                  </div>
                  <div class="measurement">
                      <span class="label">Weight</span>
                      <span class="value">${weight} kg</span>
                  </div>
              </div>

              <h3>Base Stats</h3>
              <div class="modal-stats">
                  ${pokemon.stats.map(stat => `
                      <div class="stat-row">
                          <span class="stat-name">${stat.stat.name}</span>
                          <div class="stat-bar-container">
                              <div class="stat-bar" style="width: ${Math.min(stat.base_stat, 100)}%;"></div>
                          </div>
                          <span class="stat-num">${stat.base_stat}</span>
                      </div>
                  `).join('')}
              </div>
          </div>
      </div>
  `;
}
