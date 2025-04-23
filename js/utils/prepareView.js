import { elements } from "./domElements.js";

// Rensar innehållet på sidan och scrollar högst upp
export function prepareView() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  elements.main.innerHTML = "";
}
