<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isMenuOpen = ref(false);
const isLoggedIn = ref(false); // Simuler l'état de connexion
const searchQuery = ref('');

// Déterminer si nous sommes sur une page d'authentification
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register';
});

// Fonction pour rechercher des films
const searchMovies = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } });
    searchQuery.value = '';
    isMenuOpen.value = false;
  }
};

// Fonction pour se déconnecter
const logout = () => {
  isLoggedIn.value = false;
  router.push('/');
};

// Fonction pour basculer le menu mobile
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <!-- Barre de navigation -->
  <header class="header" v-if="!isAuthPage">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">
            <span class="logo-text">MovieStream</span>
          </router-link>
        </div>
        
        <nav class="desktop-nav">
          <ul class="nav-links">
            <li><router-link to="/">Accueil</router-link></li>
            <li><router-link to="/search?genre=28">Action</router-link></li>
            <li><router-link to="/search?genre=35">Comédie</router-link></li>
            <li><router-link to="/search?genre=18">Drame</router-link></li>
            <li><router-link to="/search?genre=878">Sci-Fi</router-link></li>
          </ul>
        </nav>
        
        <div class="header-actions">
          <div class="search-form">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Rechercher un film..." 
              @keyup.enter="searchMovies"
            >
            <button @click="searchMovies">
              <i class="fas fa-search"></i>
            </button>
          </div>
          
          <div class="user-actions" v-if="isLoggedIn">
            <router-link to="/favorites" class="favorites-link">
              <i class="fas fa-heart"></i>
            </router-link>
            <div class="user-menu">
              <button class="user-avatar">
                <img src="https://via.placeholder.com/40x40" alt="Avatar">
              </button>
              <div class="dropdown-menu">
                <router-link to="/profile">Mon profil</router-link>
                <router-link to="/favorites">Mes favoris</router-link>
                <router-link to="/settings">Paramètres</router-link>
                <button @click="logout">Se déconnecter</button>
              </div>
            </div>
          </div>
          
          <div class="auth-buttons" v-else>
            <router-link to="/login" class="btn-login">Connexion</router-link>
            <router-link to="/register" class="btn-register">S'inscrire</router-link>
          </div>
          
          <button class="menu-toggle" @click="toggleMenu">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Menu mobile -->
    <div class="mobile-menu" :class="{ 'is-open': isMenuOpen }">
      <div class="mobile-search">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher un film..." 
          @keyup.enter="searchMovies"
        >
        <button @click="searchMovies">
          <i class="fas fa-search"></i>
        </button>
      </div>
      
      <nav class="mobile-nav">
        <ul class="nav-links">
          <li><router-link to="/" @click="isMenuOpen = false">Accueil</router-link></li>
          <li><router-link to="/search?genre=28" @click="isMenuOpen = false">Action</router-link></li>
          <li><router-link to="/search?genre=35" @click="isMenuOpen = false">Comédie</router-link></li>
          <li><router-link to="/search?genre=18" @click="isMenuOpen = false">Drame</router-link></li>
          <li><router-link to="/search?genre=878" @click="isMenuOpen = false">Sci-Fi</router-link></li>
        </ul>
      </nav>
      
      <div class="mobile-auth" v-if="!isLoggedIn">
        <router-link to="/login" class="btn-login" @click="isMenuOpen = false">Connexion</router-link>
        <router-link to="/register" class="btn-register" @click="isMenuOpen = false">S'inscrire</router-link>
      </div>
      
      <div class="mobile-user-actions" v-else>
        <router-link to="/favorites" @click="isMenuOpen = false">Mes favoris</router-link>
        <router-link to="/profile" @click="isMenuOpen = false">Mon profil</router-link>
        <router-link to="/settings" @click="isMenuOpen = false">Paramètres</router-link>
        <button @click="logout">Se déconnecter</button>
      </div>
    </div>
  </header>
  
  <!-- Contenu principal -->
  <main :class="{ 'auth-layout': isAuthPage }">
    <router-view />
  </main>
  
  <!-- Pied de page -->
  <footer class="footer" v-if="!isAuthPage">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <span class="logo-text">MovieStream</span>
          <p>Votre plateforme de streaming préférée</p>
        </div>
        
        <div class="footer-links">
          <div class="footer-section">
            <h3>Navigation</h3>
            <ul>
              <li><router-link to="/">Accueil</router-link></li>
              <li><router-link to="/search">Films</router-link></li>
              <li><router-link to="/favorites">Mes favoris</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Genres</h3>
            <ul>
              <li><router-link to="/search?genre=28">Action</router-link></li>
              <li><router-link to="/search?genre=35">Comédie</router-link></li>
              <li><router-link to="/search?genre=18">Drame</router-link></li>
              <li><router-link to="/search?genre=878">Sci-Fi</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>À propos</h3>
            <ul>
              <li><a href="#">À propos de nous</a></li>
              <li><a href="#">Conditions d'utilisation</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Nous contacter</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-social">
          <h3>Suivez-nous</h3>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 MovieStream. Tous droits réservés.</p>
        <p>Conçu par Fatoumata</p>
      </div>
    </div>
  </footer>
