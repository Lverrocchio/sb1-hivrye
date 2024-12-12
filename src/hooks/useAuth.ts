import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { initAuthStateListener } from '../services/auth/authService';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const { setUser, clearUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let retryTimeout: NodeJS.Timeout;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    const initAuth = () => {
      const unsubscribe = initAuthStateListener((user) => {
        try {
          if (user) {
            setUser(user);
          } else {
            clearUser();
          }
          setLoading(false);
          setError(null);
          retryCount = 0;
        } catch (err) {
          console.error('Auth error:', err);
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            retryTimeout = setTimeout(initAuth, 1000 * retryCount);
          } else {
            setError('Erreur de connexion persistante');
            toast.error('Erreur de connexion. Veuillez réessayer plus tard.');
            setLoading(false);
          }
        }
      });

      return unsubscribe;
    };

    const unsubscribe = initAuth();

    return () => {
      unsubscribe();
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [setUser, clearUser]);

  return { loading, error };
};