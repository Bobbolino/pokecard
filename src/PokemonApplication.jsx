import { useEffect, useState } from "react";
import Pokemon from "./Pokemon.jsx";

const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

export default function PokemonApplication() {
  // Listan med namn och API-adresser till de första 151 Pokémon.
  const [pokemonList, setPokemonList] = useState([]);
  // Namnet som användaren har valt i dropdown-listan.
  const [selectedPokemon, setSelectedPokemon] = useState("");
  // Fullständig data för den Pokémon som användaren har hämtat.
  const [pokemonData, setPokemonData] = useState(null);
  const [listLoading, setListLoading] = useState(true);
  const [pokemonLoading, setPokemonLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Körs när PokemonApplication monteras (en extra gång i StrictMode under utveckling).
    const controller = new AbortController();

    async function fetchPokemonList() {
      try {
        setListLoading(true);
        setError("");

        const response = await fetch(POKEMON_LIST_URL, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Kunde inte hämta Pokémon-listan.");

        const data = await response.json();
        setPokemonList(data.results);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Något gick fel när Pokémon-listan hämtades. Prova att ladda om sidan.");
        }
      } finally {
        if (!controller.signal.aborted) setListLoading(false);
      }
    }

    fetchPokemonList();
    return () => controller.abort();
  }, []);

  async function fetchSelectedPokemon() {
    if (!selectedPokemon || pokemonLoading) return;

    setPokemonLoading(true);
    setError("");
    setPokemonData(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(selectedPokemon)}`
      );
      if (!response.ok) throw new Error("Kunde inte hämta vald Pokémon.");

      const data = await response.json();
      setPokemonData(data);
    } catch {
      setError("Kunde inte hämta Pokémon. Försök igen.");
    } finally {
      setPokemonLoading(false);
    }
  }

  return (
    <section className="pokedex" aria-labelledby="pokedex-title">
      <div className="section-heading">
        <p className="eyebrow">Generation I · Kanto</p>
        <h1 id="pokedex-title">Din Pokédex</h1>
        <p>Välj en av de 151 ursprungliga Pokémon för att se mer information.</p>
      </div>

      <div className="search-panel">
        <label htmlFor="pokemon-select">Välj Pokémon</label>
        <div className="form-row">
          <select
            id="pokemon-select"
            value={selectedPokemon}
            onChange={(event) => setSelectedPokemon(event.target.value)}
            disabled={listLoading || pokemonList.length === 0}
          >
            <option value="">
              {listLoading ? "Hämtar Pokémon..." : "Välj en Pokémon..."}
            </option>
            {pokemonList.map((pokemon, index) => (
              <option key={pokemon.name} value={pokemon.name}>
                #{String(index + 1).padStart(3, "0")} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </option>
            ))}
          </select>
          <button
            className="primary-button"
            onClick={fetchSelectedPokemon}
            disabled={!selectedPokemon || listLoading || pokemonLoading}
          >
            {pokemonLoading ? "Hämtar..." : "Hämta Pokémon"}
          </button>
        </div>
        {error && <p className="error-message" role="alert">{error}</p>}
      </div>

      {pokemonLoading ? (
        <div className="empty-state" role="status">Hämtar information om Pokémon...</div>
      ) : pokemonData ? (
        <Pokemon pokemon={pokemonData} />
      ) : (
        <div className="empty-state">
          <div className="small-ball" aria-hidden="true" />
          <p>Din Pokémon visas här när du har valt och hämtat den.</p>
        </div>
      )}
    </section>
  );
}
