import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export async function createBooking({
  itemId,
  date,
  time,
  withInsurance,
  paymentMethod,
  userId,
}: {
  itemId: string;
  date: Date;
  time: string;
  withInsurance: boolean;
  paymentMethod: string;
  userId: string;
}) {
  // Simuler une création de réservation
  const booking = {
    id: Math.random().toString(36).substr(2, 9),
    itemId,
    userId,
    date: format(date, 'yyyy-MM-dd'),
    time,
    withInsurance,
    paymentMethod,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  // Ici, vous feriez normalement un appel à votre API pour sauvegarder la réservation

  return booking;
}