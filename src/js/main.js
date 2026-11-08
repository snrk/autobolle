const annee = document.getElementById('annee')
if (annee) annee.textContent = new Date().getFullYear()

/*ScrollTop*/
const toTop = document.querySelector('.to-top')
addEventListener(
  'scroll',
  () => {
    toTop.classList.toggle('is-visible', scrollY > innerHeight * 2)
  },
  { passive: true },
)
toTop.addEventListener('click', () =>
  scrollTo({ top: 0, behavior: 'smooth' }),
)
