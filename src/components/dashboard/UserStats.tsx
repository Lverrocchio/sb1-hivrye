import React from 'react';
import { Package, Star, Calendar, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

function StatsCard({ icon: Icon, label, value, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`text-sm flex items-center ${
            trend.direction === 'up' ? 'text-green-600' : 
            trend.direction === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${
              trend.direction === 'down' && 'transform rotate-180'
            }`} />
            {trend.value}
          </div>
        )}
      </div>
    </div>
  );
}

export function UserStats() {
  const stats = [
    {
      icon: Package,
      label: 'Annonces actives',
      value: 12,
      trend: { value: '+2 ce mois', direction: 'up' as const },
    },
    {
      icon: Star,
      label: 'Note moyenne',
      value: '4.8/5',
      trend: { value: '+0.2', direction: 'up' as const },
    },
    {
      icon: Calendar,
      label: 'Locations en cours',
      value: 3,
      trend: { value: 'Stable', direction: 'neutral' as const },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}