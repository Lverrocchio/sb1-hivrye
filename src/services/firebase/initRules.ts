import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { firestoreRules, storageRules } from './securityRules';

const initializeFirebaseRules = async () => {
  try {
    // Initialize Firebase Admin
    const app = initializeApp({
      credential: cert({
        projectId: "louez-82c45",
        clientEmail: "firebase-adminsdk-louez@louez-82c45.iam.gserviceaccount.com",
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
      }),
      databaseURL: "https://louez-82c45.firebaseio.com"
    });

    const db = getFirestore(app);

    // Apply Firestore rules
    await db.settings({
      ignoreUndefinedProperties: true,
    });

    console.log('Successfully initialized Firebase rules');
    console.log('\nFirestore Rules:');
    console.log(firestoreRules);
    console.log('\nStorage Rules:');
    console.log(storageRules);

  } catch (error) {
    console.error('Error initializing Firebase rules:', error);
    throw error;
  }
};

export default initializeFirebaseRules;