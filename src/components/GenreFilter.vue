<template>
  <div class="genre-filter">
    <div class="genre-chips">
      <button
        v-for="genre in genres"
        :key="genre.id"
        class="genre-chip"
        :class="{ active: selectedGenres.includes(genre.id) }"
        @click="toggleGenre(genre.id)"
      >
        {{ genre.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadGenres } from '../services/genres'

const genres = ref([])
const selectedGenres = ref([])
const emit = defineEmits(['update:genres'])

onMounted(async () => {
  genres.value = await loadGenres()
})

function toggleGenre(genreId) {
  const index = selectedGenres.value.indexOf(genreId)
  if (index === -1) {
    selectedGenres.value.push(genreId)
  } else {
    selectedGenres.value.splice(index, 1)
  }
  emit('update:genres', selectedGenres.value)
}
</script>

<style scoped>
.genre-filter {
  margin: 20px 0;
  padding: 0 20px;
}

.genre-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.genre-chip {
  background: #fff;
  border: 1px solid #2c3e50;
  color: #2c3e50;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.genre-chip:hover {
  background: #eee;
}

.genre-chip.active {
  background: #2c3e50;
  color: white;
}
</style>
