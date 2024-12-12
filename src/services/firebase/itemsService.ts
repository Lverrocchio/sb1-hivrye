import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { Item, Property } from '../../types';

export const itemsCollection = collection(db, 'items');
export const propertiesCollection = collection(db, 'properties');

export const addItem = async (item: Omit<Item, 'id'>, images: File[]): Promise<Item> => {
  try {
    // Upload images first
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageRef = ref(storage, `items/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        return getDownloadURL(imageRef);
      })
    );

    const itemData = {
      ...item,
      imageUrl: imageUrls[0], // Main image
      images: imageUrls,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(itemsCollection, itemData);
    return { id: docRef.id, ...itemData } as Item;
  } catch (error) {
    console.error('Error adding item:', error);
    throw new Error('Failed to add item');
  }
};

export const updateItem = async (itemId: string, updates: Partial<Item>): Promise<void> => {
  try {
    const itemRef = doc(db, 'items', itemId);
    const itemDoc = await getDoc(itemRef);
    
    if (!itemDoc.exists()) {
      throw new Error('Item not found');
    }

    await updateDoc(itemRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('Failed to update item');
  }
};

export const deleteItem = async (itemId: string): Promise<void> => {
  try {
    const itemRef = doc(db, 'items', itemId);
    const itemDoc = await getDoc(itemRef);
    
    if (!itemDoc.exists()) {
      throw new Error('Item not found');
    }

    await deleteDoc(itemRef);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw new Error('Failed to delete item');
  }
};

export const getItemsByUser = async (userId: string): Promise<Item[]> => {
  try {
    const q = query(itemsCollection, where('owner.id', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Item));
  } catch (error) {
    console.error('Error fetching user items:', error);
    throw new Error('Failed to fetch user items');
  }
};

export const getItemById = async (itemId: string): Promise<Item | null> => {
  try {
    const docRef = doc(db, 'items', itemId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as Item;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw new Error('Failed to fetch item');
  }
};