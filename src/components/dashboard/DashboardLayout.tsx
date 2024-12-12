import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, Settings, Package, Calendar, MessageSquare, 
  CreditCard, Shield, History, Heart
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const menuItems = [
  { icon: User, label: 'Mon profil', path: '/dashboard/profile' },
  { icon: Package, label: 'Mes biens', path: '/dashboard/items' },
  { icon: Calendar, label: 'Mes réservations', path: '/dashboard/bookings' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
  { icon: CreditCard, label: 'Paiements', path: '/dashboard/payments' },
  { icon: Shield, label: 'Assurances', path: '/dashboard/insurance' },
  { icon: History, label: 'Historique', path: '/dashboard/history' },
  { icon: Heart, label: 'Favoris', path: '/dashboard/favorites' },
  { icon: Settings, label: 'Paramètres', path: '/dashboard/settings' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}