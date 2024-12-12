import React from 'react';
import { Rating } from '../Rating';

interface PropertyOwnerProps {
  owner: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
  };
}

export function PropertyOwner({ owner }: PropertyOwnerProps) {
  return (
    <div className="flex items-center mb-6">
      <img
        src={owner.avatar}
        alt={owner.name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <p className="font-semibold">{owner.name}</p>
        <p className="text-gray-600 text-sm">Propriétaire</p>
        <Rating 
          rating={owner.rating} 
          reviews={owner.reviews}
          size="sm"
        />
      </div>
    </div>
  );
}