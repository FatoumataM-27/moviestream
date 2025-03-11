<template>
  <div class="recommendations">
    <h1>Recommandations</h1>
    
    <div class="sections">
      <section v-if="personalizedMovies.length">
        <h2>Recommandations personnalisées</h2>
        <div class="movies-grid">
          <MovieCard
            v-for="movie in personalizedMovies"
            :key="movie.id"
            :movie="movie"
            @click="goToMovie(movie.id)"
          />
        </div>
      </section>

      <section v-if="similarMovies.length">
        <h2>Films similaires à vos favoris</h2>
        <div class="movies-grid">
          <MovieCard
            v-for="movie in similarMovies"
            :key="movie.id"
            :movie="movie"
            @click="goToMovie(movie.id)"
          />
        </div>
      </section>

      <section v-if="!userStore.isAuthenticated">
        <div class="auth-prompt">
          <p>Connectez-vous pour obtenir des recommandations personnalisées basées sur vos préférences !</p>
          <router-link to="/auth" class="auth-btn">Se connecter</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { getPersonalizedRecommendations, getSimilarMovies } from '../services/recommendations'
import MovieCard from '../components/MovieCard.vue'

const router = useRouter()
const userStore = useUserStore()

const personalizedMovies = ref([])
const similarMovies = ref([])

onMounted(async () => {
  if (userStore.isAuthenticated && userStore.favorites.length) {
    // Obtenir des recommandations basées sur les favoris
    personalizedMovies.value = await getPersonalizedRecommendations(userStore.favorites)
    
    // Obtenir des films similaires au dernier film favori
    const lastFavorite = userStore.favorites[userStore.favorites.length - 1]
    similarMovies.value = await getSimilarMovies(lastFavorite)
  } else {
    // Obtenir des recommandations générales
    personalizedMovies.value = await getPersonalizedRecommendations([])
  }
})

function goToMovie(id) {
  router.push({ name: 'movie-details', params: { id } })
}
</script>

<style scoped>
.recommendations {
  padding: 20px;
}

.sections {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

section h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.auth-prompt {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.auth-prompt p {
  margin-bottom: 20px;
  color: #666;
}

.auth-btn {
  display: inline-block;
  padding: 10px 20px;
  background: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.auth-btn:hover {
  background: #34495e;
}
</style>
