import React, { useState } from 'react';
import { Euro, Send } from 'lucide-react';

interface PriceOfferProps {
  itemId: string;
  currentPrice: number;
  onSubmitOffer: (offer: number) => Promise<void>;
}

export function PriceOffer({ itemId, currentPrice, onSubmitOffer }: PriceOfferProps) {
  const [offerAmount, setOfferAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const amount = parseFloat(offerAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Veuillez entrer un montant valide');
      return;
    }

    if (amount >= currentPrice) {
      setError('Votre offre doit être inférieure au prix demandé');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmitOffer(amount);
      setOfferAmount('');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi de votre offre');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-3">Faire une offre</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Prix proposé par jour
          </label>
          <div className="relative">
            <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              step="0.01"
              min="0"
              placeholder="Votre offre"
              className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Prix actuel : {currentPrice}€/jour
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Envoi...' : 'Envoyer l\'offre'}
          </button>
        </div>
      </form>
    </div>
  );
}