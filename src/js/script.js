window.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu')

  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('hamburger_active')
    menu.classList.toggle('hide')
    menu.classList.toggle('show')
  })

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


  
})
