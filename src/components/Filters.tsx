import React from 'react';
import { Sliders, Euro } from 'lucide-react';

interface FiltersProps {
  filters: {
    priceRange: [number, number];
    location: string;
    features: string[];
    availability: boolean;
  };
  onFilterChange: (filters: any) => void;
  category: string;
}

export function Filters({ filters, onFilterChange, category }: FiltersProps) {
  const handlePriceChange = (value: string, index: number) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(value);
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    onFilterChange({ ...filters, features: newFeatures });
  };

  const getFeaturesByCategory = (category: string) => {
    switch (category) {
      case 'maison':
      case 'appartement':
        return ['Parking', 'Jardin', 'Terrasse', 'Meublé', 'Climatisation'];
      case 'transport':
        return ['Automatique', 'Climatisation', 'GPS', 'Attelage'];
      case 'outils':
        return ['Sans fil', 'Professionnel', 'Batterie incluse'];
      case 'equipements':
        return ['Livraison possible', 'Formation incluse', 'Maintenance incluse'];
      default:
        return [];
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Sliders className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Filtres</h3>
      </div>

      <div className="space-y-6">
        {/* Prix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix {category === 'maison' || category === 'appartement' ? '(€/mois)' : '(€/jour)'}
          </label>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e.target.value, 0)}
                className="pl-9 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Min"
              />
            </div>
            <span className="text-gray-500">à</span>
            <div className="relative flex-1">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e.target.value, 1)}
                className="pl-9 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Localisation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Localisation
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ville ou code postal"
          />
        </div>

        {/* Caractéristiques */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caractéristiques
          </label>
          <div className="grid grid-cols-2 gap-2">
            {getFeaturesByCategory(category).map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Disponibilité */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.availability}
              onChange={(e) => onFilterChange({ ...filters, availability: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Disponible uniquement</span>
          </label>
        </div>
      </div>
    </div>
  );
}