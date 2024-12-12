import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, MessageCircle, Euro, ChevronLeft, ChevronRight } from 'lucide-react';
import { MessageBox } from '../components/MessageBox';
import { Calendar as CalendarComponent } from '../components/Calendar';
import { ContractViewer } from '../components/ContractViewer';
import { Rating } from '../components/Rating';
import { BookingForm } from '../components/BookingForm';
import { processPayment } from '../services/payment';
import { createBooking } from '../services/booking';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const SAMPLE_ITEM = {
  id: '1',
  title: 'Remorque double essieu',
  description: 'Parfaite pour les déménagements. Capacité de charge de 750kg. Dimensions: 3m x 1.5m. Équipée de ridelles et d\'une bâche de protection.',
  price: 45,
  location: 'Lyon',
  category: 'Transport',
  images: [
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088',
    'https://images.unsplash.com/photo-1566576912345-3f0a0d16e0cc',
    'https://images.unsplash.com/photo-1566576912367-4f0d5d68845f',
  ],
  available: true,
  owner: {
    id: '1',
    name: 'Jean Dupont',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 4.8,
    reviews: 15,
  },
  unavailableDates: [
    new Date(2024, 2, 20),
    new Date(2024, 2, 21),
    new Date(2024, 2, 22),
  ],
  contract: {
    title: 'Conditions de location',
    content: `CONDITIONS GÉNÉRALES DE LOCATION

1. Objet du contrat
Le présent contrat a pour objet la location d'une remorque double essieu entre le propriétaire et le locataire.

2. Durée de la location
La location débute à la date et l'heure convenues de la prise en charge du matériel et se termine à la date et l'heure convenues de sa restitution.

3. Prix et paiement
Le prix de la location est fixé à 45€ par jour. Le paiement s'effectue à la réservation.

4. Dépôt de garantie
Un dépôt de garantie de 500€ sera demandé au locataire avant la prise en charge du matériel.

5. Obligations du locataire
- Utiliser le matériel conformément à sa destination
- Ne pas sous-louer ou prêter le matériel
- Assurer l'entretien courant
- Informer immédiatement le propriétaire de tout problème

6. Assurance
Le locataire doit être couvert par une assurance responsabilité civile.`,
    lastUpdated: '15/03/2024',
    downloadUrl: '#',
  },
};

const CURRENT_USER = {
  id: '2',
  name: 'Marie Martin',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
};

export function ItemDetail() {
  const navigate = useNavigate();
  const [showMessages, setShowMessages] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Bonjour, est-ce que la remorque est disponible ce weekend ?',
      timestamp: new Date('2024-03-15T10:30:00'),
    },
    {
      id: '2',
      senderId: '1',
      receiverId: '2',
      content: 'Oui, elle est disponible. Quand souhaitez-vous la récupérer ?',
      timestamp: new Date('2024-03-15T10:35:00'),
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      senderId: CURRENT_USER.id,
      receiverId: SAMPLE_ITEM.owner.id,
      content,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === SAMPLE_ITEM.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? SAMPLE_ITEM.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <div className="aspect-[4/3] relative group">
                <img
                  src={SAMPLE_ITEM.images[currentImageIndex]}
                  alt={SAMPLE_ITEM.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                {SAMPLE_ITEM.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {SAMPLE_ITEM.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{SAMPLE_ITEM.title}</h1>
              <div className="flex items-center mb-4">
                <MapPin className="text-gray-400 mr-2" size={20} />
                <span className="text-gray-600">{SAMPLE_ITEM.location}</span>
              </div>
              <div className="flex items-center mb-6">
                <Euro className="text-gray-400 mr-2" size={20} />
                <span className="text-2xl font-bold text-blue-600">
                  {SAMPLE_ITEM.price}€
                </span>
                <span className="text-gray-600 ml-2">/jour</span>
              </div>
              <p className="text-gray-700 mb-6">{SAMPLE_ITEM.description}</p>
              
              <div className="flex items-center mb-6">
                <img
                  src={SAMPLE_ITEM.owner.avatar}
                  alt={SAMPLE_ITEM.owner.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{SAMPLE_ITEM.owner.name}</p>
                  <p className="text-gray-600 text-sm">Propriétaire</p>
                  <Rating 
                    rating={SAMPLE_ITEM.owner.rating} 
                    reviews={SAMPLE_ITEM.owner.reviews}
                    size="sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowContract(!showContract)}
                  className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Voir les conditions de location
                </button>
                <button
                  onClick={() => setShowMessages(!showMessages)}
                  className="w-full flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <MessageCircle className="mr-2" size={20} />
                  Contacter le propriétaire
                </button>
              </div>
            </div>
          </div>

          {showContract && (
            <div className="border-t p-6">
              <ContractViewer contract={SAMPLE_ITEM.contract} />
            </div>
          )}

          <div className="border-t p-6">
            <h3 className="text-xl font-semibold mb-4">Disponibilités</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedDate ? (
                <BookingForm
                  itemId={SAMPLE_ITEM.id}
                  price={SAMPLE_ITEM.price}
                  onSubmit={async (booking) => {
                    try {
                      const payment = await processPayment({
                        amount: SAMPLE_ITEM.price + (booking.withInsurance ? SAMPLE_ITEM.price * 0.1 : 0),
                        paymentMethod: booking.paymentMethod,
                      });

                      if (payment.success) {
                        const newBooking = await createBooking({
                          ...booking,
                          itemId: SAMPLE_ITEM.id,
                          userId: CURRENT_USER.id,
                        });

                        navigate(`/bookings/${newBooking.id}`);
                      }
                    } catch (error) {
                      console.error('Booking error:', error);
                    }
                  }}
                />
              ) : (
                <CalendarComponent
                  unavailableDates={SAMPLE_ITEM.unavailableDates}
                  onSelectDate={setSelectedDate}
                  selectedDate={selectedDate}
                />
              )}
            </div>
          </div>

          {showMessages && (
            <div className="border-t p-6">
              <MessageBox
                messages={messages}
                currentUser={CURRENT_USER}
                otherUser={SAMPLE_ITEM.owner}
                onSendMessage={handleSendMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}