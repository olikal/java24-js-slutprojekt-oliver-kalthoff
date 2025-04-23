// Klass för att skapa objekt med formaterad data från API
class MediaItem {
  constructor({
    title,
    name,
    vote_average,
    first_air_date,
    media_type,
    poster_path,
    popularity,
  }) {
    this.title = title || name;
    this.rating = vote_average?.toFixed(1) || "N/A";
    this.type = media_type || (first_air_date ? "tv" : "movie");
    this.imageUrl = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : "./img/no-media.png";
    this.popularity = popularity?.toFixed(1) || "N/A";
  }
}

export { MediaItem };
