import "./css/style.css";
import {Anime} from "./js/Anime.js";
import {Helper} from "./js/Helper.js";

"use strict";

console.log("AnimeZone is starting...");

const API_URL = "https://api.jikan.moe/v4/top/anime";
const animeListEl = document.querySelector("#anime-list");
let allAnime = [];
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-anime");
const typeSelect = document.querySelector("#filter-type");

const renderAnime = (animeArray) => {
  animeListEl.innerHTML = animeArray
    .map(
      (anime) => `
      <article class="anime-card">
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
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    console.log("Jikan response:", json.data);
    return json.data;
  } catch (err) {
    console.error("Fetch failed:", err);
    showError("Could not load anime. Please try again later.");
  }
};
const applyFilters = () => {
  const query = searchInput.value.toLowerCase();
  const type = typeSelect.value;
  const sortBy = sortSelect.value;

  let result = allAnime.filter((anime) =>
    anime.title.toLowerCase().includes(query)
  );

  result = type ? result.filter((anime) => anime.type === type) : result;

  result = [...result].sort((a, b) =>
    sortBy === "score" ? b.score - a.score : a.title.localeCompare(b.title)
  );

  renderAnime(result);
};
fetchTopAnime().then((data) =>{
  allAnime = data.map((item) => new Anime(item));
  renderAnime(allAnime);
  
  searchInput.addEventListener("input", applyFilters);
  typeSelect.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applyFilters);
  
});