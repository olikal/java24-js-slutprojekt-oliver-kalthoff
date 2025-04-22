import { createMediaCard } from "../components/mediaCard.js";
import { createPersonCard } from "../components/personCard.js";
import { searchAll } from "../api/movieApi.js";
import { sortResults } from "../utils/sort.js";
import { elements } from "../utils/domElements.js";
import { prepareView } from "../utils/prepareView.js";

async function renderSearchResults(query) {
  prepareView();

  if (!query.trim()) {
    elements.main.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  const data = await searchAll(query);
  if (!data.length) {
    elements.main.innerHTML = `<p>No results found for "${query}".</p>`;
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = `Search results for "${query}"`;

  const sortSelect = createSortSelect();
 
  const headingWrapper = document.createElement("div");
  headingWrapper.classList.add("heading-wrapper");
  headingWrapper.append(heading, sortSelect);

  elements.main.append(headingWrapper);

  const container = document.createElement("div");
  container.classList.add("search-results");

  renderCards(container, sortResults(data, sortSelect.value));

  elements.main.append(container);

  sortSelect.addEventListener("change", () => {
    const sorted = sortResults(data, sortSelect.value);
    container.innerHTML = "";
    renderCards(container, sorted);
  });
}

function createSortSelect() {
  const select = document.createElement('select');
  select.classList.add('sort-select');
  select.innerHTML = `
    <option value="default" disabled selected>Sort by...</option>
    <option value="az">A–Z</option>
    <option value="za">Z–A</option>
    <option value="popularity-asc">Popularity ↑</option>
    <option value="popularity-desc">Popularity ↓</option>
  `

  return select;
}

function renderCards(container, items) {
  items.forEach((item) => {
    let card;
    switch (item.media_type) {
      case "movie":
      case "tv":
        card = createMediaCard(item);
        break;
      case "person":
        card = createPersonCard(item);
        break;
      default:
        return;
    }
    container.append(card);
  });
}

export { renderSearchResults };
