import "./css/style.css";
"use strict";
console.log("AnimeZone is starting...");

fetch("https://api.jikan.moe/v4/top/anime")
  .then((response)=> response.json())
  .then((data)=> console.log("Jikan response:", data));