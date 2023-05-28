window.addEventListener('DOMContentLoaded', () => {
  //!Hamburger

  const hamburgerBtn = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu')

  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('hamburger_active')
    menu.classList.toggle('hide')
    menu.classList.toggle('show')
  })

  //! Scroll

  const linkMenu = document.querySelectorAll('.menu__list')

  linkMenu.forEach((menu) => {
    menu.addEventListener('click', (e) => {
      e.preventDefault()
      const btn = e.target
      if (!btn.classList.contains('menu__link')) return

      const section = document.querySelector(
        `#${btn.getAttribute('href').slice(1)}`
      )

      section.scrollIntoView({ behavior: 'smooth' })
    })
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

  //! Video
  const videoBtn = document.querySelector('.about__video-btn')

  let isPlayed = false

  function playVideo(event, playBtn) {
    const parent = event.target.closest('.about__video-box'),
      videoControl = event.target.closest('.about__video-control'),
      video = parent.firstElementChild

    if (!video) return

    isPlayed = !isPlayed
    isPlayed ? video.play() : video.pause()
    videoControl.classList.toggle('fade', isPlayed)

    playBtn.innerText = isPlayed ? 'Pause' : 'Play'
  }

  videoBtn.addEventListener('click', (e) => {
    playVideo(e, videoBtn)
  })

  const explore = document.querySelector('.explore')

  function togglerequirements(e) {
    const self = e.target

    if (self.id === 'explore__checkbox' || self.id === 'limited__checkbox') {
      const parent = self.closest('.explore__box'),
        toggleBox = self.closest('.explore__toggle'),
        list = parent.querySelectorAll('ul')

      list[0].classList.toggle('visible')
      list[1].classList.toggle('visible')

      toggleBox.nextElementSibling.classList.toggle('active')
      toggleBox.previousElementSibling.classList.toggle('active')
    }
  }

  explore.addEventListener('click', togglerequirements)

  //! Slider
  const slides = document.querySelectorAll('.slide'),
    prevBtn = document.querySelector('.slider__btn_prev'),
    nextBtn = document.querySelector('.slider__btn_next')

  let currentSlide = 1,
    maxSlide = slides.length

  function goToSlide(slide) {
    slides.forEach((item) => {
      item.style.transform = `translateX(-${slide * 70}%)`
    })
  }

  goToSlide(currentSlide)

  function nextSlide() {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0
    } else {
      currentSlide++
    }

    goToSlide(currentSlide)
  }

  function prevSlide() {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1
    } else {
      currentSlide--
    }

    goToSlide(currentSlide)
  }

  nextBtn.addEventListener('click', nextSlide)
  prevBtn.addEventListener('click', prevSlide)
  //!  Accordeon

  const accordeon = document.querySelector('.accordeon')

  accordeon.addEventListener('click', (e) => {
    const self = e.target
    const btn = self.closest('.accordeon__btn')
    if (!btn) return

    const parent = self.closest('.accordeon__action'),
      actionSpan = parent.querySelector('.action-span'),
      content = parent.nextElementSibling

    content.classList.toggle('accordeon__content_active')
    content.style.maxHeight = content.classList.contains(
      'accordeon__content_active'
    )
      ? content.scrollHeight + 'px'
      : 0
    actionSpan.classList.toggle('action-span_active')
    console.log(self.lastElementChild)
  })

  //! intersection Observer,

  const editionSection = document.querySelector('.editions'),
    cards = editionSection.querySelectorAll('.card'),
    controller = document.querySelector('.controller')

  function editionCallback(entries, observer) {
    const section = entries[0].target

    if (entries[0].isIntersecting) {
      section.style.transform = 'translateY(0)'
      section.style.opacity = 1
      observer.unobserve(section)
    }
  }

  const editionObserver = new IntersectionObserver(editionCallback, {
    threshold: 0.3,
  })
  editionObserver.observe(editionSection)

  function cardCallback(entries, observer) {
    if (entries[0].isIntersecting) {
      entries.forEach((entry) => {
        entry.target.style.animationPlayState = 'running'
        observer.unobserve(entry.target)
      })
    }
  }

  const cardObserver = new IntersectionObserver(cardCallback, {
    threshold: 0.2,
  })

  cards.forEach((card) => cardObserver.observe(card))

  function controllerCallback(entries, observer) {
    const section = entries[0].target

    if (entries[0].isIntersecting) {
      const info = section.querySelector('.controller__info'),
        imgBox = section.querySelector('.controller__img-box'),
        img = imgBox.querySelector('.controller__img')

      section.style.transform = 'translateY(0)'
      section.style.opacity = 1
      info.style.animationPlayState = 'running'
      imgBox.style.animationPlayState = 'running'
      img.style.animationPlayState = 'running'

      observer.unobserve(section)
    }
  }

  const controllerObserver = new IntersectionObserver(controllerCallback, {
    threshold: 0.5,
  })

  controllerObserver.observe(controller)

  const exploreBox = document.querySelectorAll('.explore__box')

  function exploreCallback(entries, observer) {
    const section = entries[0].target,
      img = section.querySelector('.explore-card__img-box'),
      info = section.querySelector('.explore-card__info'),
      animatedBox = section.querySelector('.explore__animated-box')

    if (entries[0].isIntersecting) {
      img.style.animationPlayState = 'running'
      info.style.animationPlayState = 'running'
      animatedBox.style.animationPlayState = 'running'
      observer.unobserve(section)
    }
  }

  const exploreObserver = new IntersectionObserver(exploreCallback, {
    threshold: 0.7,
  })

  exploreBox.forEach((explore) => {
    exploreObserver.observe(explore)
  })

  const aboutSection = document.querySelector('.about')

  function aboutCallback(entries, observer) {
    const section = entries[0].target,
      videoBox = section.querySelector('.about__video-box')

    if (entries[0].isIntersecting) {
      section.style.transform = 'translateY(0)'
      section.style.opacity = 1
      videoBox.style.animationPlayState = 'running'
      observer.unobserve(section)
    }
  }

  const aboutObserver = new IntersectionObserver(aboutCallback, {
    threshold: 0.1,
  })

  aboutObserver.observe(aboutSection)

  const newsSection = document.querySelector('.news')

  function newsCallback(entries, observer) {
    const section = entries[0].target

    if (entries[0].isIntersecting) {
      section.style.transform = 'translateY(0)'
      section.style.opacity = 1
      observer.unobserve(section)
    }
  }

  const newsObserver = new IntersectionObserver(newsCallback, {
    threshold: 0.6,
  })

  newsObserver.observe(newsSection)

  const faqSection = document.querySelector('.faq')

  function faqCallback(entries, observer) {
    const section = entries[0].target,
      title = section.querySelector('.faq__title'),
      accordeon = section.querySelector('.accordeon')

    if (entries[0].isIntersecting) {
      title.style.animationPlayState = 'running'
      accordeon.style.animationPlayState = 'running'
      observer.unobserve(section)
    }
  }

  const faqObserver = new IntersectionObserver(faqCallback, { threshold: 0.5 })

  faqObserver.observe(faqSection)

  const footer = document.querySelector('.footer')

  function footerCallback(entries, observer) {
    const footer = entries[0].target

    if (entries[0].isIntersecting) {
      footer.style.transform = 'translateY(0)'
      footer.style.opacity = 1
      observer.unobserve(footer)
    }
  }

  const footerObserver = new IntersectionObserver(footerCallback, {
    threshold: 0.1,
  })

  footerObserver.observe(footer)
})
