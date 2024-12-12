import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';
import { withRetry } from './retryHandler';
import { User } from '../../types';
import { toast } from 'react-hot-toast';

export const createUserDocument = async (
  userId: string,
  userData: Partial<User>,
  avatarFile?: File
) => {
  try {
    let avatarUrl = userData.avatar;

    if (avatarFile) {
      const avatarRef = ref(storage, `avatars/${userId}`);
      await withRetry(async () => {
        await uploadBytes(avatarRef, avatarFile);
        avatarUrl = await getDownloadURL(avatarRef);
      });
    }

    const userProfile = {
      id: userId,
      ...userData,
      avatar: avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || '')}`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      emailVerified: false,
      rating: 0,
      reviews: 0,
    };

    await withRetry(async () => {
      await setDoc(doc(db, 'users', userId), userProfile);
    });

    return userProfile as User;
  } catch (error) {
    console.error('Error creating user document:', error);
    toast.error('Erreur lors de la création du profil utilisateur');
    throw error;
  }
};

export const getUserDocument = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await withRetry(async () => {
      const doc = await getDoc(doc(db, 'users', userId));
      if (!doc.exists()) return null;
      return { id: userId, ...doc.data() } as User;
    });
    
    return userDoc;
  } catch (error) {
    console.error('Error fetching user document:', error);
    toast.error('Erreur lors de la récupération du profil utilisateur');
    throw error;
  }
};