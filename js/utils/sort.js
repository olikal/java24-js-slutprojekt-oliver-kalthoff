export function sortResults(results, method) {
  if (method === "default") return results;

  // Returnerar kopia av listan, sorterad beroende på användarens val
  return [...results].sort((a, b) => {
    const nameA = (a.title || a.name || "").toLowerCase();
    const nameB = (b.title || b.name || "").toLowerCase();
    // Sorterar först på popularity, annars på rating,
    // annars sorteras de som 0 för att slippa error
    const popA = a.popularity || a.vote_average || 0;
    const popB = b.popularity || b.vote_average || 0;

    switch (method) {
      case "az":
        return nameA.localeCompare(nameB);
      case "za":
        return nameB.localeCompare(nameA);
      case "popularity-asc":
        return popA - popB;
      case "popularity-desc":
        return popB - popA;
      default:
        return 0;
    }
  });
}
