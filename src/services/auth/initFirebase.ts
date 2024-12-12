import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const initializeFirebase = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAxuuN3LgKTgL209BC8T_nF9gEhE2HgMUk",
    authDomain: "louez-82c45.firebaseapp.com",
    projectId: "louez-82c45",
    storageBucket: "louez-82c45.firebasestorage.app",
    messagingSenderId: "407191901460",
    appId: "1:407191901460:web:05a54df968c83f86195e01",
    measurementId: "G-36MHTZPB98"
  };

  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    // Initialize Auth with persistence
    const auth = getAuth(app);
    await setPersistence(auth, browserLocalPersistence);
    
    // Initialize other services
    const db = getFirestore(app);
    const storage = getStorage(app);
    
    // Initialize Analytics only in production and browser environment
    let analytics = null;
    if (typeof window !== 'undefined') {
      const supported = await isSupported();
      if (supported) {
        analytics = getAnalytics(app);
      }
    }

    return { app, auth, db, storage, analytics };
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};

export default initializeFirebase;