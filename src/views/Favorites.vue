<template>
  <div class="favorites-page">
    <div class="container">
      <div class="favorites-header">
        <h1>Mes Films Favoris</h1>
        <p v-if="favorites.length > 0">Vous avez {{ favorites.length }} film(s) dans vos favoris</p>
      </div>

      <div v-if="loading" class="loading">
        <p>Chargement de vos favoris...</p>
      </div>

      <div v-else-if="favorites.length === 0" class="no-favorites">
        <div class="empty-state">
          <i class="far fa-heart empty-icon"></i>
          <h2>Vous n'avez pas encore de favoris</h2>
          <p>Explorez notre catalogue et ajoutez des films à vos favoris pour les retrouver ici</p>
          <router-link to="/" class="browse-button">
            Parcourir les films
          </router-link>
        </div>
      </div>

      <div v-else class="favorites-content">
        <div class="movie-grid">
          <div v-for="movie in favorites" :key="movie.id" class="movie-card">
            <div class="card-actions">
              <button class="remove-favorite" @click="removeFromFavorites(movie.id)">
                <i class="fas fa-times"></i>
              </button>
            </div>
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
                <div class="genres-list">
                  <span v-for="genreId in movie.genre_ids" :key="genreId" class="genre-tag">
                    {{ getGenreName(genreId) }}
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const favorites = ref([]);

// Données fictives pour les genres
const genres = [
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

// Données fictives pour les favoris
const mockFavorites = [
  {
    id: 1,
    title: 'Inception',
    poster_path: 'https://via.placeholder.com/300x450?text=Inception',
    vote_average: 8.8,
    release_date: '2010',
    genre_ids: [28, 878, 53]
  },
  {
    id: 3,
    title: 'Interstellar',
    poster_path: 'https://via.placeholder.com/300x450?text=Interstellar',
    vote_average: 8.6,
    release_date: '2014',
    genre_ids: [18, 878]
  },
  {
    id: 5,
    title: 'The Shawshank Redemption',
    poster_path: 'https://via.placeholder.com/300x450?text=Shawshank+Redemption',
    vote_average: 9.3,
    release_date: '1994',
    genre_ids: [18, 80]
  }
];

// Fonction pour obtenir le nom d'un genre à partir de son ID
const getGenreName = (genreId) => {
  const genre = genres.find(g => g.id === genreId);
  return genre ? genre.name : '';
};

// Fonction pour supprimer un film des favoris
const removeFromFavorites = (movieId) => {
  favorites.value = favorites.value.filter(movie => movie.id !== movieId);
  // Dans une application réelle, nous enverrions une requête à l'API pour mettre à jour les favoris
};

onMounted(() => {
  // Simuler le chargement des données depuis une API
  setTimeout(() => {
    favorites.value = mockFavorites;
    loading.value = false;
  }, 500);
});
</script>

<style scoped>
.favorites-page {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.favorites-header {
  margin-bottom: 30px;
}

.favorites-header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

.favorites-header p {
  color: #666;
  font-size: 1rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: #666;
}

.no-favorites {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

.empty-state {
  text-align: center;
  max-width: 500px;
}

.empty-icon {
  font-size: 4rem;
  color: #e0e0e0;
  margin-bottom: 20px;
}

.empty-state h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.empty-state p {
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
}

.browse-button {
  display: inline-block;
  background-color: #e50914;
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.browse-button:hover {
  background-color: #c30812;
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
  position: relative;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.card-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.remove-favorite {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-favorite:hover {
  background-color: rgba(229, 9, 20, 0.8);
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
  margin-bottom: 10px;
}

.rating {
  color: #f5c518;
}

.genres-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.genre-tag {
  background-color: #f0f0f0;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
