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

  const filter = elements.searchFilter.value || "all";
  let data;
  try {
    data = await searchAll(query);
  } catch (error) {
    elements.main.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    return;
  }

  if (!data.length) {
    elements.main.innerHTML = `<p>No results found for "${query}".</p>`;
    return;
  }

  let filtered = data;
  if (filter === "movie") {
    filtered = data.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );
  } else if (filter === "person") {
    filtered = data.filter((item) => item.media_type === "person");
  }

  if (!filtered.length) {
    elements.main.innerHTML = `<p>No matching ${filter} results for "${query}".</p>`;
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

  renderCards(container, sortResults(filtered, sortSelect.value));

  elements.main.append(container);

  sortSelect.addEventListener("change", () => {
    const sorted = sortResults(filtered, sortSelect.value);
    container.innerHTML = "";
    renderCards(container, sorted);
  });
}

function createSortSelect() {
  const select = document.createElement("select");
  select.classList.add("sort-select");
  select.innerHTML = `
    <option value="default" disabled selected>Sort by...</option>
    <option value="az">A–Z</option>
    <option value="za">Z–A</option>
    <option value="popularity-asc">🔥Popularity ↑</option>
    <option value="popularity-desc">🔥Popularity ↓</option>
  `;

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
