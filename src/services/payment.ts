import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function processPayment({
  amount,
  currency = 'eur',
  paymentMethod,
}: {
  amount: number;
  currency?: string;
  paymentMethod: string;
}) {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not initialized');

    // Ici, vous feriez normalement un appel à votre backend pour créer une intention de paiement
    const paymentIntent = {
      client_secret: 'fake_client_secret',
      amount,
      currency,
    };

    // Simuler un paiement réussi
    return {
      success: true,
      paymentIntent,
    };
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
}