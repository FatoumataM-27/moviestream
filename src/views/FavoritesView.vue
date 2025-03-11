<template>
  <div class="favorites">
    <h1>Mes Films Favoris</h1>

    <div v-if="loading" class="loading">
      Chargement...
    </div>

    <div v-else-if="!movies.length" class="no-favorites">
      Vous n'avez pas encore de films favoris.
      <router-link to="/">Découvrir des films</router-link>
    </div>

    <div v-else class="movies-grid">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @click="goToMovie(movie.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { getMovieDetails } from '../services/tmdb'
import MovieCard from '../components/MovieCard.vue'

const router = useRouter()
const userStore = useUserStore()
const movies = ref([])
const loading = ref(true)

onMounted(async () => {
  if (!userStore.isAuthenticated) {
    router.push('/auth')
    return
  }

  try {
    const moviePromises = userStore.favorites.map(id => getMovieDetails(id))
    movies.value = await Promise.all(moviePromises)
  } catch (error) {
    console.error('Erreur lors du chargement des favoris:', error)
  } finally {
    loading.value = false
  }
})

function goToMovie(id) {
  router.push({ name: 'movie-details', params: { id } })
}
</script>

<style scoped>
.favorites {
  padding: 20px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.loading,
.no-favorites {
  text-align: center;
  padding: 40px;
  color: #666;
}

.no-favorites a {
  display: inline-block;
  margin-top: 10px;
  color: #2c3e50;
  text-decoration: none;
  padding: 8px 16px;
  border: 2px solid #2c3e50;
  border-radius: 4px;
}

h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}
</style>
