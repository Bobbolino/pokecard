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

            <button className="primary-button" onClick={() => setStarted(true)}>
              Start Pokemon App <span aria-hidden="true">→</span>
            </button>
          </section>
        ) : (
          <div>
            <button className="back-button" onClick={() => setStarted(false)}>
              ← Back to Start
            </button>

            <PokemonApplication />
          </div>
        )}
        <footer>Built with React &amp; PokéAPI</footer>
      </div>
    </main>
  );
}
