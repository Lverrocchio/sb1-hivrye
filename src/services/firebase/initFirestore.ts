import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { app } from '../../config/firebase';

export const initializeFirestore = async () => {
  const db = getFirestore(app);

  try {
    await enableIndexedDbPersistence(db);
    console.log('Firestore offline persistence enabled');
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence enabled in first tab only');
    } else if (err.code === 'unimplemented') {
      console.warn('Browser doesn\'t support persistence');
    }
  }

  return db;
};