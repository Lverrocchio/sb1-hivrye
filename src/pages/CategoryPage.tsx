import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filters } from '../components/Filters';
import { ItemCard } from '../components/ItemCard';
import { PropertyCard } from '../components/PropertyCard';

const SAMPLE_PROPERTIES = [
  {
    id: '1',
    title: 'Appartement lumineux',
    description: 'Bel appartement rénové',
    type: 'apartment',
    price: 800,
    location: 'Bruxelles',
    surface: 65,
    rooms: 2,
    furnished: true,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
    documents: [],
    features: ['Parking', 'Terrasse'],
    owner: {
      id: '1',
      name: 'Jean Dupont',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      email: 'jean@example.com',
    },
    available: true,
  },
  {
    id: '2',
    title: 'Maison avec jardin',
    description: 'Grande maison familiale',
    type: 'house',
    price: 1200,
    location: 'Liège',
    surface: 120,
    rooms: 4,
    furnished: false,
    images: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233'],
    documents: [],
    features: ['Jardin', 'Garage'],
    owner: {
      id: '2',
      name: 'Marie Martin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      email: 'marie@example.com',
    },
    available: true,
  },
];

const SAMPLE_ITEMS = [
  {
    id: '1',
    title: 'Remorque double essieu',
    description: 'Parfait pour les déménagements',
    price: 45,
    location: 'Anvers',
    category: 'Transport',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088',
    available: true,
    owner: {
      id: '1',
      name: 'Jean Dupont',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
  },
  {
    id: '2',
    title: 'Perceuse professionnelle',
    description: 'Perceuse à percussion',
    price: 25,
    location: 'Gand',
    category: 'Outils',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c',
    available: true,
    owner: {
      id: '2',
      name: 'Marie Martin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
  },
];

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    location: '',
    features: [],
    availability: false,
  });

  const isPropertyCategory = category === 'maison' || category === 'appartement';
  const items = isPropertyCategory ? SAMPLE_PROPERTIES : SAMPLE_ITEMS;

  const getCategoryTitle = () => {
    switch (category) {
      case 'maison':
        return 'Maisons';
      case 'appartement':
        return 'Appartements';
      case 'transport':
        return 'Transport';
      case 'services':
        return 'Services';
      case 'outils':
        return 'Outils de bricolage';
      case 'equipements':
        return 'Équipements spécialisés';
      default:
        return 'Résultats';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{getCategoryTitle()}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Filters
            filters={filters}
            onFilterChange={setFilters}
            category={category || ''}
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              isPropertyCategory ? (
                <PropertyCard key={item.id} property={item as any} />
              ) : (
                <ItemCard key={item.id} item={item as any} />
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}