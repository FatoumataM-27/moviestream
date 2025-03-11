import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBejb_A_JNkdwmAOaQQ1pSddW4KUsQIF8E",
  authDomain: "streamingmovie-e0abf.firebaseapp.com",
  projectId: "streamingmovie-e0abf",
  storageBucket: "streamingmovie-e0abf.firebasestorage.app",
  messagingSenderId: "491517747760",
  appId: "1:491517747760:web:6046095d5f6e600e30c3f5",
  measurementId: "G-HNGFMBYDX4"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
