# Pokédex – React-uppgift

En komplett lösning med exakt de tre begärda komponenterna: `App`, `PokemonApplication` och `Pokemon`.

## Starta

1. Öppna mappen `pokemon-react-app` i VS Code.
2. Öppna terminalen i projektmappen.
3. Kör `npm install`.
4. Kör `npm run dev`.
5. Öppna länken som Vite skriver ut (oftast `http://localhost:5173`).

## Så fungerar det

- `App.jsx` visar knappen **Start Pokemon App** och använder `useState` för att visa `PokemonApplication` efter klick.
- `PokemonApplication.jsx` hämtar namnlistan via `https://pokeapi.co/api/v2/pokemon?limit=151` när komponenten monteras, lagrar den i state och visar en dropdown. Användaren kan välja och hämta en Pokémon via ett andra API-anrop.
- `Pokemon.jsx` får objektet som prop och visar namn, bild, alla typer, vikt och längd.

API-anropen kräver internetanslutning. I React Strict Mode gör React under utveckling en extra effekt-körning; den avbrutna anropet hanteras med `AbortController`.

## Bygg för produktion

Kör `npm run build`.
