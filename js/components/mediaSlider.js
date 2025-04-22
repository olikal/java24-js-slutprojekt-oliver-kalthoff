import { createMediaCard } from "./mediaCard.js";

function createMediaSlider(title, movies) {
  const section = document.createElement('section');
  section.classList.add('movie-row');

  const heading = document.createElement('h2');
  heading.textContent = title;

  const slider = document.createElement('div');
  slider.classList.add('movie-slider');

  movies.forEach(movie => {
    const card = createMediaCard(movie);
    slider.append(card);
  });

  section.append(heading, slider);
  return section;
}

export {createMediaSlider};