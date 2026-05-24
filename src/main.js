import "./css/style.css";
import {Anime} from "./js/Anime.js";
import {Helper} from "./js/Helper.js";

"use strict";

console.log("AnimeZone is starting...");

const animeListEl = document.querySelector("#anime-list");
let allAnime = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) ?? [];
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-anime");
const typeSelect = document.querySelector("#filter-type");
const genreSelect = document.querySelector("#filter-genre");
const modalEl = document.querySelector("#modal");
const modalBodyEl = document.querySelector("#modal-body");
const modalCloseEl = document.querySelector("#modal-close");

const renderAnime = (animeArray) => {
  animeListEl.innerHTML = animeArray
    .map(
      (anime) => `
      <article class="anime-card" data-id="${anime.id}">
        <button class="fav-btn" data-id="${anime.id}">${favorites.includes(anime.id) ? "\u2665" : "\u2661"}</button>
        <img src="${anime.image}" alt="${anime.title}" />
        <h3>${anime.title}</h3>
        <p>Score: ${Helper.formatScore(anime.score)}</p>
        <p>Episodes: ${anime.episodes ?? "?"}</p>
        <p>${anime.type ?? "Unknown"}</p>
        <p>${anime.status ?? "Unknown"}</p>
        <p class="synopsis">${anime.shortSynopsis}</p>
      </article>
    `
    )
    .join("");
};

const showLoading = () => {
  animeListEl.innerHTML = `<p class="loading">Loading anime...</p>`;
};

const showError = (message) => {
  animeListEl.innerHTML = `<p class="eror">${message}</p>`;
};

const fetchTopAnime = async () => {
  try {
    showLoading();
    const allData = [];
    // Fetch 4 pages sequentially with delay to respect Jikan rate limit
    for (const page of [1, 2, 3, 4]) {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?page=${page}`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      allData.push(...json.data);
      // Small delay between requests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    return allData;
  } catch (err) {
    console.error("Fetch failed:", err);
    showError("Could not load anime. Please try again later.");
  }
};

const fetchGenres = async () =>{
  try {
    const response = await fetch("https://api.jikan.moe/v4/genres/anime");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    return json.data;
  } catch (err) {
    console.error("Genre fetch failed:", err);
    return [];
  }

}

const applyFilters = () => {
  const query = searchInput.value.toLowerCase();
  const type = typeSelect.value;
  const genre = genreSelect.value;
  const sortBy = sortSelect.value;

  let result = allAnime.filter((anime) =>
    anime.title.toLowerCase().includes(query)
  );

  result = type ? result.filter((anime) => anime.type === type) : result;

  result = genre 
    ? result.filter((anime) => anime.genres.some((g) => g.name === genre))
    : result;

  result = [...result].sort((a, b) =>
    sortBy === "score" ? b.score - a.score : a.title.localeCompare(b.title)
  );

  renderAnime(result);
};

const fetchAnimeDetails = async (id) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    return json.data;
  } catch (err) {
    console.error("Details fetch failed:", err);
    return null;
  }
};

const fetchCharacters = async (id) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    return json.data;
  } catch (err) {
    console.error("Characters fetch failed:", err);
    return [];
  }
};

const openModal = async (id) => {
  modalBodyEl.innerHTML = `<p class="loading">Loading details...</p>`;
  modalEl.classList.remove("hidden");

  const [details, characters] = await Promise.all([
    fetchAnimeDetails(id),
    fetchCharacters(id),
  ]);
  
  if (!details) {
    modalBodyEl.innerHTML = `<p class="error">Could not load details.</p>`;
    return;
  }

  const topCharacters = characters.slice(0, 6);

  modalBodyEl.innerHTML = `
    <h2>${details.title}</h2>
    <img src="${details.images.jpg.image_url}" alt="${details.title}" />
    <p>Score: ${Helper.formatScore(details.score)}</p>
    <p>Rank: #${details.rank ?? "?"}</p>
    <p>Episodes: ${details.episodes ?? "?"}</p>
    <p>Year: ${details.year ?? "Unknown"}</p>
    <p>Duration: ${details.duration ?? "?"}</p>
    <p>Rating: ${details.rating ?? "?"}</p>
    <p>${details.synopsis ?? "No synopsis"}</p>
    <h3>Characters</h3>
    <div class="characters">
      ${topCharacters
        .map(
          (c) => `
        <div class="character">
          <img src="${c.character.images.jpg.image_url}" alt="${c.character.name}" />
          <p>${c.character.name}</p>
          <small>${c.role}</small>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

fetchTopAnime().then((data) =>{
  allAnime = data.map((item) => new Anime(item));
  renderAnime(allAnime);
  
  searchInput.addEventListener("input", applyFilters);
  typeSelect.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applyFilters);
  genreSelect.addEventListener("change", applyFilters);

  fetchGenres().then((genres) =>{
    genreSelect.innerHTML += genres
      .map((g) => `<option value="${g.name}">${g.name}</option>`)
      .join("");
  })

  animeListEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("fav-btn")) return;
    e.stopPropagation();

    const id = Number(e.target.dataset.id);

    if (favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
      e.target.textContent = "\u2661";
    } else {
      favorites.push(id);
      e.target.textContent = "\u2665";
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  animeListEl.addEventListener("click", (e) =>{
    const card = e.target.closest(".anime-card");
    if (!card) return;
    if (e.target.classList.contains("fav-btn")) return;

    const id = Number(card.dataset.id);
    openModal(id);
  });
  modalCloseEl.addEventListener("click", () => {
    modalEl.classList.add("hidden");
  });

  window.addEventListener("keydown", (e) =>{
    if (e.key === "Escape") {
      modalEl.classList.add("hidden");
    }
  });
  
});