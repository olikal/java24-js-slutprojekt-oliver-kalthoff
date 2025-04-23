import { renderSearchResults } from "./views/renderSearchResults.js";
import { renderTopRated } from "./views/renderTopRated.js";
import { renderPopularMovies } from "./views/renderPopular.js";
import { elements } from "./utils/domElements.js";
import { initHomepage } from "./views/renderHomepage.js";
import { handleHeaderScroll } from "./utils/scroll.js";

initHomepage();
addEventListeners();
handleHeaderScroll(elements.header);

function addEventListeners() {
  elements.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderSearchResults(elements.searchInput.value);
    elements.searchInput.value = "";
  });

  [elements.logo, elements.navHome, elements.footerHome].forEach((element) =>
    element.addEventListener("click", (event) => {
      event.preventDefault();
      initHomepage();
    })
  );

  [elements.navTopMovies, elements.footerTopMovies].forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      renderTopRated();
    });
  });

  [elements.navPopularMovies, elements.footerPopularMovies].forEach(
    (element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        renderPopularMovies();
      });
    }
  );
}
