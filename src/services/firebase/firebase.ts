import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB7SN-EzCSR0Fxo5AX7_kytvhE_YpQFj3A",
  authDomain: "engineeros-ai.firebaseapp.com",
  projectId: "engineeros-ai",
  storageBucket: "engineeros-ai.firebasestorage.app",
  messagingSenderId: "816875598066",
  appId: "1:816875598066:web:a2f83773cb74090571206b",
  measurementId: "G-Z31YB8L7DL",
};

console.log("Firebase config loaded:", firebaseConfig);

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
