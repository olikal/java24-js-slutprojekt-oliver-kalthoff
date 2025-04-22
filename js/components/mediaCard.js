import { getTypeIcon } from "../utils/typeIcon.js";
import { renderMediaDetails } from "../views/renderMediaDetails.js"

function createMediaCard(media) {
  const { title, rating, type, typeIcon, mediaImageUrl } = extractMediaCardInfo(media);

  const article = document.createElement('article');
  article.classList.add('media-card');

  article.innerHTML = `
    <span class="media-type">${typeIcon}</span>
    <img src="${mediaImageUrl}" alt="${title}"/>
    <h2>${title}</h2>
    <p class="rating">
    <span class="star">⭐</span> ${rating}
    </p>
  `;

  article.addEventListener("click", () => {
    renderMediaDetails(media.id, type);
  });

  return article;
}

function extractMediaCardInfo(media) {
  const type = media.media_type || (media.first_air_date ? "tv" : "movie");

  return {
    title: media.title || media.name,
    rating: media.vote_average?.toFixed(1) || "N/A",
    type,
    typeIcon: getTypeIcon(type),
    mediaImageUrl: media.poster_path
      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
      : "./img/no-media.png",
  };
}

export {createMediaCard};