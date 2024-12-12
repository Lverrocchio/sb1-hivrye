import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

// Enable offline persistence
try {
  enableIndexedDbPersistence(db);
} catch (err) {
  console.warn('Firebase persistence error:', err);
}

export { db };