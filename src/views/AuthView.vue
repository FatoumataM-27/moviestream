<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>{{ isLogin ? 'Connexion' : 'Inscription' }}</h2>
        <p>{{ isLogin ? 'Bienvenue sur MovieStream' : 'Rejoignez MovieStream' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="!isLogin" class="form-group">
          <label for="username" class="form-label">Nom d'utilisateur</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-input"
            required
            autocomplete="username"
          >
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-input"
            required
            autocomplete="email"
          >
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            required
            autocomplete="current-password"
          >
        </div>

        <div v-if="error" class="error-message" role="alert">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading" class="loading-spinner"></span>
          <span v-else>{{ isLogin ? 'Se connecter' : "S'inscrire" }}</span>
        </button>
      </form>

      <div class="auth-footer">
        <p>
          {{ isLogin ? "Pas encore de compte ?" : "Déjà un compte ?" }}
          <button class="switch-btn" @click="toggleAuthMode">
            {{ isLogin ? "S'inscrire" : "Se connecter" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const isLogin = ref(true)
const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function toggleAuthMode() {
  isLogin.value = !isLogin.value
  error.value = ''
}

async function handleSubmit() {
  try {
    loading.value = true
    error.value = ''

    if (isLogin.value) {
      await userStore.login(email.value, password.value)
    } else {
      await userStore.register(email.value, password.value, username.value)
    }

    router.push('/')
  } catch (e) {
    error.value = translateError(e.message)
  } finally {
    loading.value = false
  }
}

function translateError(errorMessage) {
  const errorMap = {
    'auth/email-already-in-use': 'Cet email est déjà utilisé',
    'auth/invalid-email': 'Email invalide',
    'auth/operation-not-allowed': 'Opération non autorisée',
    'auth/weak-password': 'Le mot de passe est trop faible',
    'auth/user-disabled': 'Ce compte a été désactivé',
    'auth/user-not-found': 'Aucun compte ne correspond à cet email',
    'auth/wrong-password': 'Mot de passe incorrect',
    'auth/too-many-requests': 'Trop de tentatives, veuillez réessayer plus tard'
  }

  return errorMap[errorMessage] || 'Une erreur est survenue'
}
</script>

<style scoped>
.auth-container {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px var(--shadow-color);
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.5s ease-out;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h2 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: var(--text-light);
}

.auth-form {
  margin-bottom: 1.5rem;
}

.auth-footer {
  text-align: center;
  color: var(--text-light);
}

.switch-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
}

.switch-btn:hover {
  text-decoration: underline;
}

.btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 48px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .auth-container {
    padding: 1rem;
  }

  .auth-card {
    padding: 1.5rem;
  }

  .auth-header h2 {
    font-size: 1.5rem;
  }
}
</style>
