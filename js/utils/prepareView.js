import { elements } from "./domElements.js";

export function prepareView() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  elements.main.innerHTML = "";
}
