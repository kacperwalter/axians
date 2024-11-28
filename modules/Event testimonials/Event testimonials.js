class EventTestimonials {
  constructor(wrapper) {
    this.wrapper = wrapper
    this.testimonials = this.wrapper.querySelectorAll("[data-testimonial]")
    this.prevButton = this.wrapper.querySelector("[data-testimonials-prev]")
    this.nextButton = this.wrapper.querySelector("[data-testimonials-next]")
    this.currentIndex = 0

    this.addListeners()
    this.showTestimonial(this.currentIndex)
  }

  addListeners() {
    if (this.prevButton) {
      this.prevButton.addEventListener("click", () => {
        this.currentIndex =
          this.currentIndex > 0 ? this.currentIndex - 1 : this.testimonials.length - 1
        this.showTestimonial(this.currentIndex)
      })
    }

    if (this.nextButton) {
      this.nextButton.addEventListener("click", () => {
        this.currentIndex =
          this.currentIndex < this.testimonials.length - 1 ? this.currentIndex + 1 : 0
        this.showTestimonial(this.currentIndex)
      })
    }
  }

  showTestimonial(index) {
    this.testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle("is-hidden", i !== index)
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const testimonialWrappers = document.querySelectorAll(".event-testimonials__wrapper")
  testimonialWrappers.forEach((wrapper) => new EventTestimonials(wrapper))
})