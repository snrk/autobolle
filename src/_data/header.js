import icons from './svgs.js'

export default {
  menu: [
    {
      title: 'Nos services',
      url: '#',
      submenu: [
        {
          title: 'Achat et Vente',
          url: '/achat-vente/',
          icon: icons['achatVente'].icon,
          description:
            "Véhicules neufs et d'occasion soigneusement sélectionnés. Reprise, financement et dépôt-vente.",
        },
        {
          title: "Véhicules d'occasion",
          url: '/vehicules-occasion/',
          icon: icons['vehiculesOccasion'].icon,
          description:
            'Une sélection contrôlée, garantie minimum 12 mois. Des prix transparents, sans mauvaises surprises.',
        },
        {
          title: 'Atelier',
          url: '/atelier/',
          icon: icons['atelier'].icon,
          description:
            'Entretien, réparations et révisions par des techniciens certifiés. Sans incidence sur la garantie.',
        },
        {
          title: 'Carrosserie',
          url: '/carrosserie/',
          icon: icons['carrosserie'].icon,
          description:
            'Remise en état professionnelle après accident ou choc. Peinture, débosselage et finition.',
        },
        {
          title: 'Location',
          url: '/location/',
          icon: icons['location'].icon,
          description:
            'Des véhicules disponibles rapidement pour tous vos besoins. Courte ou longue durée.',
        },
        {
          title: 'Entretien',
          url: '/entretien/',
          icon: icons['entretien'].icon,
          description:
            'Vidanges, contrôles et maintenance selon les normes constructeur. Préservez la valeur de votre véhicule.',
        },
        {
          title: 'Shop',
          url: '/shop/',
          icon: icons['shop'].icon,
          description:
            "Fruits, légumes, viande, pain frais cuit sur place et carburant. Tout ce qu'il faut, juste à côté de vous.",
        },
        {
          title: 'Racing',
          url: '/racing/',
          icon: icons['racing'].icon,
          description:
            'Préparation circuit, transport et mécanicien. Un service complet pour piloter sans vous soucier du reste.',
        },
      ],
    },
    {
      title: 'Le Garage',
      url: '#',
      submenu: [
        {
          title: 'Notre histoire',
          url: '/notre-histoire/',
          icon: icons['since'].icon,
        },
        {
          title: 'Team',
          url: '/team/',
          icon: icons['team'].icon,
        },
      ],
    },
    { title: 'Contact', url: '/contact/', isButton: true },
  ],
}
