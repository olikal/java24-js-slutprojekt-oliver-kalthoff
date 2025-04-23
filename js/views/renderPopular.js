import { getPopularMovies } from "../api/movieApi.js";
import { createMediaGridSection } from "../components/mediaGridSection.js";
import { elements } from "../utils/domElements.js";
import { prepareView } from "../utils/prepareView.js";

async function renderPopularMovies() {
  prepareView();

  const movies = await getPopularMovies();

  if (!movies || movies.length === 0) {
    elements.main.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    return;
  }

  const section = createMediaGridSection("Popular Movies", movies);

  elements.main.append(section);
}

export { renderPopularMovies };
