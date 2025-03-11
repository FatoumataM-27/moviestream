<template>
  <div class="search">
    <div class="search-bar">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Rechercher un film..."
        type="text"
      >
    </div>

    <div v-if="loading" class="loading">
      Chargement...
    </div>

    <div v-else-if="movies.length" class="movies-grid">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @click="goToMovie(movie.id)"
      />
    </div>

    <div v-else-if="searchQuery" class="no-results">
      Aucun résultat trouvé pour "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { searchMovies } from '../services/tmdb'
import MovieCard from '../components/MovieCard.vue'

const router = useRouter()
const searchQuery = ref('')
const movies = ref([])
const loading = ref(false)

const search = async () => {
  if (!searchQuery.value.trim()) {
    movies.value = []
    return
  }

  loading.value = true
  try {
    const data = await searchMovies(searchQuery.value)
    movies.value = data.results
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = useDebounceFn(search, 300)

const goToMovie = (id) => {
  router.push({ name: 'movie-details', params: { id } })
}
</script>

<style scoped>
.search {
  padding: 20px;
}

.search-bar {
  max-width: 600px;
  margin: 0 auto 40px;
}

.search-bar input {
  width: 100%;
  padding: 12px 20px;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.search-bar input:focus {
  border-color: #2c3e50;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.loading,
.no-results {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
}
</style>