</template>

<style>
/* Réinitialisation et styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f8f8;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* En-tête et navigation */
.header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo a {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e50914;
}

.desktop-nav {
  display: none;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: block;
  }
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #e50914;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-form {
  display: none;
  position: relative;
}

@media (min-width: 768px) {
  .search-form {
    display: flex;
  }
}

.search-form input {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.9rem;
  width: 200px;
}

.search-form button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.favorites-link {
  color: #666;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.favorites-link:hover {
  color: #e50914;
}

.user-menu {
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: none;
  background: none;
  cursor: pointer;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-width: 180px;
  padding: 10px 0;
  display: none;
}

.user-menu:hover .dropdown-menu {
  display: block;
}

.dropdown-menu a,
.dropdown-menu button {
  display: block;
  padding: 8px 15px;
  color: #333;
  font-size: 0.9rem;
  text-align: left;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  background-color: #f5f5f5;
}

.auth-buttons {
  display: none;
}

@media (min-width: 768px) {
  .auth-buttons {
    display: flex;
    gap: 10px;
  }
}

.btn-login,
.btn-register {
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn-login {
  color: #e50914;
  border: 1px solid #e50914;
}

.btn-login:hover {
  background-color: rgba(229, 9, 20, 0.1);
}

.btn-register {
  background-color: #e50914;
  color: white;
}

.btn-register:hover {
  background-color: #c30812;
}

.menu-toggle {
  display: block;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
}

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }
}

/* Menu mobile */
.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: white;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  z-index: 99;
}

.mobile-menu.is-open {
  transform: translateX(0);
}

.mobile-search {
  position: relative;
  margin-bottom: 20px;
}

.mobile-search input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.mobile-search button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}

.mobile-nav .nav-links {
  flex-direction: column;
  gap: 0;
}

.mobile-nav .nav-links li {
  border-bottom: 1px solid #eee;
}

.mobile-nav .nav-links a {
  display: block;
  padding: 15px 0;
  font-size: 1.1rem;
}

.mobile-auth,
.mobile-user-actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-auth .btn-login,
.mobile-auth .btn-register {
  text-align: center;
  padding: 12px;
  font-size: 1rem;
}

.mobile-user-actions a,
.mobile-user-actions button {
  display: block;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 5px;
  text-align: center;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

/* Contenu principal */
main {
  min-height: calc(100vh - 70px - 300px); /* hauteur de l'écran - hauteur de l'en-tête - hauteur du pied de page */
  padding-bottom: 40px;
}

main.auth-layout {
  min-height: 100vh;
  padding: 0;
}

/* Pied de page */
.footer {
  background-color: #1a1a1a;
  color: #fff;
  padding: 50px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 2fr 1fr;
  }
}

.footer-logo .logo-text {
  font-size: 1.8rem;
  margin-bottom: 10px;
  display: block;
}

.footer-logo p {
  color: #aaa;
  font-size: 0.9rem;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.footer-section h3 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 15px;
  font-weight: 500;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #aaa;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #e50914;
}

.footer-social h3 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 15px;
  font-weight: 500;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #333;
  border-radius: 50%;
  color: #fff;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.social-icon:hover {
  background-color: #e50914;
}

.footer-bottom {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #333;
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
}

.footer-bottom p {
  margin-bottom: 5px;
}
</style>
