import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Import des vues
import Home from './views/Home.vue'
import MovieDetails from './views/MovieDetails.vue'
import Search from './views/Search.vue'
import Favorites from './views/Favorites.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

// Configuration des routes
const routes = [
  { path: '/', component: Home },
  { path: '/movie/:id', component: MovieDetails },
  { path: '/search', component: Search },
  { path: '/favorites', component: Favorites },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Création de l'application
const app = createApp(App)

// Utilisation des plugins
app.use(createPinia())
app.use(router)

app.mount('#app')
