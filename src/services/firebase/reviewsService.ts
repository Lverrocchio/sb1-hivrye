import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Review {
  id: string;
  itemId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const reviewsCollection = collection(db, 'reviews');

export const addReview = async (review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
  try {
    const reviewData = {
      ...review,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(reviewsCollection, reviewData);
    return { id: docRef.id, ...reviewData };
  } catch (error) {
    console.error('Error adding review:', error);
    throw new Error('Failed to add review');
  }
};

export const getItemReviews = async (itemId: string): Promise<Review[]> => {
  try {
    const q = query(
      reviewsCollection,
      where('itemId', '==', itemId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Review));
  } catch (error) {
    console.error('Error fetching item reviews:', error);
    throw new Error('Failed to fetch item reviews');
  }
};

export const getUserReviews = async (userId: string): Promise<Review[]> => {
  try {
    const q = query(
      reviewsCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Review));
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    throw new Error('Failed to fetch user reviews');
  }
};