import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useItemsStore } from '../store/itemsStore';
import { DocumentUpload } from '../components/DocumentUpload';

export function AddItem() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addItem } = useItemsStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: '',
    type: '',
    surface: '',
    rooms: '',
    features: [] as string[],
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('Vous devez être connecté pour ajouter un bien');
      return;
    }

    try {
      // Ici, nous simulons l'upload des images et documents
      const imageUrls = images.map((_, index) => 
        `https://images.unsplash.com/photo-${index + 1}`
      );

      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        price: parseFloat(formData.price),
        surface: formData.surface ? parseFloat(formData.surface) : undefined,
        rooms: formData.rooms ? parseInt(formData.rooms) : undefined,
        images: imageUrls,
        owner: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        },
        available: true,
        documents: [],
      };

      addItem(newItem);
      navigate('/profile');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'ajout du bien');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Ajouter un bien</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de bien
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionnez un type</option>
              <option value="house">Maison</option>
              <option value="apartment">Appartement</option>
              <option value="item">Équipement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre de l'annonce
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localisation
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {(formData.type === 'house' || formData.type === 'apartment') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surface (m²)
                </label>
                <input
                  type="number"
                  name="surface"
                  value={formData.surface}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de pièces
                </label>
                <input
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos
            </label>
            <DocumentUpload
              onUpload={(files) => setImages(files)}
              acceptedTypes={['.jpg', '.jpeg', '.png']}
              maxSize={5 * 1024 * 1024}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Documents
            </label>
            <DocumentUpload
              onUpload={(files) => setDocuments(files)}
              acceptedTypes={['.pdf', '.doc', '.docx']}
              maxSize={10 * 1024 * 1024}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter le bien
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}