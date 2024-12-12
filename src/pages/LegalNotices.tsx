import React from 'react';

export function LegalNotices() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Informations légales</h2>
          <p className="mb-4">
            Le site louez.com est édité par [Nom de la société], société de droit belge
            dont le siège social est situé à [Adresse complète].
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Numéro d'entreprise (BCE) : BE-0000.000.000</li>
            <li>TVA : BE-0000.000.000</li>
            <li>Email : contact@louez.com</li>
            <li>Téléphone : +32 0 000 00 00</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Protection des données personnelles</h2>
          <p className="mb-4">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi belge
            du 30 juillet 2018 relative à la protection des personnes physiques à l'égard des
            traitements de données à caractère personnel, nous nous engageons à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Traiter vos données de manière licite, loyale et transparente</li>
            <li>Collecter vos données pour des finalités déterminées et légitimes</li>
            <li>Minimiser la collecte des données aux éléments strictement nécessaires</li>
            <li>Assurer la sécurité et la confidentialité des données collectées</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Droits des utilisateurs</h2>
          <p className="mb-4">
            Conformément à la législation en vigueur, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition au traitement de vos données</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Cookies</h2>
          <p className="mb-4">
            Conformément à l'article XII.20 du Code de droit économique belge, nous vous informons
            que notre site utilise des cookies. Un bandeau d'information apparaît lors de votre
            première visite pour recueillir votre consentement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Responsabilité</h2>
          <p className="mb-4">
            Conformément aux articles XII.17 à XII.27 du Code de droit économique belge relatifs
            aux services de la société de l'information, notre responsabilité en tant
            qu'hébergeur est limitée aux conditions prévues par la loi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Droit applicable et juridiction compétente</h2>
          <p className="mb-4">
            Les présentes mentions légales sont soumises au droit belge. En cas de litige,
            les tribunaux de [Ville] seront seuls compétents.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
          <p>
            Pour toute question concernant ces mentions légales ou l'exercice de vos droits,
            vous pouvez nous contacter à l'adresse suivante : dpo@louez.com
          </p>
        </section>
      </div>
    </div>
  );
}