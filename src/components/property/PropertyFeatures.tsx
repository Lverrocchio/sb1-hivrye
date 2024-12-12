import React from 'react';
import { Check } from 'lucide-react';

interface PropertyFeaturesProps {
  features: string[];
}

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Caractéristiques</h2>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center text-gray-600">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}