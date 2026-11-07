const TEAM_IMG = './src/assets/images/team/'
const img = (slug) => TEAM_IMG + slug + '.png'

export default [
  // Direction
  {
    prenom: 'Pascal',
    nom: 'Bolle',
    secteur: 'Direction',
    fonction: 'Fondateur',
    image: img('pascal-bolle'),
  },
  {
    prenom: 'David',
    nom: 'Bolle',
    secteur: 'Direction',
    fonction: 'Administrateur',
    image: img('david-bolle'),
  },
  {
    prenom: 'Julia',
    nom: 'Bolle',
    secteur: 'Direction',
    fonction: 'Administration & ressources humaines',
    image: img('julia-bolle'),
  },

  // Vente / Service après-vente
  {
    prenom: 'Thomas',
    nom: 'Mouren',
    secteur: 'Vente / Service après-vente',
    fonction: 'Responsable accueil SAV & vente automobile',
    image: img('thomas-mouren'),
  },
  {
    prenom: 'Joshua',
    nom: 'Streckeisen',
    secteur: 'Vente / Service après-vente',
    fonction: 'Conseiller accueil SAV',
    image: img('joshua-streckeisen'),
  },

  // Atelier
  {
    prenom: 'Luis',
    nom: 'Teixeira',
    secteur: 'Atelier',
    fonction: 'Technicien automobile',
    image: null,
  },
  {
    prenom: 'Vasco',
    nom: 'Teixeira Silva',
    secteur: 'Atelier',
    fonction: 'Technicien automobile',
    image: img('vasco-teixeira-silva'),
  },
  {
    prenom: 'Arturo',
    nom: 'Torres',
    secteur: 'Atelier',
    fonction: 'Technicien automobile',
    image: null,
  },

  // Station-service
  {
    prenom: 'Barbara',
    nom: 'Guerra',
    secteur: 'Station-service',
    fonction: 'Responsable station-service',
    image: img('barbara-guerra'),
  },
  {
    prenom: 'Alex',
    nom: 'Vicente Geraldo',
    secteur: 'Station-service',
    fonction: 'Conseiller clientèle',
    image: img('alex-vicente-geraldo'),
  },
  {
    prenom: 'Luis',
    nom: 'Da Silva',
    secteur: 'Station-service',
    fonction: 'Conseiller clientèle',
    image: null,
  },
  {
    prenom: 'Victor',
    nom: 'Bolle',
    secteur: 'Station-service',
    fonction: 'Conseiller clientèle',
    image: null,
  },

  // Apprentis
  {
    prenom: 'Luna',
    nom: 'Sechaud',
    secteur: 'Apprentis',
    fonction: 'Apprentie employée de commerce',
    image: null,
  },
  {
    prenom: 'Erik',
    nom: 'Muhja',
    secteur: 'Apprentis',
    fonction: 'Apprenti commerce de détail',
    image: null,
  },
  {
    prenom: 'Marc',
    nom: 'Cabaret',
    secteur: 'Apprentis',
    fonction:
      'Stage de 6 mois · École des métiers, CFC mécatronicien',
    image: null,
  },
]
