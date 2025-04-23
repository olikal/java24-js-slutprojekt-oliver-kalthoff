import { fetchDetails, getMediaVideos } from "../api/movieApi.js";
import { createPersonCard } from "../components/personCard.js";
import { prepareView } from "../utils/prepareView.js";
import { elements } from "../utils/domElements.js";

async function renderMediaDetails(id, type = "movie") {
  prepareView();

  const data = await fetchDetails(`/${type}/${id}`);
  const credits = await fetchDetails(`/${type}/${id}/credits`);
  const videos = await getMediaVideos(id, type);

  if (!data || !credits || !videos) {
    elements.main.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    return;
  }

  const { title, release, rating, overview, mediaType, mediaImageUrl } =
    extractMediaInfo(data);

  const section = document.createElement("section");
  section.classList.add("details-container");
  section.innerHTML = `
    <img class="details-image" src="${mediaImageUrl}" alt="${title}" />
    <div class="details-info">
      <h2>${title}</h2>
      <p><strong>Type:</strong> ${mediaType}</p>
      <p><strong>Release Date:</strong> ${release}</p>
      <p><strong>Rating:</strong> ${rating}</p>
      <p><strong>Overview:</strong> ${overview}</p>
    </div>
  `;

  // Filtrerar bort actors utan bild och visar top5
  // Top5 = visar 0-4, baserat på TMDBs 'order' där 0 är huvudperson
  const cast = credits?.cast
    ?.filter((member) => member.profile_path)
    ?.sort((a, b) => a.order - b.order)
    ?.slice(0, 5);

  const castSection = document.createElement("div");
  castSection.classList.add("details-slider-section");

  if (cast && cast.length > 0) {
    const heading = document.createElement("h3");
    heading.textContent = "Cast";

    const slider = document.createElement("div");
    slider.classList.add("movie-slider");

    cast.forEach((person) => {
      const card = createPersonCard(person, person.character);
      slider.append(card);
    });

    castSection.append(heading, slider);
  }

  // Tar första youtube-trailern från videos-arrayen
  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  let trailerSection = null;
  if (trailer) {
    trailerSection = createTrailerSection(trailer);
  }

  if (trailerSection) {
    elements.main.append(section, castSection, trailerSection);
  } else {
    elements.main.append(section, castSection);
  }
}

// Formaterar media-info från API-svaret
function extractMediaInfo(data) {
  return {
    title: data.title || data.name,
    release: data.release_date || data.first_air_date || "Unknown",
    rating: data.vote_average?.toFixed(1) || "N/A",
    overview: data.overview || "No description available.",
    mediaType: data.first_air_date ? "TV Show" : "Movie",
    mediaImageUrl: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : "./img/no-media.png",
  };
}

function createTrailerSection(trailer) {
  const section = document.createElement("div");
  section.classList.add("trailer-wrapper");

  const heading = document.createElement("h2");
  heading.textContent = "Trailer";

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
  iframe.setAttribute("allowfullscreen", true);
  iframe.classList.add("trailer");

  section.append(heading, iframe);
  return section;
}

export { renderMediaDetails };
