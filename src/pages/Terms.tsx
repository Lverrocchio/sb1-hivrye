import React from 'react';
import { Scale, Shield, FileText, AlertCircle } from 'lucide-react';

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
        <p className="text-gray-600 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

        <div className="space-y-12">
          {/* Préambule */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Préambule</h2>
            <p className="text-gray-700">
              Les présentes conditions générales d'utilisation régissent l'utilisation de la plateforme
              louez.com, exploitée par [Nom de la société], société de droit français immatriculée
              au RCS de Paris sous le numéro XXX XXX XXX.
            </p>
          </section>

          {/* Définitions */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Définitions</h2>
            <div className="space-y-4 text-gray-700">
              <p>Dans les présentes conditions générales, les termes suivants ont la signification suivante :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Plateforme :</strong> Le site web louez.com</li>
                <li><strong>Utilisateur :</strong> Toute personne inscrite sur la Plateforme</li>
                <li><strong>Propriétaire :</strong> Utilisateur proposant un bien à la location</li>
                <li><strong>Locataire :</strong> Utilisateur louant un bien</li>
                <li><strong>Bien :</strong> Objet ou équipement proposé à la location</li>
              </ul>
            </div>
          </section>

          {/* Inscription */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Inscription et compte utilisateur</h2>
            <div className="space-y-4 text-gray-700">
              <p>Pour utiliser nos services, vous devez :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Être une personne physique majeure ou une personne morale</li>
                <li>Créer un compte avec des informations exactes et à jour</li>
                <li>Accepter les présentes conditions générales</li>
                <li>Respecter les lois en vigueur</li>
              </ul>
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Description des services</h2>
            <div className="space-y-4 text-gray-700">
              <p>La Plateforme permet :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>La mise en relation entre propriétaires et locataires</li>
                <li>La publication d'annonces de location</li>
                <li>La réservation et le paiement en ligne</li>
                <li>La gestion des locations</li>
              </ul>
            </div>
          </section>

          {/* Conditions financières */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Conditions financières</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-medium">Commission de service</h3>
              <p>
                La Plateforme prélève une commission sur chaque transaction, calculée
                comme suit :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>15% du montant de la location pour les propriétaires</li>
                <li>5% du montant de la location pour les locataires</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6">Paiements</h3>
              <p>
                Les paiements sont sécurisés et traités par notre partenaire Stripe.
                Le montant est débité au moment de la réservation.
              </p>
            </div>
          </section>

          {/* Responsabilités */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Responsabilités</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Responsabilité des propriétaires</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Exactitude des informations fournies</li>
                  <li>État et sécurité des biens</li>
                  <li>Respect des obligations légales</li>
                  <li>Assurance des biens</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Responsabilité des locataires</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Utilisation conforme des biens</li>
                  <li>Respect des conditions de location</li>
                  <li>Paiement des montants dus</li>
                  <li>Assurance responsabilité civile</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Assurance */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Assurance et garanties</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                La Plateforme propose une assurance optionnelle couvrant :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Les dommages matériels</li>
                <li>Le vol</li>
                <li>La responsabilité civile</li>
              </ul>
              <p className="mt-4">
                Les conditions détaillées de l'assurance sont disponibles dans un document séparé.
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Tous les éléments de la Plateforme (logos, textes, images, etc.) sont protégés
                par le droit de la propriété intellectuelle. Toute reproduction est interdite
                sans autorisation préalable.
              </p>
            </div>
          </section>

          {/* Résiliation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Résiliation</h2>
            <div className="space-y-4 text-gray-700">
              <p>La Plateforme peut résilier un compte en cas de :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Non-respect des CGU</li>
                <li>Comportement frauduleux</li>
                <li>Inactivité prolongée</li>
                <li>À la demande de l'utilisateur</li>
              </ul>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Droit applicable et juridiction</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Les présentes CGU sont soumises au droit français. Tout litige relève
                de la compétence exclusive des tribunaux de Paris, sous réserve des
                dispositions légales impératives contraires.
              </p>
            </div>
          </section>

          {/* Modification */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Modification des CGU</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                La Plateforme se réserve le droit de modifier les présentes CGU à tout moment.
                Les utilisateurs seront informés des modifications substantielles.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}