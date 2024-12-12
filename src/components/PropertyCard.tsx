import React from 'react';
import { MapPin, Euro, Home, Maximize2, BedDouble } from 'lucide-react';
import { Property } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleRentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/properties/${property.id}?rent=true`);
  };

  return (
    <Link to={`/properties/${property.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="relative aspect-[4/3]">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {!property.available && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
              Non disponible
            </div>
          )}
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
            {property.type === 'house' ? 'Maison' : 'Appartement'}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="flex items-center text-gray-600">
              <Maximize2 size={16} className="mr-1" />
              <span className="text-sm">{property.surface}m²</span>
            </div>
            <div className="flex items-center text-gray-600">
              <BedDouble size={16} className="mr-1" />
              <span className="text-sm">{property.rooms} pièces</span>
            </div>
            <div className="flex items-center text-blue-600 font-semibold">
              <Euro size={16} className="mr-1" />
              <span>{property.price}€/mois</span>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleRentClick}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Louer
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}