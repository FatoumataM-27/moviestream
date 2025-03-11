import axios from 'axios'
import { BASE_URL, API_KEY } from '../config/api'

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'fr-FR'
  }
})

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get('/movie/popular', {
    params: { page }
  })
  return response.data
}

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`)
  return response.data
}

export const searchMovies = async (query, page = 1) => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query, page }
  })
  return response.data
}

export const getMovieVideos = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/videos`)
  return response.data
}
