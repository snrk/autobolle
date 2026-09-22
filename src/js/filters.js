// dérive les valeurs uniques présentes dans le stock
export function buildFilters(cars) {
  const makes = [
    ...new Set(cars.map((c) => c.makeKey).filter(Boolean)),
  ].sort()
  const fuels = [
    ...new Set(cars.map((c) => c.fuelType).filter(Boolean)),
  ].sort()
  return { makes, fuels }
}

const FUEL_LABELS = {
  petrol: 'Essence',
  diesel: 'Diesel',
  electric: 'Électrique',
  hybrid: 'Hybride',
  'plug-in-hybrid': 'Hybride rechargeable',
  'hev-petrol': 'Hybride',
  'phev-petrol': 'Hybride rechargeable',
}
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : '')

// tranches fixes pour les plages continues
const PRICE_RANGES = [
  { label: '< 20’000', min: 0, max: 20000 },
  { label: '20–40’000', min: 20000, max: 40000 },
  { label: '40–70’000', min: 40000, max: 70000 },
  { label: '> 70’000', min: 70000, max: Infinity },
]
const YEAR_RANGES = [
  { label: '2020+', min: 2020, max: Infinity },
  { label: '2015–2019', min: 2015, max: 2019 },
  { label: '< 2015', min: 0, max: 2014 },
]
const POWER_RANGES = [
  { label: '< 100 kW', min: 0, max: 100 },
  { label: '100–200 kW', min: 100, max: 200 },
  { label: '> 200 kW', min: 200, max: Infinity },
]

export function renderFilterBar(cars) {
  const { makes, fuels } = buildFilters(cars)
  const group = (name, label, items) => `
  <div class="filter-row">
    <span class="filter-row__label">${label}</span>
    <div class="filter-row__scroll">
      ${items
        .map(
          (it) =>
            `<button class="filter-btn" data-group="${name}" data-value="${it.value}">${it.label}</button>`,
        )
        .join('')}
    </div>
  </div>`

  return `
    <div class="filters">
      ${group(
        'make',
        'Marque',
        makes.map((m) => ({ value: m, label: cap(m) })),
      )}
      ${group(
        'fuel',
        'Énergie',
        fuels.map((f) => ({
          value: f,
          label: FUEL_LABELS[f] ?? cap(f),
        })),
      )}
      ${group(
        'price',
        'Prix',
        PRICE_RANGES.map((r, i) => ({ value: i, label: r.label })),
      )}
      ${group(
        'year',
        'Année',
        YEAR_RANGES.map((r, i) => ({ value: i, label: r.label })),
      )}
      ${group(
        'power',
        'Puissance',
        POWER_RANGES.map((r, i) => ({ value: i, label: r.label })),
      )}
      <button class="filter-reset">Réinitialiser</button>
    </div>`
}

// applique l'état des filtres à la liste
export function applyFilters(cars, active) {
  return cars.filter((c) => {
    if (active.make && c.makeKey !== active.make) return false
    if (active.fuel && c.fuelType !== active.fuel) return false
    if (active.price != null) {
      const r = PRICE_RANGES[active.price]
      if (c.price < r.min || c.price >= r.max) return false
    }
    if (active.year != null) {
      const r = YEAR_RANGES[active.year]
      if (
        c.firstRegistrationYear < r.min ||
        c.firstRegistrationYear > r.max
      )
        return false
    }
    if (active.power != null) {
      const r = POWER_RANGES[active.power]
      if (c.kiloWatts < r.min || c.kiloWatts >= r.max) return false
    }
    return true
  })
}

export function initScrollIndicators(root) {
  root.querySelectorAll('.filter-row').forEach((row) => {
    const scroll = row.querySelector('.filter-row__scroll')
    if (!scroll) return
    const update = () => {
      const max = scroll.scrollWidth - scroll.clientWidth
      row.classList.toggle(
        'can-scroll-right',
        scroll.scrollLeft < max - 1,
      )
      row.classList.toggle('can-scroll-left', scroll.scrollLeft > 1)
    }
    scroll.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update() // état initial
  })
}
