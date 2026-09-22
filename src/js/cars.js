const CACHE_KEY = 'autobolle_cars'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24h en ms

async function getCars() {
  // Vérifier le cache
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    const { timestamp, data } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data
    }
  }

  // Fetch frais
  try {
    const res = await fetch(window.API_URL)
    const json = await res.json()
    const cars = json.content || json // selon la structure
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: cars }),
    )
    return cars
  } catch (err) {
    console.error('Erreur fetch voitures:', err)
    return []
  }
}

// Expose globalement pour les autres scripts (homepage, page voitures)
window.getCars = getCars
