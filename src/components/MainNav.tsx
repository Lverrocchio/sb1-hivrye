import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, Truck, Wrench, Hammer, Cog } from 'lucide-react';

const navItems = [
  { name: 'Maison', icon: Home, path: '/category/maison' },
  { name: 'Appartement', icon: Building2, path: '/category/appartement' },
  { name: 'Transport', icon: Truck, path: '/category/transport' },
  { name: 'Services', icon: Cog, path: '/category/services' },
  { name: 'Outils de bricolage', icon: Hammer, path: '/category/outils' },
  { name: 'Équipements spécialisés', icon: Wrench, path: '/category/equipements' },
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex justify-center space-x-8 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}