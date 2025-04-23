import { getMovieTopList } from "../api/movieApi.js";
import { createMediaGridSection } from "../components/mediaGridSection.js";
import { elements } from "../utils/domElements.js";
import { prepareView } from "../utils/prepareView.js";

async function renderTopRated() {
  prepareView();

  const movies = await getMovieTopList();

  if (!movies || movies.length === 0) {
    elements.main.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    return;
  }
  const section = createMediaGridSection("Top Rated Movies", movies);

  elements.main.append(section);
}

export { renderTopRated };
