import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { 
  doc, 
  setDoc, 
  getDoc,
  arrayUnion,
  arrayRemove,
  updateDoc
} from 'firebase/firestore'
import { auth, db } from '../config/firebase'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const favorites = ref([])
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  async function initialize() {
    auth.onAuthStateChanged(async (userData) => {
      if (userData) {
        user.value = {
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName
        }
        await loadFavorites()
      } else {
        user.value = null
        favorites.value = []
      }
    })
  }

  async function register(email, password, displayName) {
    try {
      loading.value = true
      error.value = null
      const { user: userData } = await createUserWithEmailAndPassword(auth, email, password)
      
      // Mettre à jour le profil avec le nom d'utilisateur
      await updateProfile(userData, { displayName })
      
      // Créer le document utilisateur dans Firestore
      await setDoc(doc(db, 'users', userData.uid), {
        email,
        displayName,
        favorites: []
      })
      
      user.value = {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName
      }
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function login(email, password) {
    try {
      loading.value = true
      error.value = null
      const { user: userData } = await signInWithEmailAndPassword(auth, email, password)
      user.value = {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName
      }
      await loadFavorites()
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      loading.value = true
      error.value = null
      await signOut(auth)
      user.value = null
      favorites.value = []
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function loadFavorites() {
    if (!user.value) return
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.value.uid))
      if (userDoc.exists()) {
        favorites.value = userDoc.data().favorites || []
      }
    } catch (e) {
      console.error('Error loading favorites:', e)
    }
  }

  async function toggleFavorite(movieId) {
    if (!user.value) return

    const userRef = doc(db, 'users', user.value.uid)
    
    try {
      if (favorites.value.includes(movieId)) {
        await updateDoc(userRef, {
          favorites: arrayRemove(movieId)
        })
        favorites.value = favorites.value.filter(id => id !== movieId)
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(movieId)
        })
        favorites.value.push(movieId)
      }
    } catch (e) {
      console.error('Error updating favorites:', e)
      throw e
    }
  }

  return {
    user,
    favorites,
    loading,
    error,
    isAuthenticated,
    initialize,
    register,
    login,
    logout,
    toggleFavorite
  }
})
