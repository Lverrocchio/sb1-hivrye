export const firestoreRules = `
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
    
    function isValidUser() {
      return isAuthenticated() && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid));
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
      allow create: if isValidUser();
      allow update, delete: if isValidUser() && 
        resource.data.owner.id == request.auth.uid;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow read: if isValidUser() && (
        resource.data.userId == request.auth.uid ||
        resource.data.ownerId == request.auth.uid
      );
      allow create: if isValidUser();
      allow update: if isValidUser() && (
        resource.data.userId == request.auth.uid ||
        resource.data.ownerId == request.auth.uid
      );
    }
    
    // Messages collection
    match /messages/{messageId} {
      allow read: if isValidUser() && (
        resource.data.senderId == request.auth.uid ||
        resource.data.receiverId == request.auth.uid
      );
      allow create: if isValidUser();
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isValidUser();
      allow update, delete: if isValidUser() && 
        resource.data.userId == request.auth.uid;
    }
  }
}`;

export const storageRules = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isValidFileType(contentType) {
      return contentType.matches('image/.*') || 
             contentType.matches('application/pdf') ||
             contentType.matches('video/.*');
    }
    
    function isValidFileSize(size) {
      return size < 10 * 1024 * 1024; // 10MB
    }

    // Avatar images
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if isAuthenticated() && 
        request.auth.uid == userId &&
        isValidFileType(request.resource.contentType) &&
        isValidFileSize(request.resource.size);
    }
    
    // Item images and documents
    match /items/{itemId}/{allPaths=**} {
      allow read: if true;
      allow write: if isAuthenticated() &&
        isValidFileType(request.resource.contentType) &&
        isValidFileSize(request.resource.size);
    }
    
    // Documents
    match /documents/{userId}/{allPaths=**} {
      allow read: if isAuthenticated() &&
        request.auth.uid == userId;
      allow write: if isAuthenticated() &&
        request.auth.uid == userId &&
        isValidFileType(request.resource.contentType) &&
        isValidFileSize(request.resource.size);
    }
  }
}`;