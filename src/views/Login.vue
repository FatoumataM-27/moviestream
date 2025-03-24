<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Connexion</h1>
          <p>Connectez-vous pour accéder à votre compte MovieStream</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              placeholder="Votre adresse email"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                placeholder="Votre mot de passe"
                required
              >
              <button 
                type="button" 
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          
          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember" v-model="rememberMe">
              <label for="remember">Se souvenir de moi</label>
            </div>
            <a href="#" class="forgot-password">Mot de passe oublié ?</a>
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" class="auth-button" :disabled="loading">
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>
        </form>
        
        <div class="auth-divider">
          <span>ou</span>
        </div>
        
        <div class="social-login">
          <button class="social-button google">
            <i class="fab fa-google"></i>
            Continuer avec Google
          </button>
          <button class="social-button facebook">
            <i class="fab fa-facebook-f"></i>
            Continuer avec Facebook
          </button>
        </div>
        
        <div class="auth-footer">
          <p>Vous n'avez pas de compte ? <router-link to="/register">Créer un compte</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');

const handleLogin = () => {
  loading.value = true;
  error.value = '';
  
  // Simuler une requête d'authentification
  setTimeout(() => {
    // Pour la démo, accepter n'importe quel email/mot de passe
    // Dans une application réelle, nous enverrions une requête à l'API
    if (email.value && password.value) {
      // Simuler une connexion réussie
      router.push('/');
    } else {
      error.value = 'Veuillez remplir tous les champs.';
    }
    loading.value = false;
  }, 1000);
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f8f8f8;
}

.auth-container {
  width: 100%;
  max-width: 450px;
}

.auth-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
}

.auth-header p {
  color: #666;
  font-size: 0.95rem;
}

.auth-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #e50914;
  outline: none;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
}

.forgot-password {
  color: #e50914;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.auth-button {
  width: 100%;
  padding: 12px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.auth-button:hover {
  background-color: #c30812;
}

.auth-button:disabled {
  background-color: #e57373;
  cursor: not-allowed;
}

.auth-divider {
  display: flex;
  align-items: center;
  margin: 25px 0;
}

.auth-divider::before,
.auth-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: #ddd;
}

.auth-divider span {
  padding: 0 15px;
  color: #777;
  font-size: 0.9rem;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.social-button.google:hover {
  background-color: #f5f5f5;
}

.social-button.facebook {
  background-color: #1877f2;
  color: white;
  border: none;
}

.social-button.facebook:hover {
  background-color: #166fe5;
}

.auth-footer {
  text-align: center;
  font-size: 0.95rem;
  color: #666;
}

.auth-footer a {
  color: #e50914;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 30px 20px;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>
