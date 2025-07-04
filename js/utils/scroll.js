import { elements } from "./domElements.js";

// Döljer header när man scrollar ner, visar igen när man scrollar upp
export function handleHeaderScroll() {
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
      elements.header.classList.add("hide-header");
    } else {
      elements.header.classList.remove("hide-header");
    }

    lastScrollTop = Math.max(currentScroll, 0);
  });
}
