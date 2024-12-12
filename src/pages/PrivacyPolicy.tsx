import React from 'react';
import { Shield, Lock, Eye, FileText, Clock, Settings } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
        <p className="text-gray-600 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              Chez louez.com, nous accordons une grande importance à la protection de vos données personnelles.
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons
              vos informations conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          {/* Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Responsable du traitement</h2>
            <p className="text-gray-700 mb-4">
              louez.com<br />
              123 Avenue des Champs-Élysées<br />
              75008 Paris, France<br />
              Email : dpo@louez.com
            </p>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Données personnelles collectées</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Nous collectons les données suivantes :</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Informations d'identification (nom, prénom, adresse email)</li>
                <li>Coordonnées (adresse postale, numéro de téléphone)</li>
                <li>Informations de paiement (cryptées et sécurisées)</li>
                <li>Historique des locations et transactions</li>
                <li>Données de connexion et d'utilisation du site</li>
                <li>Communications avec notre service client</li>
              </ul>
            </div>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Base légale du traitement</h2>
            <div className="space-y-4 text-gray-700">
              <p>Nous traitons vos données sur les bases légales suivantes :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>L'exécution du contrat de location</li>
                <li>Votre consentement explicite</li>
                <li>Nos obligations légales</li>
                <li>Notre intérêt légitime (amélioration des services, prévention des fraudes)</li>
              </ul>
            </div>
          </section>

          {/* Finalités */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Finalités du traitement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <Lock className="w-6 h-6 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">Gestion des comptes</h3>
                <p className="text-gray-700">Création et gestion de votre compte utilisateur</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">Transactions</h3>
                <p className="text-gray-700">Traitement des locations et paiements</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">Sécurité</h3>
                <p className="text-gray-700">Prévention des fraudes et sécurisation des transactions</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">Amélioration</h3>
                <p className="text-gray-700">Amélioration de nos services et de votre expérience</p>
              </div>
            </div>
          </section>

          {/* Destinataires */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Destinataires des données</h2>
            <div className="space-y-4 text-gray-700">
              <p>Vos données sont accessibles uniquement aux personnes habilitées :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Notre personnel autorisé</li>
                <li>Nos sous-traitants (hébergement, paiement)</li>
                <li>Les autorités compétentes sur réquisition</li>
              </ul>
              <p>
                Nous ne vendons jamais vos données personnelles à des tiers.
              </p>
            </div>
          </section>

          {/* Conservation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Durée de conservation</h2>
            <div className="space-y-4 text-gray-700">
              <p>Nous conservons vos données pendant :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>La durée de votre inscription pour les données de compte</li>
                <li>10 ans pour les données de transaction (obligation légale)</li>
                <li>13 mois pour les cookies</li>
                <li>3 ans après le dernier contact pour les prospects</li>
              </ul>
            </div>
          </section>

          {/* Droits */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
            <div className="space-y-4 text-gray-700">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement (droit à l'oubli)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit de retirer votre consentement</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez notre DPO à dpo@louez.com ou par courrier à notre adresse.
                Vous pouvez également introduire une réclamation auprès de la CNIL.
              </p>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sécurité des données</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour assurer
                la sécurité de vos données :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chiffrement des données sensibles</li>
                <li>Protocoles de sécurité SSL/TLS</li>
                <li>Accès restreint aux données</li>
                <li>Audits de sécurité réguliers</li>
                <li>Formation de notre personnel</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Politique des cookies</h2>
            <div className="space-y-4 text-gray-700">
              <p>Nous utilisons des cookies pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Assurer le fonctionnement du site</li>
                <li>Améliorer votre expérience de navigation</li>
                <li>Analyser l'utilisation du site</li>
                <li>Personnaliser nos services</li>
              </ul>
              <p className="mt-4">
                Vous pouvez gérer vos préférences en matière de cookies à tout moment
                via les paramètres de votre navigateur.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}