const isProduction = process.env.ELEVENTY_ENV === 'production'
const isLiveTest = process.env.ELEVENTY_ENV === 'liveTest'

export default {
  type: 'website',
  buildTime: new Date(),
  url: isProduction
    ? 'https://autobolle.ch'
    : isLiveTest
      ? 'https://gabrielbuser.ch/ab'
      : 'http://localhost:8080',
  name: 'Garage Carrosserie Autobolle',
  twitter: '',
  metaTitle: 'Votre garagiste à Tolochenaz, sortie Morges-Ouest',
  metaDescription:
    "Achat et vente de véhicules neufs et d'occasions. Atelier mécanique agréé multimarques avec service de gardiennage.",
  metaImage: './src/assets/images/ab_logo.jpg',
  metaImageDescription: 'Logo Garage carrosserie Autobolle',
  apiUrl: isProduction
    ? 'https://autobolle.ch/getCars.php'
    : isLiveTest
      ? 'https://gabrielbuser.ch/ab/getCars.php'
      : '/dummy-cars.json',
  annee: new Date().getFullYear(),
}
