import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'react-hot-toast';

interface VisitModalProps {
  propertyId: string;
  ownerId: string;
  onClose: () => void;
}

export function VisitModal({ propertyId, ownerId, onClose }: VisitModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      // Ici, vous feriez un appel API pour enregistrer la visite
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Demande de visite envoyée avec succès');
      onClose();
    } catch (error) {
      toast.error('Erreur lors de la planification de la visite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Planifier une visite</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date souhaitée
            </label>
            <input
              type="date"
              min={format(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horaire
            </label>
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
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedDate || !selectedTime}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              'Envoi en cours...'
            ) : (
              <>
                <Calendar className="w-5 h-5 mr-2" />
                Confirmer la visite
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}