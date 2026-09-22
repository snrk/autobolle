export default {
  email: 'info@autobolle.ch',
  telephone: { affichage: '021 802 22 22', lien: '+41218022222' },
  whatsapp: 'https://wa.me/message/GG23IMBJYI5GI1',
  rendezVous: 'https://autobolle.sopl.ch/fr/#loginSection',

  adresse: {
    nom: 'Garage Autobolle',
    rue: 'Route de Genève 14',
    localite: '1131 Tolochenaz',
  },

  horaires: [
    {
      titre: 'Atelier',
      icone: 'atelier',
      plages: [
        {
          jours: 'Lu – Ve',
          heures: ['07h30 – 12h00', '13h30 – 18h00'],
        },
      ],
    },
    {
      titre: 'Station service',
      icone: 'shop',
      plages: [
        {
          jours: 'Lu – Ve',
          heures: ['07h30 – 12h30', '13h30 – 18h30'],
        },
        { jours: 'Samedi', heures: ['09h00 – 13h00'] },
      ],
    },
  ],
}
