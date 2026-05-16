import "./css/style.css";
"use strict";

console.log("AnimeZone is starting...");

const API_URL = "https://api.jikan.moe/v4/top/anime";
const animeListEl = document.querySelector("#anime-list");

const renderAnime = (animeArray) => {
  animeListEl.innerHTML = animeArray
    .map(
      (anime) => `
      <article class="anime-card">
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
        <h3>${anime.title}</h3>
        <p>⭐ ${anime.score ?? "N/A"}</p>
        <p>📺 ${anime.episodes ?? "?"} eps</p>
        <p>${anime.type ?? "Unknown"}</p>
        <p>${anime.status ?? "Unknown"}</p>
      </article>
    `
    )
    .join("");
};

const showLoading = () => {
  animeListEl.innerHTML = `<p class="loading">Loading anime...</p>`;
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
  }
};

fetchTopAnime().then(renderAnime);