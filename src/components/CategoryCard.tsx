import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CategoryCard({ icon: Icon, title, description }: CategoryCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
        <Icon className="text-blue-600" size={24} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}