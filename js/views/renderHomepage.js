import { getHomepageContent } from "../api/movieApi.js";
import { createMediaSlider } from "../components/mediaSlider.js";
import { elements } from "../utils/domElements.js";
import { prepareView } from "../utils/prepareView.js";

async function initHomepage() {
  prepareView();
  const data = await getHomepageContent();

  if (!data || !data.popularMovies || !data.upcomingMovies || !data.popularTV) {
    elements.main.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    return;
  }

  renderHomepageContent(data);
}

function renderHomepageContent({ popularMovies, upcomingMovies, popularTV }) {
  elements.main.innerHTML = "";
  elements.main.append(
    createMediaSlider("Popular Movies", popularMovies),
    createMediaSlider("Upcoming Movies", upcomingMovies),
    createMediaSlider("Popular TV Shows", popularTV)
  );
}

export { renderHomepageContent, initHomepage };
