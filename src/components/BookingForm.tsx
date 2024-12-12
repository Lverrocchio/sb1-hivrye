import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { Clock, Shield, CreditCard } from 'lucide-react';

interface BookingFormProps {
  itemId: string;
  price: number;
  onSubmit: (booking: {
    date: Date;
    time: string;
    withInsurance: boolean;
    paymentMethod: string;
  }) => void;
}

export function BookingForm({ itemId, price, onSubmit }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [withInsurance, setWithInsurance] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  const paymentMethods = [
    { id: 'card', name: 'Carte bancaire', icon: CreditCard },
    { id: 'bancontact', name: 'Bancontact', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: CreditCard },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && paymentMethod) {
      onSubmit({
        date: selectedDate,
        time: selectedTime,
        withInsurance,
        paymentMethod,
      });
    }
  };

  const insuranceCost = price * 0.1; // 10% du prix de la location

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sélectionnez une date</h3>
        <Calendar
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </div>

      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Choisissez un horaire</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`p-2 rounded-lg border ${
                  selectedTime === time
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-blue-600'
                }`}
              >
                <Clock className="w-4 h-4 inline-block mr-2" />
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Protection et assurance</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={withInsurance}
              onChange={(e) => setWithInsurance(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium">Protection Premium</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Couverture complète en cas de dommages accidentels
              </p>
              <p className="text-sm font-medium text-blue-600 mt-1">
                +{insuranceCost.toFixed(2)}€
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Mode de paiement</h3>
        <div className="space-y-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <label
                key={method.id}
                className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                  paymentMethod === method.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-600'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="sr-only"
                />
                <Icon className="w-6 h-6 text-gray-600 mr-3" />
                <span className="font-medium">{method.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between mb-2">
          <span>Prix de la location</span>
          <span>{price.toFixed(2)}€</span>
        </div>
        {withInsurance && (
          <div className="flex justify-between mb-2">
            <span>Assurance Premium</span>
            <span>{insuranceCost.toFixed(2)}€</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{(price + (withInsurance ? insuranceCost : 0)).toFixed(2)}€</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!selectedDate || !selectedTime || !paymentMethod}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Confirmer et payer
      </button>
    </form>
  );
}