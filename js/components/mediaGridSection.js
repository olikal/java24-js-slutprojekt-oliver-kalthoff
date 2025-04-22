import { createMediaCard } from "./mediaCard.js";

function createMediaGridSection(title, movies) {
  const section = document.createElement("section");
  section.classList.add("media-grid-section");

  const heading = document.createElement("h2");
  heading.textContent = title;

  const grid = document.createElement("div");
  grid.classList.add("media-grid");

  movies.forEach((movie) => {
    const card = createMediaCard(movie);
    grid.appendChild(card);
  });

  section.append(heading, grid);
  return section;
}

export { createMediaGridSection };