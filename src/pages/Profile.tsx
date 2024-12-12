import React from 'react';
import { Camera, MapPin, Star, Package } from 'lucide-react';
import { Rating } from '../components/Rating';

const USER_PROFILE = {
  id: '1',
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  location: 'Lyon',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  memberSince: '2024',
  rating: 4.8,
  reviews: 12,
  itemsCount: 5,
  reviewsReceived: [
    {
      id: '1',
      rating: 5,
      comment: 'Excellent propriétaire, très professionnel',
      author: 'Marie L.',
      date: '2024-03-10',
    },
    {
      id: '2',
      rating: 4,
      comment: 'Très bon accueil, matériel en parfait état',
      author: 'Pierre D.',
      date: '2024-03-05',
    },
  ],
};

export function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative">
              <img
                src={USER_PROFILE.avatar}
                alt={USER_PROFILE.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{USER_PROFILE.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{USER_PROFILE.location}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    <span>Note moyenne</span>
                  </div>
                  <Rating rating={USER_PROFILE.rating} reviews={USER_PROFILE.reviews} size="lg" />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Package className="w-5 h-5 mr-2" />
                    <span>Équipements</span>
                  </div>
                  <p className="text-2xl font-bold">{USER_PROFILE.itemsCount}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <span>Membre depuis</span>
                  </div>
                  <p className="text-2xl font-bold">{USER_PROFILE.memberSince}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Modifier le profil
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Avis reçus</h2>
            <div className="space-y-6">
              {USER_PROFILE.reviewsReceived.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">{review.author}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <Rating rating={review.rating} showCount={false} size="sm" />
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Mes équipements</h2>
        {/* Liste des équipements sera ajoutée ici */}
      </div>
    </div>
  );
}