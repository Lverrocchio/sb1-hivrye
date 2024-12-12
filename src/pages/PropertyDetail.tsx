import React, { useState } from 'react';
import { MapPin, Euro, Home, Maximize2, BedDouble } from 'lucide-react';
import { PropertyActions } from '../components/property/PropertyActions';
import { PropertyGallery } from '../components/property/PropertyGallery';
import { PropertyInfo } from '../components/property/PropertyInfo';
import { PropertyFeatures } from '../components/property/PropertyFeatures';
import { PropertyOwner } from '../components/property/PropertyOwner';
import { Property } from '../types';

const SAMPLE_PROPERTY = {
  id: '1',
  title: 'Appartement lumineux en centre-ville',
  description: 'Magnifique appartement rénové avec goût, idéalement situé.',
  type: 'apartment',
  price: 1200,
  location: 'Lyon',
  surface: 65,
  rooms: 3,
  furnished: true,
  images: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc'
  ],
  features: ['Parking', 'Balcon', 'Ascenseur', 'Interphone'],
  owner: {
    id: '1',
    name: 'Marie Dubois',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    rating: 4.8,
    reviews: 12
  },
  available: true
};

export function PropertyDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PropertyGallery
              images={SAMPLE_PROPERTY.images}
              currentIndex={currentImageIndex}
              onImageChange={setCurrentImageIndex}
            />
            
            <div className="p-6">
              <PropertyInfo property={SAMPLE_PROPERTY} />
              <PropertyFeatures features={SAMPLE_PROPERTY.features} />
              <PropertyOwner owner={SAMPLE_PROPERTY.owner} />
              <PropertyActions
                propertyId={SAMPLE_PROPERTY.id}
                ownerId={SAMPLE_PROPERTY.owner.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}