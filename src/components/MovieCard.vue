<template>
  <div class="movie-card" @click="$emit('click')">
    <div class="poster-container">
      <img 
        :src="posterUrl" 
        :alt="movie.title"
        class="poster"
        @error="handleImageError"
      />
      <div class="overlay">
        <div class="rating">
          <span class="star">★</span>
          {{ movie.vote_average.toFixed(1) }}
        </div>
        <button 
          v-if="userStore.isAuthenticated"
          class="favorite-btn"
          @click.stop="toggleFavorite"
          :class="{ active: isFavorite }"
        >
          <span class="heart">{{ isFavorite ? '♥' : '♡' }}</span>
        </button>
      </div>
    </div>
    <div class="info">
      <h3 class="title">{{ movie.title }}</h3>
      <p class="year">{{ releaseYear }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const userStore = useUserStore()

const posterUrl = computed(() => {
  return props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : '/placeholder.jpg'
})

const releaseYear = computed(() => {
  return props.movie.release_date
    ? new Date(props.movie.release_date).getFullYear()
    : 'Date inconnue'
})

const isFavorite = computed(() => {
  return userStore.favorites.includes(props.movie.id)
})

function handleImageError(e) {
  e.target.src = '/placeholder.jpg'
}

async function toggleFavorite() {
  try {
    await userStore.toggleFavorite(props.movie.id)
  } catch (error) {
    console.error('Error toggling favorite:', error)
  }
}
</script>

<style scoped>
.movie-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.poster-container {
  position: relative;
  padding-top: 150%;
  background: #f0f0f0;
}

.poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
}

.rating {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.star {
  color: #ffd700;
}

.favorite-btn {
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn.active {
  background: #ff4757;
}

.heart {
  font-size: 1.2rem;
  line-height: 1;
}

.info {
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #2c3e50;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.year {
  font-size: 0.9rem;
  color: #666;
  margin: 8px 0 0;
}
</style>
