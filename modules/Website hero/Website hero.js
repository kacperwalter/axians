document.addEventListener('DOMContentLoaded', () => {
  const heroMain = document.querySelector('[data-website-hero-main]');

  if (!heroMain) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    heroMain.style.transform = `translateY(-50%, ${-scrollPosition * 0.2}px)`;
  });
});