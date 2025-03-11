<template>
  <div class="movie-details">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>

    <template v-else-if="movie">
      <div 
        class="hero-section"
        :style="{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), 
                          url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
        }"
      >
        <div class="hero-content container">
          <div class="poster">
            <img 
              :src="posterUrl" 
              :alt="movie.title"
              @error="handleImageError"
            />
          </div>
          <div class="info">
            <h1>{{ movie.title }}</h1>
            <div class="meta">
              <span class="year">{{ releaseYear }}</span>
              <span class="duration" v-if="movie.runtime">
                {{ Math.floor(movie.runtime / 60) }}h {{ movie.runtime % 60 }}min
              </span>
              <span class="rating">
                <span class="star">★</span>
                {{ movie.vote_average.toFixed(1) }}
              </span>
            </div>
            <div class="genres">
              <span v-for="genre in movie.genres" :key="genre.id" class="genre-tag">
                {{ genre.name }}
              </span>
            </div>
            <p class="overview">{{ movie.overview }}</p>
            <div class="actions">
              <button 
                v-if="userStore.isAuthenticated"
                class="btn btn-primary favorite-btn"
                @click="toggleFavorite"
                :class="{ active: isFavorite }"
              >
                <span class="heart">{{ isFavorite ? '♥' : '♡' }}</span>
                {{ isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="content container">
        <section v-if="recommendations.length" class="recommendations">
          <h2>Films similaires</h2>
          <div class="movies-grid">
            <MovieCard
              v-for="movie in recommendations"
              :key="movie.id"
              :movie="movie"
              @click="goToMovie(movie.id)"
            />
          </div>
        </section>
      </div>
    </template>

    <div v-else class="error-container container">
      <h2>Film non trouvé</h2>
      <p>Désolé, nous n'avons pas pu trouver le film que vous cherchez.</p>
      <router-link to="/" class="btn btn-primary">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { getMovieDetails, getMovieRecommendations } from '../services/tmdb'
import MovieCard from '../components/MovieCard.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const movie = ref(null)
const recommendations = ref([])
const loading = ref(true)

const posterUrl = computed(() => {
  if (!movie.value?.poster_path) return '/placeholder.jpg'
  return `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`
})

const releaseYear = computed(() => {
  if (!movie.value?.release_date) return 'Date inconnue'
  return new Date(movie.value.release_date).getFullYear()
})

const isFavorite = computed(() => {
  return userStore.favorites.includes(Number(route.params.id))
})

async function fetchMovieData() {
  try {
    loading.value = true
    const [movieData, recommendationsData] = await Promise.all([
      getMovieDetails(route.params.id),
      getMovieRecommendations(route.params.id)
    ])
    
    movie.value = movieData
    recommendations.value = recommendationsData.slice(0, 6)
  } catch (error) {
    console.error('Error fetching movie:', error)
    movie.value = null
  } finally {
    loading.value = false
  }
}

function handleImageError(e) {
  e.target.src = '/placeholder.jpg'
}

async function toggleFavorite() {
  try {
    await userStore.toggleFavorite(Number(route.params.id))
  } catch (error) {
    console.error('Error toggling favorite:', error)
  }
}

function goToMovie(id) {
  if (id === Number(route.params.id)) return
  router.push({ name: 'movie-details', params: { id } })
}

onMounted(fetchMovieData)
</script>

<style scoped>
.movie-details {
  min-height: 100vh;
  background-color: var(--background-color);
}

.loading-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section {
  background-size: cover;
  background-position: center;
  color: white;
  padding: 4rem 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.poster {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.poster img {
  width: 100%;
  height: auto;
  display: block;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.meta {
  display: flex;
  gap: 1.5rem;
  font-size: 1.1rem;
  opacity: 0.9;
}

.star {
  color: #ffd700;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre-tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.overview {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 800px;
}

.actions {
  display: flex;
  gap: 1rem;
}

.favorite-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.favorite-btn.active {
  background: var(--accent-color);
}

.heart {
  font-size: 1.3rem;
}

.content {
  padding: 3rem 0;
}

.recommendations h2 {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.error-container {
  text-align: center;
  padding: 4rem 0;
}

.error-container h2 {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.error-container p {
  color: var(--text-light);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
  }

  .poster {
    max-width: 300px;
    margin: 0 auto;
  }

  .info h1 {
    font-size: 2rem;
  }

  .meta {
    font-size: 1rem;
  }

  .overview {
    font-size: 1rem;
  }
}
</style>
