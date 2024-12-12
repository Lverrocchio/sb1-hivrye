import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { ItemCard } from '../components/ItemCard';
import { CategoryCard } from '../components/CategoryCard';
import { Hammer, Truck, Wrench, Home as HomeIcon, Building2, Cog, Search, Shield, Calendar, Headset, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const SAMPLE_ITEMS = [
  {
    id: '1',
    title: 'Remorque double essieu',
    description: 'Parfait pour les déménagements',
    price: 45,
    location: 'Lyon',
    category: 'Transport',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088',
    available: true,
    owner: {
      id: '1',
      name: 'Jean Dupont',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
  },
  {
    id: '2',
    title: 'Tondeuse professionnelle',
    description: 'Idéale pour les grands jardins',
    price: 35,
    location: 'Paris',
    category: 'Jardinage',
    imageUrl: 'https://images.unsplash.com/photo-1589288195388-0b4a2123a703',
    available: true,
    owner: {
      id: '2',
      name: 'Marie Martin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
  },
];

const CATEGORIES = [
  {
    icon: HomeIcon,
    title: 'Maison',
    path: '/category/maison',
    description: 'Trouvez la maison de vos rêves',
  },
  {
    icon: Building2,
    title: 'Appartement',
    path: '/category/appartement',
    description: 'Des appartements pour tous les goûts',
  },
  {
    icon: Truck,
    title: 'Transport',
    path: '/category/transport',
    description: 'Remorques et équipements de transport',
  },
  {
    icon: Cog,
    title: 'Services',
    path: '/category/services',
    description: 'Services entre particuliers',
  },
  {
    icon: Hammer,
    title: 'Outils de bricolage',
    path: '/category/outils',
    description: 'Tous les outils pour vos projets',
  },
  {
    icon: Wrench,
    title: 'Équipements spécialisés',
    path: '/category/equipements',
    description: 'Machines et équipements professionnels',
  },
];

const FEATURES = [
  {
    icon: Search,
    title: 'Recherche simplifiée',
    description: 'Trouvez rapidement ce dont vous avez besoin grâce à notre moteur de recherche intuitif.',
  },
  {
    icon: Shield,
    title: 'Sécurité garantie',
    description: 'Profitez d\'un système sécurisé pour vos transactions et d\'une communauté vérifiée.',
  },
  {
    icon: Calendar,
    title: 'Réservation rapide',
    description: 'Réservez ou mettez en location vos objets en quelques clics seulement.',
  },
  {
    icon: Headset,
    title: 'Support réactif',
    description: 'Une équipe dédiée disponible pour vous accompagner à chaque étape.',
  },
];

const STEPS = [
  {
    icon: UserPlus,
    title: 'Inscription rapide',
    description: 'Créez votre compte en quelques minutes',
    path: '/register',
  },
  {
    icon: Search,
    title: 'Parcourez les offres',
    description: 'Trouvez les objets dont vous avez besoin',
    path: '/category/all',
  },
  {
    icon: Calendar,
    title: 'Réservation simple',
    description: 'Réservez l\'objet souhaité aux dates qui vous conviennent',
    path: null,
  },
  {
    icon: Shield,
    title: 'Échange sécurisé',
    description: 'Profitez d\'un système de paiement sécurisé',
    path: null,
  },
];

export function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleStart = () => {
    if (isAuthenticated) {
      navigate('/items/new');
    } else {
      navigate('/register');
    }
  };

  const handleLearnMore = () => {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStepClick = (path: string | null) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Louez ou mettez en location vos objets
              <span className="block text-blue-600">en toute simplicité</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Découvrez une nouvelle façon de louer et de rentabiliser vos objets. Simple, rapide et sécurisé.
            </p>
            <SearchBar onSearch={handleSearch} className="mx-auto mb-8" />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStart}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Commencer
              </button>
              <button
                onClick={handleLearnMore}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir louez.com ?
            </h2>
            <p className="text-xl text-gray-600">
              Une solution complète pour la location d'objets entre particuliers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Catégories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => (
              <div
                key={category.title}
                onClick={() => navigate(category.path)}
                className="cursor-pointer"
              >
                <CategoryCard
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Suivez ces étapes simples pour commencer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleStepClick(step.path)}
                  className={`text-center ${step.path ? 'cursor-pointer' : ''}`}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Items Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Équipements populaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_ITEMS.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}