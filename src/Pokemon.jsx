export default function Pokemon({ pokemon }) {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const image = pokemon.sprites.other?.["official-artwork"]?.front_default
    || pokemon.sprites.front_default;

  return (
    <article className="pokemon-card" aria-label={`Information om ${name}`}>
      <div className="pokemon-visual">
        <span className="pokemon-number">#{String(pokemon.id).padStart(3, "0")}</span>
        {image ? (
          <img src={image} alt={name} className="pokemon-image" />
        ) : (
          <p>Ingen bild tillgänglig</p>
        )}
      </div>
      <div className="pokemon-info">
        <p className="eyebrow">Pokémon information</p>
        <h2>{name}</h2>
        <div className="type-list" aria-label="Typer">
          {pokemon.types.map(({ type }) => (
            <span className={`type-badge type-${type.name}`} key={type.name}>
              {type.name}
            </span>
          ))}
        </div>
        <div className="stats-grid">
          <div className="stat">
            <span>Vikt</span>
            <strong>{(pokemon.weight / 10).toLocaleString("sv-SE")} kg</strong>
          </div>
          <div className="stat">
            <span>Längd</span>
            <strong>{(pokemon.height / 10).toLocaleString("sv-SE")} m</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
