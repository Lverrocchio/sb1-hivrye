import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';
import { app } from '../../config/firebase';

let persistenceInitialized = false;

export const initializePersistence = async () => {
  if (persistenceInitialized) {
    return;
  }

  const db = getFirestore(app);

  try {
    await enableIndexedDbPersistence(db);
    persistenceInitialized = true;
    console.log('Firestore persistence enabled');
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence enabled in first tab only');
    } else if (err.code === 'unimplemented') {
      console.warn('Browser doesn\'t support persistence');
    } else {
      console.error('Error enabling persistence:', err);
    }
  }
};