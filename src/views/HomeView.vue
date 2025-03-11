<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>Découvrez des films exceptionnels</h1>
        <p>Explorez notre collection de films, créez votre liste de favoris et obtenez des recommandations personnalisées</p>
      </div>
    </div>

    <div class="content">
      <section class="movies-section">
        <div class="section-header">
          <h2>Films populaires</h2>
          <GenreFilter v-model:genres="selectedGenres" />
        </div>

        <div class="movies-grid">
          <MovieCard
            v-for="movie in filteredMovies"
            :key="movie.id"
            :movie="movie"
            @click="goToMovie(movie.id)"
          />
        </div>

        <div class="pagination" v-if="totalPages > 1">
          <button 
            class="page-btn"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            ←
          </button>
          <span class="page-info">Page {{ currentPage }} sur {{ totalPages }}</span>
          <button 
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            →
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import MovieCard from '../components/MovieCard.vue'
import GenreFilter from '../components/GenreFilter.vue'
import { getPopularMovies } from '../services/tmdb'
import { loadGenres, getGenreName } from '../services/genres'

const router = useRouter()
const movies = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const selectedGenres = ref([])
const loading = ref(true)

const filteredMovies = computed(() => {
  if (!selectedGenres.value.length) return movies.value
  
  return movies.value.filter(movie => 
    movie.genre_ids.some(id => selectedGenres.value.includes(id))
  )
})

async function fetchMovies(page = 1) {
  try {
    loading.value = true
    const data = await getPopularMovies(page)
    movies.value = data.results
    totalPages.value = Math.min(data.total_pages, 500)
    currentPage.value = page
  } catch (error) {
    console.error('Error fetching movies:', error)
  } finally {
    loading.value = false
  }
}

function goToMovie(id) {
  router.push({ name: 'movie-details', params: { id } })
}

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetchMovies(page)
  }
}

onMounted(async () => {
  await Promise.all([
    fetchMovies(),
    loadGenres()
  ])
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('/hero-bg.jpg') center/cover no-repeat;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.hero-content {
  max-width: 800px;
  padding: 0 20px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.page-btn {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: #34495e;
}

.page-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.page-info {
  color: #2c3e50;
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>
