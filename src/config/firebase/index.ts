import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };