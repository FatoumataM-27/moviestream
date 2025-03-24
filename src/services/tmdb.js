// API Key pour TMDB (The Movie Database)
const API_KEY = 'votre_api_key'; // Remplacez par votre clé API TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Fonction pour obtenir les films populaires
export const getPopularMovies = async (page = 1) => {
  try {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.results.map(movie => formatMovie(movie));
  } catch (error) {
    console.error('Erreur lors de la récupération des films populaires:', error);
    return [];
  }
};

// Fonction pour obtenir les détails d'un film
export const getMovieDetails = async (movieId) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits`;
    const response = await fetch(url);
    const data = await response.json();
    
    return formatMovieDetails(data);
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails du film ${movieId}:`, error);
    return null;
  }
};

// Fonction pour rechercher des films
export const searchMovies = async (query, page = 1) => {
  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.results.map(movie => formatMovie(movie));
  } catch (error) {
    console.error('Erreur lors de la recherche de films:', error);
    return [];
  }
};

// Fonction pour obtenir les recommandations de films
export const getMovieRecommendations = async (movieId) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=fr-FR`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.results.map(movie => formatMovie(movie));
  } catch (error) {
    console.error(`Erreur lors de la récupération des recommandations pour le film ${movieId}:`, error);
    return [];
  }
};

// Fonction pour obtenir les films par genre
export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=${genreId}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.results.map(movie => formatMovie(movie));
  } catch (error) {
    console.error(`Erreur lors de la récupération des films du genre ${genreId}:`, error);
    return [];
  }
};

// Fonction pour obtenir la liste des genres
export const getGenres = async () => {
  try {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data.genres;
  } catch (error) {
    console.error('Erreur lors de la récupération des genres:', error);
    return [];
  }
};

// Fonction utilitaire pour formater les données d'un film
const formatMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
    backdrop_path: movie.backdrop_path ? `${IMAGE_BASE_URL}/original${movie.backdrop_path}` : null,
    overview: movie.overview,
    release_date: movie.release_date ? movie.release_date.substring(0, 4) : 'N/A',
    vote_average: movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : 0,
    genre_ids: movie.genre_ids || []
  };
};

// Fonction utilitaire pour formater les détails d'un film
const formatMovieDetails = (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline || '',
    poster_path: movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
    backdrop_path: movie.backdrop_path ? `${IMAGE_BASE_URL}/original${movie.backdrop_path}` : null,
    overview: movie.overview,
    release_date: movie.release_date ? movie.release_date.substring(0, 4) : 'N/A',
    runtime: movie.runtime || 0,
    vote_average: movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : 0,
    genres: movie.genres || [],
    cast: movie.credits?.cast?.slice(0, 10).map(actor => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profile_path: actor.profile_path ? `${IMAGE_BASE_URL}/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'
    })) || []
  };
};
