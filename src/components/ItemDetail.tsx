import React, { useState } from 'react';
import { MapPin, Euro, Calendar, MessageCircle, Share2, Phone, Shield, Heart, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { PriceOffer } from './PriceOffer';

interface ItemDetailProps {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    owner: {
      id: string;
      name: string;
      avatar: string;
      phone?: string;
      rating: number;
      responseRate?: number;
      responseTime?: string;
    };
    deliveryOptions: {
      pickup: boolean;
      delivery: boolean;
      deliveryCost?: number;
    };
  };
  onSave?: () => void;
  onShare?: () => void;
  onContact?: () => void;
  onSubmitOffer?: (amount: number) => Promise<void>;
}

export function ItemDetail({ item, onSave, onShare, onContact, onSubmitOffer }: ItemDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="p-6">
          <div className="relative aspect-[4/3] mb-4">
            <img
              src={item.images[currentImageIndex]}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 space-x-2">
              <button 
                onClick={onSave}
                className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={onShare}
                className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {item.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex ? 'border-blue-600' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${item.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-2xl font-bold text-blue-600">
                <Euro className="w-6 h-6 mr-1" />
                {item.price}
                <span className="text-gray-500 text-base font-normal ml-1">/jour</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-1" />
                {item.location}
              </div>
            </div>
            <button
              onClick={() => setShowOfferForm(!showOfferForm)}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Tag className="w-5 h-5 mr-1" />
              Faire une offre
            </button>
          </div>

          {showOfferForm && onSubmitOffer && (
            <div className="mb-6">
              <PriceOffer
                itemId={item.id}
                currentPrice={item.price}
                onSubmitOffer={onSubmitOffer}
              />
            </div>
          )}

          {/* Rest of the component remains the same */}
          {/* Owner Section */}
          <div className="border-t border-b py-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={item.owner.avatar}
                  alt={item.owner.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{item.owner.name}</h3>
                  <div className="text-sm text-gray-500">
                    Répond à {item.owner.responseRate}% des messages
                  </div>
                  <div className="text-sm text-gray-500">
                    Temps de réponse moyen : {item.owner.responseTime}
                  </div>
                </div>
              </div>
              {item.owner.phone && (
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {showPhone ? item.owner.phone : 'Voir le numéro'}
                </button>
              )}
            </div>
          </div>

          {/* Delivery Options */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Options de livraison</h3>
            <div className="space-y-2">
              {item.deliveryOptions.pickup && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  Retrait sur place
                </div>
              )}
              {item.deliveryOptions.delivery && (
                <div className="flex items-center text-gray-600">
                  <Shield className="w-5 h-5 mr-2" />
                  Livraison disponible (+{item.deliveryOptions.deliveryCost}€)
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{item.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onContact}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contacter
            </button>
            <Link
              to={`/items/${item.id}/rent`}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Louer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}