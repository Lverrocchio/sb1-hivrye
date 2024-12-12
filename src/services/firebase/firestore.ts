import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User, Item } from '../../types';

export const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return null;
    return { id: userId, ...userDoc.data() } as User;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getUserItems = async (userId: string): Promise<Item[]> => {
  try {
    const q = query(collection(db, 'items'), where('owner.id', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Item));
  } catch (error) {
    console.error('Error fetching user items:', error);
    throw error;
  }
};