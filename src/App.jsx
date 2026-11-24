import { useState } from "react";
import PokemonApplication from "./PokemonApplication.jsx";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <main className="page">
      <div className="app-shell">
        <header className="site-header">
          <span className="brand-icon" aria-hidden="true">
            ◉
          </span>
          <span className="brand-name">POKÉDEX</span>
          <span className="header-tag">REACT PROJECT</span>
        </header>

        {!started ? (
          <section className="welcome" aria-labelledby="welcome-title">
            <div className="hero-ball" aria-hidden="true">
              <span />
            </div>

            <h1 id="welcome-title">"Gotta catch 'em all!"</h1>
            <p className="welcome-description">
              151 Pokémon-figurer. Välj en favorit och se bild, typ, vikt och
              längd!
            </p>
            <button className="primary-button" onClick={() => setStarted(true)}>
              Nu kör vi! <span aria-hidden="true">→</span>
            </button>
          </section>
        ) : (
          <div>
            <button onClick={() => setStarted(false)}>
              Tillbaka till start
            </button>

            <PokemonApplication />
          </div>
        )}
        <footer>Byggd med React &amp; PokéAPI</footer>
      </div>
    </main>
  );
}
