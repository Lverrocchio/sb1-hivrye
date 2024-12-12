import React from 'react';
import { MapPin, Euro } from 'lucide-react';
import { Item } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleRentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/items/${item.id}?rent=true`);
  };

  return (
    <Link to={`/items/${item.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="relative aspect-video">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {!item.available && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
              Non disponible
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{item.location}</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-blue-600 font-semibold">
              <Euro size={16} className="mr-1" />
              <span>{item.price}€/jour</span>
            </div>
            <button
              onClick={handleRentClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Louer
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}