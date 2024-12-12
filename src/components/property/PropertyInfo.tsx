import React from 'react';
import { MapPin, Euro, Maximize2, BedDouble } from 'lucide-react';
import { Property } from '../../types';

interface PropertyInfoProps {
  property: Property;
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <div className="flex items-center mb-4">
        <MapPin className="text-gray-400 mr-2" size={20} />
        <span className="text-gray-600">{property.location}</span>
      </div>
      <div className="flex items-center mb-6">
        <Euro className="text-gray-400 mr-2" size={20} />
        <span className="text-2xl font-bold text-blue-600">
          {property.price}€
        </span>
        <span className="text-gray-600 ml-2">/mois</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-600">
          <Maximize2 className="w-5 h-5 mr-2" />
          <span>{property.surface} m²</span>
        </div>
        <div className="flex items-center text-gray-600">
          <BedDouble className="w-5 h-5 mr-2" />
          <span>{property.rooms} pièces</span>
        </div>
      </div>
      <p className="text-gray-700">{property.description}</p>
    </div>
  );
}