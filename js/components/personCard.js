import { getTypeIcon } from "../utils/typeIcon.js";
import { renderPersonDetails } from "../views/renderPersonDetails.js";

function createPersonCard(person, character = "") {
  const { name, department, popularity, personImageUrl, typeIcon } =
    extractPersonCardInfo(person);

  const article = document.createElement("article");
  article.classList.add("person-card");

  article.innerHTML = `
    <span class="media-type">${typeIcon}</span>
    <img src="${personImageUrl}" alt="${name}/>
    <div class="person-info">
      <h2>${name}</h2>
      ${character ? `<p class="character-name">as ${character}</p>` : ""}
      <p>${department}</p>
      <p>🔥${popularity}</p>
    </div>
  `;

  article.addEventListener("click", () => {
    renderPersonDetails(person.id);
  });

  return article;
}

function extractPersonCardInfo(person) {
  return {
    name: person.name,
    department: person.known_for_department || "N/A",
    popularity: person.popularity?.toFixed(1) || "N/A",
    personImageUrl: person.profile_path
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : "img/no-person.png",
    typeIcon: getTypeIcon("person"),
  };
}

export { createPersonCard };
