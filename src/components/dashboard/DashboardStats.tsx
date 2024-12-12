import React from 'react';
import { Package, Calendar, MessageSquare, Star } from 'lucide-react';

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

function StatsCard({ icon: Icon, label, value, change, trend }: StatsCardProps) {
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
        {change && (
          <div className={`text-sm ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
}

export function DashboardStats() {
  const stats = [
    {
      icon: Package,
      label: 'Biens en location',
      value: 12,
      change: '+2 ce mois',
      trend: 'up' as const,
    },
    {
      icon: Calendar,
      label: 'Réservations actives',
      value: 8,
      change: '+5 cette semaine',
      trend: 'up' as const,
    },
    {
      icon: MessageSquare,
      label: 'Messages non lus',
      value: 3,
    },
    {
      icon: Star,
      label: 'Note moyenne',
      value: '4.8/5',
      change: '+0.2 ce mois',
      trend: 'up' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}