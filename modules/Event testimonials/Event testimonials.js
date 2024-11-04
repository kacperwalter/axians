document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll("[data-testimonial]")
  const prevButton = document.querySelector("[data-testimonials-prev]")
  const nextButton = document.querySelector("[data-testimonials-next]")
  let currentIndex = 0

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle("is-hidden", i !== index)
    })
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1
    showTestimonial(currentIndex)
  })

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0
    showTestimonial(currentIndex)
  })

  showTestimonial(currentIndex)
})