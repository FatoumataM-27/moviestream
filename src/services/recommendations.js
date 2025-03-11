import { tmdbApi } from './tmdb'

export async function getMovieRecommendations(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}/recommendations`)
  return response.data.results
}

export async function getSimilarMovies(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}/similar`)
  return response.data.results
}

export async function getPersonalizedRecommendations(favoriteMovies, page = 1) {
  // Si l'utilisateur n'a pas de favoris, retourner les films populaires
  if (!favoriteMovies.length) {
    const response = await tmdbApi.get('/movie/popular', { params: { page } })
    return response.data.results
  }

  // Obtenir les genres des films favoris
  const movieDetails = await Promise.all(
    favoriteMovies.map(id => tmdbApi.get(`/movie/${id}`))
  )
  
  const genreIds = new Set()
  movieDetails.forEach(response => {
    response.data.genres.forEach(genre => {
      genreIds.add(genre.id)
    })
  })

  // Utiliser ces genres pour obtenir des recommandations
  const response = await tmdbApi.get('/discover/movie', {
    params: {
      with_genres: Array.from(genreIds).join('|'),
      page,
      sort_by: 'popularity.desc'
    }
  })

  return response.data.results
}
