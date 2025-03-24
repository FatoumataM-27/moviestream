<template>
  <div class="search-page">
    <div class="container">
      <div class="search-header">
        <h1>Résultats de recherche</h1>
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Rechercher un film..." @keyup.enter="performSearch">
          <button @click="performSearch">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Genre</label>
          <select v-model="selectedGenre" @change="applyFilters">
            <option value="">Tous les genres</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Année</label>
          <select v-model="selectedYear" @change="applyFilters">
            <option value="">Toutes les années</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Tri</label>
          <select v-model="sortBy" @change="applyFilters">
            <option value="popularity">Popularité</option>
            <option value="release_date">Date de sortie</option>
            <option value="vote_average">Note</option>
            <option value="title">Titre</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="loading">
        <p>Chargement des résultats...</p>
      </div>

      <div v-else-if="searchResults.length === 0" class="no-results">
        <p>Aucun résultat trouvé pour "{{ searchQuery }}"</p>
        <p>Essayez avec d'autres mots-clés ou filtres</p>
      </div>

      <div v-else class="search-results">
        <div class="movie-grid">
          <div v-for="movie in searchResults" :key="movie.id" class="movie-card">
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

        <div class="pagination">
          <button 
            :disabled="currentPage === 1" 
            @click="changePage(currentPage - 1)"
            class="pagination-button"
          >
            <i class="fas fa-chevron-left"></i> Précédent
          </button>
          <span class="page-info">Page {{ currentPage }} sur {{ totalPages }}</span>
          <button 
            :disabled="currentPage === totalPages" 
            @click="changePage(currentPage + 1)"
            class="pagination-button"
          >
            Suivant <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const searchQuery = ref('');
const selectedGenre = ref('');
const selectedYear = ref('');
const sortBy = ref('popularity');
const currentPage = ref(1);
const totalPages = ref(1);
const loading = ref(true);
const searchResults = ref([]);

// Données fictives pour les genres
const genres = ref([
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
]);

// Années pour le filtre
const years = computed(() => {
  const currentYear = new Date().getFullYear();
  const yearsList = [];
  for (let i = currentYear; i >= 1970; i--) {
    yearsList.push(i);
  }
  return yearsList;
});

// Données fictives pour les résultats de recherche
const mockSearchResults = [
  {
    id: 1,
    title: 'Inception',
    poster_path: 'https://via.placeholder.com/300x450?text=Inception',
    vote_average: 8.8,
    release_date: '2010',
    genre_ids: [28, 878, 53]
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster_path: 'https://via.placeholder.com/300x450?text=The+Dark+Knight',
    vote_average: 9.0,
    release_date: '2008',
    genre_ids: [28, 80, 18]
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
    id: 4,
    title: 'Pulp Fiction',
    poster_path: 'https://via.placeholder.com/300x450?text=Pulp+Fiction',
    vote_average: 8.9,
    release_date: '1994',
    genre_ids: [80, 53]
  },
  {
    id: 5,
    title: 'The Shawshank Redemption',
    poster_path: 'https://via.placeholder.com/300x450?text=Shawshank+Redemption',
    vote_average: 9.3,
    release_date: '1994',
    genre_ids: [18, 80]
  },
  {
    id: 6,
    title: 'The Godfather',
    poster_path: 'https://via.placeholder.com/300x450?text=The+Godfather',
    vote_average: 9.2,
    release_date: '1972',
    genre_ids: [18, 80]
  },
  {
    id: 7,
    title: 'The Matrix',
    poster_path: 'https://via.placeholder.com/300x450?text=The+Matrix',
    vote_average: 8.7,
    release_date: '1999',
    genre_ids: [28, 878]
  },
  {
    id: 8,
    title: 'Fight Club',
    poster_path: 'https://via.placeholder.com/300x450?text=Fight+Club',
    vote_average: 8.8,
    release_date: '1999',
    genre_ids: [18, 53]
  }
];

// Fonction pour obtenir le nom d'un genre à partir de son ID
const getGenreName = (genreId) => {
  const genre = genres.value.find(g => g.id === genreId);
  return genre ? genre.name : '';
};

// Fonction pour effectuer la recherche
const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: {
        q: searchQuery.value,
        genre: selectedGenre.value,
        year: selectedYear.value,
        sort: sortBy.value,
        page: 1
      }
    });
  }
};

// Fonction pour appliquer les filtres
const applyFilters = () => {
  router.push({
    path: '/search',
    query: {
      q: searchQuery.value,
      genre: selectedGenre.value,
      year: selectedYear.value,
      sort: sortBy.value,
      page: 1
    }
  });
};

// Fonction pour changer de page
const changePage = (page) => {
  router.push({
    path: '/search',
    query: {
      ...route.query,
      page
    }
  });
};

// Fonction pour simuler une recherche avec les paramètres actuels
const simulateSearch = () => {
  loading.value = true;
  
  // Simuler un délai de chargement
  setTimeout(() => {
    // Filtrer les résultats en fonction des paramètres
    let results = [...mockSearchResults];
    
    // Filtre par requête de recherche
    if (searchQuery.value) {
      results = results.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    
    // Filtre par genre
    if (selectedGenre.value) {
      results = results.filter(movie => 
        movie.genre_ids.includes(Number(selectedGenre.value))
      );
    }
    
    // Filtre par année
    if (selectedYear.value) {
      results = results.filter(movie => 
        movie.release_date.includes(selectedYear.value)
      );
    }
    
    // Tri des résultats
    if (sortBy.value === 'title') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy.value === 'release_date') {
      results.sort((a, b) => b.release_date.localeCompare(a.release_date));
    } else if (sortBy.value === 'vote_average') {
      results.sort((a, b) => b.vote_average - a.vote_average);
    }
    
    // Pagination (simulée)
    totalPages.value = Math.ceil(results.length / 6) || 1;
    const startIndex = (currentPage.value - 1) * 6;
    searchResults.value = results.slice(startIndex, startIndex + 6);
    
    loading.value = false;
  }, 500);
};

// Surveiller les changements dans les paramètres de l'URL
watch(() => route.query, (newQuery) => {
  searchQuery.value = newQuery.q || '';
  selectedGenre.value = newQuery.genre || '';
  selectedYear.value = newQuery.year || '';
  sortBy.value = newQuery.sort || 'popularity';
  currentPage.value = Number(newQuery.page) || 1;
  
  simulateSearch();
}, { immediate: true });

onMounted(() => {
  // Initialiser les paramètres à partir de l'URL
  searchQuery.value = route.query.q || '';
  selectedGenre.value = route.query.genre || '';
  selectedYear.value = route.query.year || '';
  sortBy.value = route.query.sort || 'popularity';
  currentPage.value = Number(route.query.page) || 1;
  
  simulateSearch();
});
</script>

<style scoped>
.search-page {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.search-header {
  margin-bottom: 30px;
}

.search-header h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.search-bar {
  display: flex;
  max-width: 600px;
}

.search-bar input {
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #ddd;
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

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 0.9rem;
  color: #666;
}

.filter-group select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 150px;
}

.loading, .no-results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.pagination-button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  background-color: #e0e0e0;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 15px;
  }
  
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
