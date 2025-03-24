<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>Découvrez des milliers de films</h1>
        <p>Explorez notre catalogue, créez votre liste de favoris et recevez des recommandations personnalisées</p>
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Rechercher un film..." @keyup.enter="searchMovies">
          <button @click="searchMovies">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>

    <section class="popular-movies">
      <h2>Films populaires</h2>
      <div class="movie-grid">
        <div v-for="movie in popularMovies" :key="movie.id" class="movie-card">
          <router-link :to="`/movie/${movie.id}`">
            <div class="movie-poster">
              <img :src="movie.poster_path" :alt="movie.title">
            </div>
            <div class="movie-info">
              <h3>{{ movie.title }}</h3>
              <div class="movie-meta">
                <span class="rating">
                  <i class="fas fa-star"></i>
                  {{ movie.vote_average }}
                </span>
                <span class="year">{{ movie.release_date }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="genres">
      <h2>Explorer par genre</h2>
      <div class="genre-list">
        <button 
          v-for="genre in genres" 
          :key="genre.id" 
          class="genre-button"
          @click="filterByGenre(genre.id)"
        >
          {{ genre.name }}
        </button>
      </div>
    </section>

    <section class="recommendations" v-if="isLoggedIn">
      <h2>Recommandations pour vous</h2>
      <div class="movie-grid">
        <div v-for="movie in recommendedMovies" :key="movie.id" class="movie-card">
          <router-link :to="`/movie/${movie.id}`">
            <div class="movie-poster">
              <img :src="movie.poster_path" :alt="movie.title">
            </div>
            <div class="movie-info">
              <h3>{{ movie.title }}</h3>
              <div class="movie-meta">
                <span class="rating">
                  <i class="fas fa-star"></i>
                  {{ movie.vote_average }}
                </span>
                <span class="year">{{ movie.release_date }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
const popularMovies = ref([]);
const recommendedMovies = ref([]);
const genres = ref([]);
const isLoggedIn = ref(false); // Simuler l'état de connexion

// Données fictives pour les films populaires
const mockPopularMovies = [
  {
    id: 1,
    title: 'Inception',
    poster_path: 'https://via.placeholder.com/300x450?text=Inception',
    vote_average: 8.8,
    release_date: '2010'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster_path: 'https://via.placeholder.com/300x450?text=The+Dark+Knight',
    vote_average: 9.0,
    release_date: '2008'
  },
  {
    id: 3,
    title: 'Interstellar',
    poster_path: 'https://via.placeholder.com/300x450?text=Interstellar',
    vote_average: 8.6,
    release_date: '2014'
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    poster_path: 'https://via.placeholder.com/300x450?text=Pulp+Fiction',
    vote_average: 8.9,
    release_date: '1994'
  },
  {
    id: 5,
    title: 'The Shawshank Redemption',
    poster_path: 'https://via.placeholder.com/300x450?text=Shawshank+Redemption',
    vote_average: 9.3,
    release_date: '1994'
  },
  {
    id: 6,
    title: 'The Godfather',
    poster_path: 'https://via.placeholder.com/300x450?text=The+Godfather',
    vote_average: 9.2,
    release_date: '1972'
  }
];

// Données fictives pour les genres
const mockGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Aventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comédie' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drame' },
  { id: 14, name: 'Fantastique' },
  { id: 27, name: 'Horreur' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science-Fiction' }
];

// Fonction pour rechercher des films
const searchMovies = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } });
  }
};

// Fonction pour filtrer par genre
const filterByGenre = (genreId) => {
  router.push({ path: '/search', query: { genre: genreId } });
};

onMounted(() => {
  // Simuler le chargement des données depuis une API
  popularMovies.value = mockPopularMovies;
  genres.value = mockGenres;
  
  // Simuler des recommandations si l'utilisateur est connecté
  if (isLoggedIn.value) {
    recommendedMovies.value = mockPopularMovies.slice(0, 3);
  }
});
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://via.placeholder.com/1200x600?text=MovieStream+Background');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 20px;
  border-radius: 10px;
  margin-bottom: 40px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.search-bar {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
}

.search-bar input {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 30px 0 0 30px;
  font-size: 1rem;
}

.search-bar button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  font-size: 1rem;
}

section {
  margin-bottom: 60px;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.movie-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-poster img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.movie-info {
  padding: 15px;
}

.movie-info h3 {
  font-size: 1rem;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
}

.rating {
  color: #f5c518;
}

.genre-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.genre-button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.genre-button:hover {
  background-color: #e50914;
  color: white;
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero p {
    font-size: 1rem;
  }
}
</style>
