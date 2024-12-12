import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useItemsStore } from '../store/itemsStore';
import { ItemCard } from '../components/ItemCard';
import { PropertyCard } from '../components/PropertyCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MyItems() {
  const { user } = useAuthStore();
  const { getItemsByUserId } = useItemsStore();

  if (!user) {
    return null;
  }

  const userItems = getItemsByUserId(user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes biens</h1>
        <Link
          to="/items/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un bien
        </Link>
      </div>

      {userItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Vous n'avez pas encore de biens à louer</p>
          <Link
            to="/items/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter mon premier bien
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userItems.map((item) => (
            'type' in item ? (
              <PropertyCard key={item.id} property={item} />
            ) : (
              <ItemCard key={item.id} item={item} />
            )
          ))}
        </div>
      )}
    </div>
  );
}