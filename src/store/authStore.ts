import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
  login: (response: { user: User; token: string }) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => {
        set({ 
          user, 
          isAuthenticated: true,
        });
      },
      setToken: (token) => set({ token }),
      clearUser: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
      login: (response) => {
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        });
        toast.success('Connexion réussie');
      },
      logout: async () => {
        try {
          await signOut(auth);
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
          });
          toast.success('Déconnexion réussie');
        } catch (error) {
          console.error('Logout error:', error);
          toast.error('Erreur lors de la déconnexion');
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);