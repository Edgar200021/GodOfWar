window.addEventListener('DOMContentLoaded', () => {
  //!Hamburger

  const hamburgerBtn = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu')

  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('hamburger_active')
    menu.classList.toggle('hide')
    menu.classList.toggle('show')
  })

  //! Timer

  const deadline = new Date('2023-06-20')

  function timeRemaining(deadline) {
    const remainingEnd = new Date(deadline) - new Date(),
      days = Math.floor(remainingEnd / 1000 / 60 / 60 / 24),
      hours = Math.floor((remainingEnd / 1000 / 60 / 60) % 24),
      minutes = Math.floor((remainingEnd / 1000 / 60) % 60),
      seconds = Math.floor((remainingEnd / 1000) % 60)

    return {
      time: remainingEnd,
      days,
      hours,
      minutes,
      seconds,
    }
  }

  function getZero(num) {
    return num >= 1 && num < 10 ? `0${num}` : num < 0 ? '00' : num
  }

  function setTimer(timerBlock, deadline) {
    const block = document.querySelector(timerBlock),
      days = block.querySelector('#days'),
      hours = block.querySelector('#hours'),
      minutes = block.querySelector('#minutes'),
      seconds = block.querySelector('#seconds'),
      interval = setInterval(updateTimer, 1000)

    function updateTimer() {
      const time = timeRemaining(deadline),
        allTime = time.time

      days.innerText = getZero(time.days)
      hours.innerText = getZero(time.hours)
      minutes.innerText = getZero(time.minutes)
      seconds.innerText = getZero(time.seconds)

      if (allTime < 0) {
        clearInterval(interval)
      }
    }
  }

  setTimer('.timer__values', deadline)

  //! Modal
  const editions = document.querySelector('.editions'),
    modalCloseBtn = document.querySelector('.close-btn'),
    modal = document.querySelector('.modal'),
	form = modal.querySelector('.form')

  editions.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('card__btn')) {
      const parent = e.target.closest('.card'),
        title = parent.querySelector('.card__title').innerText,
        price = parent.querySelector('.card__price').innerText,
        formTitle = form.querySelector('.form__subtitle'),
        formPrice = form.querySelector('.form__summa-price')

      modal.classList.add('modal_active')
      form.classList.add('form_active')

      formTitle.innerText = title
      formPrice.innerText = price

      document.body.style.overflow = 'hidden'
    }
  })

  modalCloseBtn.addEventListener('click', (e) => {
    e.preventDefault()

    modal.classList.remove('modal_active')
    form.classList.remove('form_active')
    document.body.style.overflow = 'auto'
  })

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal_active')) {
      e.target.classList.remove('modal_active')
	  form.classList.remove('form_active')
	  document.body.style.overflow = 'auto'
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal_active')) {
      modal.classList.remove('modal_active')
	  form.classList.remove('form_active')
	  document.body.style.overflow = 'auto'
    }
  })
})
