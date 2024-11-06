document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY
    const heroMain = document.querySelector('[data-website-hero-main]')

    if (heroMain) {
      heroMain.style.transform = `translateY(${-scrollPosition * 0.2}px)`
    }
  })
})