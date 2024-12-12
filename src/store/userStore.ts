import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, Message, Booking } from '../types';

interface UserState {
  stats: {
    activeListings: number;
    averageRating: number;
    activeBookings: number;
    totalEarnings: number;
  };
  messages: Message[];
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchUserStats: (userId: string) => Promise<void>;
  fetchUserMessages: (userId: string) => Promise<void>;
  fetchUserBookings: (userId: string) => Promise<void>;
  updateUserProfile: (userId: string, data: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      stats: {
        activeListings: 0,
        averageRating: 0,
        activeBookings: 0,
        totalEarnings: 0,
      },
      messages: [],
      bookings: [],
      loading: false,
      error: null,

      fetchUserStats: async (userId: string) => {
        try {
          set({ loading: true, error: null });
          
          const userDoc = await getDoc(doc(db, 'users', userId));
          const userData = userDoc.data();

          // Fetch active listings
          const listingsQuery = query(
            collection(db, 'items'),
            where('ownerId', '==', userId),
            where('active', '==', true)
          );
          const listingsSnapshot = await getDocs(listingsQuery);
          
          // Fetch active bookings
          const bookingsQuery = query(
            collection(db, 'bookings'),
            where('ownerId', '==', userId),
            where('status', '==', 'active')
          );
          const bookingsSnapshot = await getDocs(bookingsQuery);

          set({
            stats: {
              activeListings: listingsSnapshot.size,
              averageRating: userData?.rating || 0,
              activeBookings: bookingsSnapshot.size,
              totalEarnings: userData?.totalEarnings || 0,
            },
            loading: false,
          });
        } catch (error) {
          set({ error: 'Erreur lors du chargement des statistiques', loading: false });
        }
      },

      fetchUserMessages: async (userId: string) => {
        try {
          set({ loading: true, error: null });
          
          const messagesQuery = query(
            collection(db, 'messages'),
            where('recipientId', '==', userId)
          );
          const messagesSnapshot = await getDocs(messagesQuery);
          
          const messages = messagesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Message[];

          set({ messages, loading: false });
        } catch (error) {
          set({ error: 'Erreur lors du chargement des messages', loading: false });
        }
      },

      fetchUserBookings: async (userId: string) => {
        try {
          set({ loading: true, error: null });
          
          const bookingsQuery = query(
            collection(db, 'bookings'),
            where('userId', '==', userId)
          );
          const bookingsSnapshot = await getDocs(bookingsQuery);
          
          const bookings = bookingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Booking[];

          set({ bookings, loading: false });
        } catch (error) {
          set({ error: 'Erreur lors du chargement des réservations', loading: false });
        }
      },

      updateUserProfile: async (userId: string, data: Partial<User>) => {
        try {
          set({ loading: true, error: null });
          
          const userRef = doc(db, 'users', userId);
          await updateDoc(userRef, data);
          
          set({ loading: false });
        } catch (error) {
          set({ error: 'Erreur lors de la mise à jour du profil', loading: false });
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
);