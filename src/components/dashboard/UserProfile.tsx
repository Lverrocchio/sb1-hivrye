import React from 'react';
import { User, MapPin, Star, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function UserProfile() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {user.role === 'owner' ? 'Propriétaire' : 
               user.role === 'renter' ? 'Locataire' : 'Propriétaire & Locataire'}
            </span>
          </div>
          
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {user.location}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              Membre depuis {new Date(user.createdAt).getFullYear()}
            </div>
            {user.rating && (
              <div className="flex items-center text-gray-600">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                {user.rating.toFixed(1)}/5 ({user.reviews} avis)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}