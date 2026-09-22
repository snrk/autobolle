import icons, { specItem } from '/js/svgRuntime.js'

const sep = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
const chf = (n) => `CHF ${sep(n)}.–`
const km = (n) => `${sep(n)} km`
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : '')
const fuels = {
  'petrol': 'Essence',
  'diesel': 'Diesel',
  'electric': 'Électrique',
  'hybrid': 'Hybride',
  'plug-in-hybrid': 'Hybride rechargeable',
}

export function renderCard(car) {
  const imgs = (car.images ?? []).map((i) => i.url)
  const title = `${cap(car.makeKey)} ${car.versionFullName ?? cap(car.modelKey)}`
  const ch = Math.round(car.kiloWatts * 1.35962)
  return `
    <a class="car-card" href="${window.BASE_PATH}/vehicules-occasion/?id=${car.id}" data-id="${car.id}">
      <div class="car-card__img">
        ${
          imgs.length
            ? `<img src="${imgs[0]}" alt="${title}" loading="lazy" data-imgs='${JSON.stringify(imgs)}'>`
            : '<div class="car-card__placeholder"></div>'
        }
      </div>
      <div class="car-card__body">
        <h2 class="car-card__title">${title}</h2>
        <p class="car-card__price">${chf(car.price)}</p>
        <div class="car-card__footer">
            <ul class="car-card__specs">
                ${specItem('year', car.firstRegistrationYear)}
                ${specItem('mileage', km(car.mileage))}
                ${specItem('fuel', fuels[car.fuelType] ?? cap(car.fuelType))}
                ${specItem('power', `${car.kiloWatts} kW (${ch} ch)`)}
            </ul>
            <span class="car-card__arrow">${icons.arrow.icon}</span>
        </div>
      </div>
    </a>`
}

export function attachImageFallback(root) {
  root.querySelectorAll('.car-card__img').forEach((box) => {
    const img = box.querySelector('img')
    if (!img) {
      box.classList.add('is-loaded')
      return
    } // placeholder : pas de shimmer
    const urls = JSON.parse(img.dataset.imgs)
    let i = 0
    const done = () => {
      img.classList.add('is-loaded')
      box.classList.add('is-loaded')
    }
    if (img.complete && img.naturalWidth)
      done() // déjà en cache
    else img.addEventListener('load', done)
    img.addEventListener('error', () => {
      if (++i < urls.length) img.src = urls[i]
      else
        img.replaceWith(
          Object.assign(document.createElement('div'), {
            className: 'car-card__placeholder',
          }),
        )
    })
  })
}
