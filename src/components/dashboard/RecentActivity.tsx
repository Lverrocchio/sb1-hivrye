import React from 'react';
import { MessageSquare, Package, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Activity {
  id: string;
  type: 'message' | 'booking' | 'payment';
  title: string;
  description: string;
  timestamp: Date;
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'message',
      title: 'Nouveau message',
      description: 'Marie D. vous a envoyé un message concernant la tondeuse',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'booking',
      title: 'Nouvelle réservation',
      description: 'Pierre M. souhaite louer votre remorque',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      type: 'payment',
      title: 'Paiement reçu',
      description: '45€ reçus pour la location de la perceuse',
      timestamp: new Date(Date.now() - 7200000),
    },
  ];

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'booking':
        return <Package className="w-5 h-5 text-green-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Activité récente</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="p-2 bg-gray-50 rounded-lg">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{activity.title}</h3>
                <span className="text-sm text-gray-500">
                  {format(activity.timestamp, 'HH:mm', { locale: fr })}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}