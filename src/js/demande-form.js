const form = document.getElementById('demande-form')

if (form) {
  const demandes = JSON.parse(
    document.getElementById('demandes-data')?.textContent || '{}',
  )
  const { email, whatsapp } = form.dataset
  const textarea = form.elements.message
  const status = form.querySelector('.lead-form__status')

  // --- Préremplissage selon ?demande=slug ---
  const slug = new URLSearchParams(location.search).get('demande')
  const demande = demandes[slug]
  if (demande) {
    textarea.value = demande.message
    form.scrollIntoView({ block: 'start' })
  }

  // --- Validation (même logique que le formulaire véhicule) ---
  const messages = {
    valueMissing: 'Ce champ est requis.',
    typeMismatch: 'Format invalide.',
    patternMismatch: 'Format invalide.',
  }
  const showError = (input) => {
    const field = input.closest('.lead-field')
    const err = field.querySelector('.lead-error')
    if (input.validity.valid) {
      field.classList.remove('is-invalid')
      err.textContent = ''
      return true
    }
    field.classList.add('is-invalid')
    const key = Object.keys(messages).find((k) => input.validity[k])
    err.textContent = messages[key] ?? 'Champ invalide.'
    return false
  }

  const inputs = [...form.querySelectorAll('input, textarea')]
  inputs.forEach((input) => {
    input.addEventListener('blur', () => showError(input))
    input.addEventListener('input', () => {
      if (
        input.closest('.lead-field').classList.contains('is-invalid')
      )
        showError(input)
    })
  })

  // --- Construction du message ---
  const buildBody = (nl) => {
    const f = form.elements
    return [
      f.message.value.trim(),
      '',
      '—',
      `${f.firstName.value.trim()} ${f.lastName.value.trim()}`,
      `Tél. : ${f.phone.value.trim()}`,
      `Email : ${f.email.value.trim()}`,
    ].join(nl)
  }

  // --- Envoi ---
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const allValid = inputs.map(showError).every(Boolean)
    if (!allValid) {
      inputs.find((i) => !i.validity.valid)?.focus()
      return
    }

    const canal = e.submitter?.value ?? 'email'

    if (canal === 'whatsapp') {
      const text = encodeURIComponent(buildBody('\n'))
      window.open(
        `https://wa.me/${whatsapp}?text=${text}`,
        '_blank',
        'noopener',
      )
      status.textContent = 'WhatsApp s’ouvre dans un nouvel onglet.'
      return
    }

    const subject = encodeURIComponent(
      demande ? `Demande : ${demande.sujet}` : 'Demande de contact',
    )
    const body = encodeURIComponent(buildBody('\r\n'))
    location.href = `mailto:${email}?subject=${subject}&body=${body}`
    status.textContent = `Votre messagerie va s’ouvrir. Rien ne se passe ? Écrivez-nous directement à ${email}.`
  })
}
