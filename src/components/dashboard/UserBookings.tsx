import React from 'react';
import { Calendar, MapPin, Euro } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Booking {
  id: string;
  itemTitle: string;
  location: string;
  startDate: Date;
  endDate: Date;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export function UserBookings() {
  const bookings: Booking[] = [
    {
      id: '1',
      itemTitle: 'Remorque double essieu',
      location: 'Lyon',
      startDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 16),
      price: 45,
      status: 'confirmed',
    },
    {
      id: '2',
      itemTitle: 'Tondeuse professionnelle',
      location: 'Paris',
      startDate: new Date(2024, 2, 20),
      endDate: new Date(2024, 2, 21),
      price: 35,
      status: 'pending',
    },
  ];

  const getStatusBadge = (status: Booking['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const labels = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      completed: 'Terminée',
      cancelled: 'Annulée',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Mes réservations</h2>
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{booking.itemTitle}</h3>
                {getStatusBadge(booking.status)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>
                    {format(booking.startDate, 'dd MMM', { locale: fr })} - {format(booking.endDate, 'dd MMM', { locale: fr })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{booking.location}</span>
                </div>
                <div className="flex items-center text-blue-600 font-semibold">
                  <Euro className="w-5 h-5 mr-2" />
                  <span>{booking.price}€</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}