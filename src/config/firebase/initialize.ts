import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAxuuN3LgKTgL209BC8T_nF9gEhE2HgMUk",
  authDomain: "louez-82c45.firebaseapp.com",
  projectId: "louez-82c45",
  storageBucket: "louez-82c45.firebasestorage.app",
  messagingSenderId: "407191901460",
  appId: "1:407191901460:web:05a54df968c83f86195e01",
  measurementId: "G-36MHTZPB98"
};

export const initializeFirebase = async () => {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    // Initialize Auth with persistence
    const auth = getAuth(app);
    await setPersistence(auth, browserLocalPersistence);
    
    // Initialize Firestore with offline persistence
    const db = getFirestore(app);
    try {
      await enableIndexedDbPersistence(db);
    } catch (err) {
      console.warn('Firebase persistence error:', err);
    }
    
    // Initialize Storage
    const storage = getStorage(app);
    
    return { app, auth, db, storage };
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};