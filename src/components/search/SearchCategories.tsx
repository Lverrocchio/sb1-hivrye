import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SearchCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'Toutes les catégories' },
  { id: 'maison', label: 'Maison' },
  { id: 'appartement', label: 'Appartement' },
  { id: 'transport', label: 'Transport' },
  { id: 'services', label: 'Services' },
  { id: 'outils', label: 'Outils de bricolage' },
  { id: 'equipements', label: 'Équipements spécialisés' },
];

export function SearchCategories({ selectedCategory, onCategoryChange }: SearchCategoriesProps) {
  return (
    <div className="relative flex-1">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full h-full px-4 py-3 appearance-none bg-white border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-lg"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}