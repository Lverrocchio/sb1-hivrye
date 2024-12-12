import React from 'react';
import { Users, Shield, Target, Award, Heart, Clock } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sophie Martin',
    role: 'CEO & Co-fondatrice',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    description: 'Passionnée par l\'économie collaborative et le développement durable.',
  },
  {
    name: 'Thomas Dubois',
    role: 'CTO & Co-fondateur',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    description: 'Expert en technologies et en expérience utilisateur.',
  },
  {
    name: 'Marie Lambert',
    role: 'Directrice Marketing',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    description: 'Spécialiste en stratégie digitale et communication.',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Confiance',
    description: 'La sécurité et la confiance sont au cœur de notre plateforme.',
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'Nous innovons constamment pour améliorer votre expérience.',
  },
  {
    icon: Heart,
    title: 'Communauté',
    description: 'Nous créons des liens durables entre les membres de notre communauté.',
  },
];

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              Notre mission : faciliter la location entre particuliers
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Nous croyons en une économie du partage plus durable et accessible à tous.
              Notre plateforme connecte les propriétaires et les locataires pour créer
              une communauté de confiance.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Nos valeurs</h2>
            <p className="mt-4 text-xl text-gray-600">
              Les principes qui guident nos actions au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Notre équipe</h2>
            <p className="mt-4 text-xl text-gray-600">
              Des passionnés qui travaillent pour vous offrir le meilleur service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Utilisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Objets disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-blue-100">Locations réussies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div className="text-blue-100">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}