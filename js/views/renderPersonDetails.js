import { fetchDetails } from "../api/movieApi.js";
import { createMediaCard } from "../components/mediaCard.js";
import { prepareView } from "../utils/prepareView.js";

async function renderPersonDetails(id) {
  prepareView();
  const main = document.querySelector("main");

  const data = await fetchDetails(`/person/${id}`);
  const credits = await fetchDetails(`/person/${id}/combined_credits`);

  if (!data || !credits) {
    main.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    return;
  }

  const { name, department, popularity, bio, personImageUrl } =
    extractPersonInfo(data);

  const section = document.createElement("section");
  section.classList.add("details-container");
  section.innerHTML = `
    <img class="details-image" src="${personImageUrl}" alt="${name}" />
    <div class="details-info">
      <h2>${name}</h2>
      <p><strong>Department:</strong> ${department}</p>
      <p><strong>Popularity:</strong> ${popularity}</p>
      <p><strong>Biography:</strong> ${bio}</p>
    </div>
  `;

  const knownFor = getFilteredKnownFor(credits.cast);
  const knownForSection = createKnownForSection(knownFor);

  main.append(section, knownForSection);
}

function extractPersonInfo(data) {
  return {
    name: data.name || "Unknown",
    department: data.known_for_department || "Unknown",
    popularity: data.popularity?.toFixed(1) || "N/A",
    bio: data.biography || "No biography available.",
    personImageUrl: data.profile_path
      ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
      : "./img/no-person.png",
  };
}

function getFilteredKnownFor(castArray) {
  const excludedGenres = [10767, 99, 10763];
  return castArray
    ?.filter(
      (item) => !excludedGenres.some((genre) => item.genre_ids?.includes(genre))
    )
    ?.sort((a, b) => b.popularity - a.popularity)
    ?.slice(0, 5);
}

function createKnownForSection(items) {
  const section = document.createElement("div");
  section.classList.add("details-slider-section");

  const heading = document.createElement("h3");
  heading.textContent = "Known for";
  section.appendChild(heading);

  if (!items || items.length === 0) {
    const fallback = document.createElement("p");
    fallback.textContent = "No popular credits available.";
    section.appendChild(fallback);
    return section;
  }

  const slider = document.createElement("div");
  slider.classList.add("movie-slider");

  items.forEach((item) => {
    const card = createMediaCard(item);
    slider.append(card);
  });

  section.appendChild(slider);
  return section;
}

export { renderPersonDetails };
