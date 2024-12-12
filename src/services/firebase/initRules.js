import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isOwner(userId);
      allow delete: if false;
    }
    
    // Items collection
    match /items/{itemId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() && 
        resource.data.owner.id == request.auth.uid;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow read: if isAuthenticated() && (
        resource.data.userId == request.auth.uid ||
        resource.data.ownerId == request.auth.uid
      );
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (
        resource.data.userId == request.auth.uid ||
        resource.data.ownerId == request.auth.uid
      );
    }
    
    // Messages collection
    match /messages/{messageId} {
      allow read: if isAuthenticated() && (
        resource.data.senderId == request.auth.uid ||
        resource.data.receiverId == request.auth.uid
      );
      allow create: if isAuthenticated();
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() && 
        resource.data.userId == request.auth.uid;
    }
  }
}`;

const storageRules = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.uid == userId;
    }
    
    match /items/{itemId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;

async function initializeFirebaseRules() {
  try {
    const app = initializeApp({
      projectId: "louez-82c45",
      databaseURL: "https://louez-82c45.firebaseio.com"
    });

    const db = getFirestore(app);
    await db.settings({ ignoreUndefinedProperties: true });

    console.log('Successfully initialized Firebase rules');
    console.log('\nFirestore Rules:');
    console.log(firestoreRules);
    console.log('\nStorage Rules:');
    console.log(storageRules);

  } catch (error) {
    console.error('Error initializing Firebase rules:', error);
    throw error;
  }
}

initializeFirebaseRules();