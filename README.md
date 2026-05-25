# AnimeZone

Interactive single-page web application for discovering anime, built with vanilla JavaScript and Vite for the **Web Advanced** course at Erasmushogeschool Brussel.

## API

Powered by the [Jikan API v4](https://docs.api.jikan.moe/) (unofficial MyAnimeList API).

Endpoints used:
- `GET /top/anime?page=N` — fetches top anime (4 pages = 100 anime)
- `GET /genres/anime` — populates the genre filter dropdown
- `GET /anime/{id}` — detailed info for the modal
- `GET /anime/{id}/characters` — character list for the modal

## Features

- Browse 100 top-rated anime fetched from Jikan API (paginated)
- Live search by title with form validation on submit
- Filter by genre and type
- Sort by title or score
- Click any card to open a detail modal with synopsis, rank, year, duration and top 6 characters
- Save favorites to localStorage with a dedicated favorites section
- Light / dark theme switcher (persisted in localStorage)
- Lazy-loaded images via IntersectionObserver
- Smooth scroll-to-top button
- Responsive layout for mobile and desktop

## Tech stack

- Vanilla JavaScript (ES Modules)
- Vite (build tool)
- Vanilla CSS with custom properties for theming
- Semantic HTML5
- Jikan API v4

## Installation

```bash
git clone https://github.com/manasse0318/animezone.git
cd animezone
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

To build for production:

```bash
npm run build
npm run preview
```

## Project structure
animezone/
├── src/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── Anime.js
│   │   └── Helper.js
│   └── main.js
├── index.html
└── package.json

## Screenshots

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)

## Technical requirements mapping

| Requirement | File | Line |
|---|---|---|
| DOM manipulation (querySelector) | `src/main.js` | 9–23 |
| `const` and `let` | `src/main.js` | throughout |
| Template literals | `src/main.js` | 28–39, 55–61 |
| Array methods (`map`, `filter`, `some`, `includes`, `slice`, `sort`) | `src/main.js` | 27, 46, 134, 138, 141, 189, 241 |
| Arrow functions | `src/main.js` | throughout |
| Ternary operator | `src/main.js` | 30, 145, 293 |
| Nullish coalescing (`??`) | `src/main.js` | 11, 34–36, 195–200, 284 |
| Destructuring | `src/main.js` | 179 |
| Spread operator | `src/main.js` | 104, 144 |
| Callbacks (`.then`) | `src/main.js` | 218, 228 |
| Promises | `src/main.js` | 218, 228 |
| `async` / `await` with `try/catch` | `src/main.js` | 93, 115, 151, 163 |
| `new Promise()` (manual creation) | `src/main.js` | 106 |
| `Promise.all` (parallel requests) | `src/main.js` | 179 |
| Fetch API + `response.ok` check | `src/main.js` | 99–102, 117–118, 153–154, 165–166 |
| JSON manipulation (`stringify`, `parse`) | `src/main.js` | 11, 247 |
| `localStorage.setItem` / `getItem` | `src/main.js` | 11, 247, 284, 294 |
| Event delegation | `src/main.js` | 234, 251 |
| `element.closest()` | `src/main.js` | 252 |
| Form submit + `preventDefault()` | `src/main.js` | 269–270 |
| Form validation (custom) | `src/main.js` | 273–277 |
| IntersectionObserver | `src/main.js` | 71 |
| Classes with constructor + getter | `src/js/Anime.js` | all |
| Static methods | `src/js/Helper.js` | all |
| ES Modules (`import` / `export`) | `src/main.js`, `Anime.js`, `Helper.js` | 1–3 |
| CSS custom properties + theme toggle | `src/css/style.css`, `src/main.js` | top, 290 |
| Responsive design (flexbox + grid + media query) | `src/css/style.css` | throughout |
| Semantic HTML | `index.html` | throughout |
| Vite setup | `package.json` | n/a |

> Line numbers reflect the code at submission. Small shifts may occur after subsequent edits.

## Sources

- [Jikan API documentation](https://docs.api.jikan.moe/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Vite documentation](https://vitejs.dev/)
- Course materials from Web Advanced (Erasmushogeschool Brussel)

## AI assistance

Parts of this project were developed with the help of Claude (Anthropic) as a coding assistant. The AI was used for explaining concepts (IntersectionObserver, `Promise.all`, event delegation), debugging help (syntax errors, rate limit issues)

## Author

Manasse Tedika