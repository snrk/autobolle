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
    nom: 'Teixeira Oliveira',
    secteur: 'Atelier',
    fonction: 'Technicien automobile',
    image: img('luis-teixeira-oliveira'),
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
    fonction: 'Plate-forme logistique',
    image: img('arturo-torres'),
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
    prenom: 'Melissa',
    nom: 'Schafter',
    secteur: 'Station-service',
    fonction: 'Conseillère clientèle',
    image: img('melissa-schafter'),
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
    image: img('luis-da-silva'),
  },
  {
    prenom: 'Victor',
    nom: 'Bolle',
    secteur: 'Station-service',
    fonction: 'Conseiller clientèle',
    image: img('victor-bolle'),
  },

  // Apprentis
  {
    prenom: 'Luna',
    nom: 'Sechaud',
    secteur: 'Apprentis',
    fonction: 'Administration',
    image: img('luna-sechaud'),
  },
]
