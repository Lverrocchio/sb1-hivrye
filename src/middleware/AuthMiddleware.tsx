import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { validateToken } from '../services/security';
import { toast } from 'react-hot-toast';

export function AuthMiddleware({ children }: { children: React.ReactNode }) {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      // Only check token if we have one and we're on a protected route
      const protectedRoutes = ['/dashboard', '/profile', '/settings', '/items/new', '/my-items'];
      const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

      if (token && isProtectedRoute && !validateToken(token)) {
        try {
          await logout();
          toast.error('Votre session a expiré. Veuillez vous reconnecter.');
          navigate('/login', { state: { from: location }, replace: true });
        } catch (error) {
          console.error('Logout error:', error);
          toast.error('Une erreur est survenue lors de la déconnexion');
        }
      }
    };

    checkAuth();
  }, [token, logout, navigate, location]);

  return <>{children}</>;
}