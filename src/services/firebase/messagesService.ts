import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Message } from '../../types';

const messagesCollection = collection(db, 'messages');

export const sendMessage = async (message: Omit<Message, 'id' | 'timestamp'>): Promise<Message> => {
  try {
    const messageData = {
      ...message,
      timestamp: new Date().toISOString(),
    };

    const docRef = await addDoc(messagesCollection, messageData);
    return { id: docRef.id, ...messageData } as Message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
};

export const getConversation = async (user1Id: string, user2Id: string): Promise<Message[]> => {
  try {
    const q = query(
      messagesCollection,
      where('senderId', 'in', [user1Id, user2Id]),
      where('receiverId', 'in', [user1Id, user2Id]),
      orderBy('timestamp', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw new Error('Failed to fetch conversation');
  }
};

export const getUserMessages = async (userId: string): Promise<Message[]> => {
  try {
    const q = query(
      messagesCollection,
      where('receiverId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
  } catch (error) {
    console.error('Error fetching user messages:', error);
    throw new Error('Failed to fetch user messages');
  }
};