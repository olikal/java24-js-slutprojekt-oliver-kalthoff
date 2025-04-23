import { MediaItem } from "../models/MediaItem.js";
import { getTypeIcon } from "../utils/typeIcon.js";
import { renderMediaDetails } from "../views/renderMediaDetails.js";

function createMediaCard(mediaData) {
  // Skapar MediaItem-objekt för att samla datan från API (OOP)
  const media = new MediaItem(mediaData);

  const article = document.createElement("article");
  article.classList.add("media-card");

  article.innerHTML = `
    <span class="media-type">${getTypeIcon(media.type)}</span>
    <img src="${media.imageUrl}" alt="${media.title}"/>
    <h2>${media.title}</h2>
    <p class="rating">
    <span class="star">⭐</span> ${media.rating}
    </p>
    <p><span class="hot">🔥</span> ${media.popularity}</p>
  `;

  // Går till details för vald media när man klickar
  article.addEventListener("click", () => {
    renderMediaDetails(mediaData.id, media.type);
  });

  return article;
}

export { createMediaCard };
