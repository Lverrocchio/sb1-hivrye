import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { getUserBookings } from '../services/firebase/bookingsService';
import { getUserMessages } from '../services/firebase/messagesService';
import { getUserReviews } from '../services/firebase/reviewsService';
import { getItemsByUser } from '../services/firebase/itemsService';
import { toast } from 'react-hot-toast';

export function useUserData() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    bookings: [],
    messages: [],
    reviews: [],
    items: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        const [bookings, messages, reviews, items] = await Promise.all([
          getUserBookings(user.id),
          getUserMessages(user.id),
          getUserReviews(user.id),
          getItemsByUser(user.id),
        ]);

        setData({ bookings, messages, reviews, items });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Erreur lors du chargement des données');
        toast.error('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  return { ...data, loading, error };
}