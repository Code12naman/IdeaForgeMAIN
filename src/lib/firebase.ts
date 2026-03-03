import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8iw5eqffSvbi5cEtgGI7bYbhSpRa6Inw",
  authDomain: "studio-4552662282-caebf.firebaseapp.com",
  projectId: "studio-4552662282-caebf",
  storageBucket: "studio-4552662282-caebf.firebasestorage.app",
  messagingSenderId: "391990464476",
  appId: "1:391990464476:web:e922f9a7a5fcfdd082c919"
};

// Initialize Firebase (avoid double-initialization during HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export commonly used services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
