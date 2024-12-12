import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SearchRadiusProps {
  selectedRadius: number;
  onRadiusChange: (radius: number) => void;
}

const radiusOptions = [
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 25, label: '25 km' },
  { value: 50, label: '50 km' },
  { value: 100, label: '100 km' },
];

export function SearchRadius({ selectedRadius, onRadiusChange }: SearchRadiusProps) {
  return (
    <div className="relative">
      <select
        value={selectedRadius}
        onChange={(e) => onRadiusChange(Number(e.target.value))}
        className="w-full h-full px-4 py-3 appearance-none bg-white border-l border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Toutes les distances...</option>
        {radiusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}