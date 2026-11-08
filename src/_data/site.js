const env = process.env.ELEVENTY_ENV || 'development'

const urls = {
  production: {
    url: 'https://autobolle.ch',
    apiUrl: 'https://autobolle.ch/getCars.php',
  },
  liveAb: {
    url: 'https://autobolle.ch/ab',
    apiUrl: 'https://autobolle.ch/ab/getCars.php',
  },
  liveTest: {
    url: 'https://gabrielbuser.ch/ab',
    apiUrl: 'https://gabrielbuser.ch/ab/getCars.php',
  },
  development: {
    url: 'http://localhost:8080',
    apiUrl: '/dummy-cars.json',
  },
}

const { url, apiUrl } = urls[env] ?? urls.development

export default {
  type: 'website',
  buildTime: new Date(),
  url,
  name: 'Garage Carrosserie Autobolle',
  twitter: '',
  metaTitle: 'Votre garagiste à Tolochenaz, sortie Morges-Ouest',
  metaDescription:
    "Achat et vente de véhicules neufs et d'occasions. Atelier mécanique agréé multimarques avec service de gardiennage.",
  metaImage: './src/assets/images/ab_logo.jpg',
  metaImageDescription: 'Logo Garage carrosserie Autobolle',
  apiUrl,
  annee: new Date().getFullYear(),
}
