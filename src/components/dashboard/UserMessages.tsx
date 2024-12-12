import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  read: boolean;
}

export function UserMessages() {
  const messages: Message[] = [
    {
      id: '1',
      sender: {
        id: '2',
        name: 'Marie Dupont',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      },
      content: 'Bonjour, est-ce que la tondeuse est toujours disponible ce weekend ?',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      sender: {
        id: '3',
        name: 'Pierre Martin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      },
      content: 'Merci pour la location, tout s\'est très bien passé !',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Messages récents</h2>
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            {messages.filter(m => !m.read).length} non lus
          </span>
        </div>
        
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex items-start space-x-4 p-4 rounded-lg ${
                message.read ? 'bg-white' : 'bg-blue-50'
              }`}
            >
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{message.sender.name}</h3>
                  <span className="text-sm text-gray-500">
                    {format(message.timestamp, 'HH:mm', { locale: fr })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <MessageSquare className="w-4 h-4 inline-block mr-2" />
          Voir tous les messages
        </button>
      </div>
    </div>
  );
}