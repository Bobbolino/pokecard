import { useEffect, useState } from "react";
import Pokemon from "./Pokemon.jsx";

const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

export default function PokemonApplication() {
  // Stores the names and API URLs of the first 151 Pokémon.
  const [pokemonList, setPokemonList] = useState([]);

  // Stores the Pokémon selected in the dropdown.
  const [selectedPokemon, setSelectedPokemon] = useState("");

  // Stores detailed information about the fetched Pokémon.
  const [pokemonData, setPokemonData] = useState(null);

  const [listLoading, setListLoading] = useState(true);
  const [pokemonLoading, setPokemonLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetches the Pokémon list when the component mounts.
    const controller = new AbortController();

    async function fetchPokemonList() {
      try {
        setListLoading(true);
        setError("");

        const response = await fetch(POKEMON_LIST_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the Pokémon list.");
        }

        const data = await response.json();
        setPokemonList(data.results);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Something went wrong while fetching the Pokémon list. Please reload the page.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setListLoading(false);
        }
      }
    }

    fetchPokemonList();

    return () => controller.abort();
  }, []);

  // Fetches detailed information about the selected Pokémon.
  async function fetchSelectedPokemon() {
    if (!selectedPokemon || pokemonLoading) return;

    setPokemonLoading(true);
    setError("");
    setPokemonData(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(selectedPokemon)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the selected Pokémon.");
      }

      const data = await response.json();
      setPokemonData(data);
    } catch {
      setError("Could not fetch Pokémon. Please try again.");
    } finally {
      setPokemonLoading(false);
    }
  }

  function handlePokemonChange(event) {
    setSelectedPokemon(event.target.value);
    setPokemonData(null);
    setError("");
  }

  return (
    <section className="pokedex" aria-labelledby="pokedex-title">
      <div className="section-heading">
        <h1 id="pokedex-title">Pokédex</h1>
        <p>Choose from 151 Pokémon to learn more about them.</p>
      </div>

      <div className="search-panel">
        <label htmlFor="pokemon-select">Choose a Pokémon</label>

        <div className="form-row">
          <select
            id="pokemon-select"
            value={selectedPokemon}
            onChange={handlePokemonChange}
            disabled={listLoading || pokemonLoading || pokemonList.length === 0}
          >
            <option value="">
              {listLoading ? "Fetching Pokémon..." : "Select a Pokémon..."}
            </option>

            {pokemonList.map((pokemon, index) => (
              <option key={pokemon.name} value={pokemon.name}>
                #{String(index + 1).padStart(3, "0")}{" "}
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </option>
            ))}
          </select>

          <button
            className="primary-button"
            onClick={fetchSelectedPokemon}
            disabled={!selectedPokemon || listLoading || pokemonLoading}
          >
            {pokemonLoading ? "Fetching..." : "Fetch Pokémon"}
          </button>
        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </div>

      {pokemonLoading ? (
        <div className="empty-state" role="status">
          Fetching Pokémon information...
        </div>
      ) : pokemonData ? (
        <Pokemon pokemon={pokemonData} />
      ) : (
        <div className="empty-state">
          <div className="small-ball" aria-hidden="true" />
          <p>Your selected Pokémon will appear here.</p>
        </div>
      )}
    </section>
  );
}
