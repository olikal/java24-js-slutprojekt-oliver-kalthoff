import { API_BASE_URL, BEARER_KEY } from "../utils/config.js";

async function fetchMovies(endpoint) {
  const hasQueryParams = endpoint.includes('?');
  const separator = hasQueryParams ? '&' : '?';
  const url = `${API_BASE_URL}${endpoint}${separator}language=en`;

  try {
    const res = await fetch (url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_KEY}`,
      },
    });

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error(`Fetch failed: ${endpoint}`, error);
    return [];
  }
};

async function fetchDetails(endpoint) {
  const url = `${API_BASE_URL}${endpoint}?language=en`;

  try {
    const res = await fetch (url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_KEY}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Fetch failed: ${endpoint}`, error);
    return null;
  }
};

async function getHomepageContent() {
  const popularMovies = await getPopularMovies();
  const upcomingMovies = await getUpcomingMovies();
  const popularTV = await getPopularTV();

  return {
    popularMovies,
    upcomingMovies,
    popularTV
  };
}

async function getMovieTopList() {
  return await fetchMovies(`/movie/top_rated`)
}

async function getPopularMovies() {
  return await fetchMovies(`/trending/movie/week`);
}

async function getUpcomingMovies() {
  return await fetchMovies(`/movie/upcoming`);
}

async function getPopularTV() {
  const allShows = await fetchMovies(`/trending/tv/week`);

  // Exkluderar genrer: talkshows, dokumentärer och nyheter
  const excludedGenres = [10767, 99, 10763];

  return allShows.filter(show => {
    const genreIds = show.genre_ids || [];
    const hasExcludedGenre = genreIds.some(id => excludedGenres.includes(id));
    return !hasExcludedGenre;
  });
}

async function searchAll(input) {
  const query = encodeURIComponent(input);
  return await fetchMovies(`/search/multi?query=${query}`);
}

async function getMediaVideos(id, type = "movie") {
  return await fetchMovies(`/${type}/${id}/videos`);
}

export {fetchMovies, fetchDetails, getHomepageContent, getMovieTopList, getPopularMovies, getUpcomingMovies, getPopularTV, searchAll, getMediaVideos};