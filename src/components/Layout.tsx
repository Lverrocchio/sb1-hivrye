import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { Footer } from './Footer';
import { MainNav } from './MainNav';
import { useAuthStore } from '../store/authStore';

export function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              louez.com
            </Link>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <LogIn className="w-5 h-5 mr-1" />
                  <span>Connexion</span>
                </Link>
              )}
            </div>
          </div>
          <MainNav />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}