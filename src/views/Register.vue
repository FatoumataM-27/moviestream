<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Créer un compte</h1>
          <p>Rejoignez MovieStream pour accéder à des milliers de films</p>
        </div>
        
        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Prénom</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="firstName" 
                placeholder="Votre prénom"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="lastName">Nom</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="lastName" 
                placeholder="Votre nom"
                required
              >
            </div>
          </div>
          
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
                placeholder="Créez un mot de passe"
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
            <div class="password-strength" v-if="password">
              <div class="strength-meter">
                <div 
                  class="strength-value" 
                  :style="{ width: passwordStrength + '%' }"
                  :class="strengthClass"
                ></div>
              </div>
              <span class="strength-text" :class="strengthClass">{{ strengthText }}</span>
            </div>
          </div>
          
          <div class="form-group terms">
            <input type="checkbox" id="terms" v-model="acceptTerms" required>
            <label for="terms">
              J'accepte les <a href="#">Conditions d'utilisation</a> et la <a href="#">Politique de confidentialité</a>
            </label>
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" class="auth-button" :disabled="loading || !acceptTerms">
            <span v-if="loading">Création en cours...</span>
            <span v-else>Créer mon compte</span>
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
          <p>Vous avez déjà un compte ? <router-link to="/login">Se connecter</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const acceptTerms = ref(false);
const loading = ref(false);
const error = ref('');

// Calcul de la force du mot de passe
const passwordStrength = computed(() => {
  if (!password.value) return 0;
  
  let strength = 0;
  
  // Longueur
  if (password.value.length >= 8) strength += 25;
  
  // Majuscules
  if (/[A-Z]/.test(password.value)) strength += 25;
  
  // Chiffres
  if (/[0-9]/.test(password.value)) strength += 25;
  
  // Caractères spéciaux
  if (/[^A-Za-z0-9]/.test(password.value)) strength += 25;
  
  return strength;
});

const strengthClass = computed(() => {
  if (passwordStrength.value <= 25) return 'weak';
  if (passwordStrength.value <= 50) return 'medium';
  if (passwordStrength.value <= 75) return 'good';
  return 'strong';
});

const strengthText = computed(() => {
  if (passwordStrength.value <= 25) return 'Faible';
  if (passwordStrength.value <= 50) return 'Moyen';
  if (passwordStrength.value <= 75) return 'Bon';
  return 'Fort';
});

const handleRegister = () => {
  loading.value = true;
  error.value = '';
  
  // Simuler une requête d'inscription
  setTimeout(() => {
    // Pour la démo, accepter n'importe quelles valeurs
    // Dans une application réelle, nous enverrions une requête à l'API
    if (firstName.value && lastName.value && email.value && password.value && acceptTerms.value) {
      // Simuler une inscription réussie
      router.push('/login');
    } else {
      error.value = 'Veuillez remplir tous les champs et accepter les conditions.';
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
  max-width: 500px;
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

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
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

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
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

.password-strength {
  margin-top: 10px;
}

.strength-meter {
  height: 5px;
  background-color: #eee;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-value {
  height: 100%;
  transition: width 0.3s ease;
}

.strength-value.weak {
  background-color: #f44336;
}

.strength-value.medium {
  background-color: #ff9800;
}

.strength-value.good {
  background-color: #4caf50;
}

.strength-value.strong {
  background-color: #2e7d32;
}

.strength-text {
  font-size: 0.8rem;
}

.strength-text.weak {
  color: #f44336;
}

.strength-text.medium {
  color: #ff9800;
}

.strength-text.good {
  color: #4caf50;
}

.strength-text.strong {
  color: #2e7d32;
}

.terms {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.terms input {
  margin-top: 3px;
}

.terms label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0;
}

.terms a {
  color: #e50914;
  text-decoration: none;
}

.terms a:hover {
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
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
