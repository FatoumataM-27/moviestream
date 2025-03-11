import { tmdbApi } from './tmdb'

let genres = []

export async function loadGenres() {
  if (genres.length) return genres
  
  const response = await tmdbApi.get('/genre/movie/list')
  genres = response.data.genres
  return genres
}

export function getGenreName(id) {
  const genre = genres.find(g => g.id === id)
  return genre ? genre.name : ''
}

export async function getMoviesByGenre(genreId, page = 1) {
  const response = await tmdbApi.get('/discover/movie', {
    params: {
      with_genres: genreId,
      page
    }
  })
  return response.data
}

export function getAllGenres() {
  return genres
}
