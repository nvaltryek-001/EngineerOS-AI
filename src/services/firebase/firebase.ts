import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Values come from VITE_FIREBASE_* env vars (see .env.example).
// The fallbacks are this project's public Firebase *web* config, which is safe to ship;
// restrict the API key to your domains in Google Cloud Console.
const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyB7SN-EzCSR0Fxo5AX7_kytvhE_YpQFj3A",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "engineeros-ai.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "engineeros-ai",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "engineeros-ai.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "816875598066",
  appId: env.VITE_FIREBASE_APP_ID || "1:816875598066:web:a2f83773cb74090571206b",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-Z31YB8L7DL",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export let analytics: any = null;
isSupported().then((supported) => {
  if (supported) {
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      console.warn("Failed to initialize Firebase Analytics", e);
    }
  }
});
