<template>
  <div class="movie-details" v-if="movie">
    <div class="backdrop" :style="{ backgroundImage: `url(${movie.backdrop_path})` }">
      <div class="overlay">
        <div class="container">
          <div class="movie-header">
            <div class="poster">
              <img :src="movie.poster_path" :alt="movie.title">
            </div>
            <div class="info">
              <h1>{{ movie.title }}</h1>
              <div class="meta">
                <span class="year">{{ movie.release_date }}</span>
                <span class="runtime">{{ movie.runtime }} min</span>
                <span class="rating">
                  <i class="fas fa-star"></i>
                  {{ movie.vote_average }}
                </span>
              </div>
              <div class="genres">
                <span v-for="genre in movie.genres" :key="genre.id" class="genre">
                  {{ genre.name }}
                </span>
              </div>
              <p class="tagline">{{ movie.tagline }}</p>
              <div class="actions">
                <button class="btn-favorite" @click="toggleFavorite">
                  <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
                  {{ isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
                </button>
                <button class="btn-watch">
                  <i class="fas fa-play"></i>
                  Regarder maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <section class="overview">
        <h2>Synopsis</h2>
        <p>{{ movie.overview }}</p>
      </section>

      <section class="cast">
        <h2>Distribution</h2>
        <div class="cast-list">
          <div v-for="actor in movie.cast" :key="actor.id" class="cast-item">
            <div class="cast-photo">
              <img :src="actor.profile_path" :alt="actor.name">
            </div>
            <div class="cast-info">
              <h3>{{ actor.name }}</h3>
              <p>{{ actor.character }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="similar">
        <h2>Films similaires</h2>
        <div class="movie-grid">
          <div v-for="similarMovie in movie.similar" :key="similarMovie.id" class="movie-card">
            <router-link :to="`/movie/${similarMovie.id}`">
              <div class="movie-poster">
                <img :src="similarMovie.poster_path" :alt="similarMovie.title">
              </div>
              <div class="movie-info">
                <h3>{{ similarMovie.title }}</h3>
                <div class="movie-meta">
                  <span class="rating">
                    <i class="fas fa-star"></i>
                    {{ similarMovie.vote_average }}
                  </span>
                  <span class="year">{{ similarMovie.release_date }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div v-else class="loading">
    <p>Chargement...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieDetails, getMovieRecommendations } from '../services/tmdb.js';

const route = useRoute();
const movie = ref(null);
const isFavorite = ref(false);

// Données fictives pour un film
const mockMovie = {
  id: 1,
  title: 'Inception',
  tagline: 'Le rêve est réel',
  poster_path: 'https://via.placeholder.com/300x450?text=Inception',
  backdrop_path: 'https://via.placeholder.com/1200x600?text=Inception+Backdrop',
  vote_average: 8.8,
  release_date: '2010',
  runtime: 148,
  overview: "Dom Cobb est un voleur expérimenté, le meilleur dans l'art dangereux de l'extraction, voler les secrets les plus intimes enfouis au plus profond du subconscient durant une phase de rêve, lorsque l'esprit est le plus vulnérable. Les capacités de Cobb ont fait de lui une cible recherchée dans le monde de l'espionnage industriel, mais elles ont aussi fait de lui un fugitif et lui ont coûté tout ce qu'il a jamais aimé.",
  genres: [
    { id: 28, name: 'Action' },
    { id: 878, name: 'Science-Fiction' },
    { id: 53, name: 'Thriller' }
  ],
  cast: [
    {
      id: 1,
      name: 'Leonardo DiCaprio',
      character: 'Dom Cobb',
      profile_path: 'https://via.placeholder.com/150x200?text=Leonardo+DiCaprio'
    },
    {
      id: 2,
      name: 'Joseph Gordon-Levitt',
      character: 'Arthur',
      profile_path: 'https://via.placeholder.com/150x200?text=Joseph+Gordon-Levitt'
    },
    {
      id: 3,
      name: 'Ellen Page',
      character: 'Ariadne',
      profile_path: 'https://via.placeholder.com/150x200?text=Ellen+Page'
    },
    {
      id: 4,
      name: 'Tom Hardy',
      character: 'Eames',
      profile_path: 'https://via.placeholder.com/150x200?text=Tom+Hardy'
    }
  ],
  similar: [
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
      title: 'Shutter Island',
      poster_path: 'https://via.placeholder.com/300x450?text=Shutter+Island',
      vote_average: 8.2,
      release_date: '2010'
    }
  ]
};

// Fonction pour basculer l'état des favoris
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  // Dans une application réelle, nous enverrions une requête à l'API pour mettre à jour les favoris
};

onMounted(async () => {
  try {
    // Récupérer l'ID du film depuis les paramètres de route
    const movieId = route.params.id;
    
    // Dans une application réelle, nous utiliserions ces fonctions pour obtenir les données
    // const movieData = await getMovieDetails(movieId);
    // const recommendations = await getMovieRecommendations(movieId);
    
    // Pour l'instant, nous utilisons les données fictives
    setTimeout(() => {
      movie.value = mockMovie;
    }, 500);
  } catch (error) {
    console.error('Erreur lors du chargement des détails du film:', error);
  }
});
</script>

<style scoped>
.movie-details {
  margin-bottom: 60px;
}

.backdrop {
  background-size: cover;
  background-position: center;
  position: relative;
  height: 500px;
}

.overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9));
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.movie-header {
  display: flex;
  color: white;
  gap: 30px;
}

.poster {
  flex-shrink: 0;
}

.poster img {
  width: 250px;
  height: 375px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.info {
  flex: 1;
}

.info h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.meta {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  font-size: 1rem;
}

.rating {
  color: #f5c518;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.genre {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.tagline {
  font-style: italic;
  margin-bottom: 30px;
  font-size: 1.2rem;
  opacity: 0.8;
}

.actions {
  display: flex;
  gap: 15px;
}

.actions button {
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
}

.btn-favorite {
  background-color: transparent;
  border: 1px solid white;
  color: white;
}

.btn-watch {
  background-color: #e50914;
  color: white;
}

section {
  margin: 50px 0;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.overview p {
  line-height: 1.6;
  font-size: 1.1rem;
  color: #444;
}

.cast-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.cast-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cast-photo img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.cast-info {
  padding: 15px;
}

.cast-info h3 {
  font-size: 1rem;
  margin-bottom: 5px;
}

.cast-info p {
  font-size: 0.9rem;
  color: #666;
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

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.2rem;
  color: #666;
}

@media (max-width: 768px) {
  .movie-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .poster {
    margin-bottom: 20px;
  }
  
  .genres {
    justify-content: center;
  }
  
  .actions {
    justify-content: center;
  }
  
  .backdrop {
    height: auto;
  }
  
  .overlay {
    padding: 40px 0;
  }
}
</style>
