class EventTestimonialsSlider {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.sliderWrapper = this.wrapper.querySelector(".event-testimonials-slider__wrapper");
    this.sliderInner = this.wrapper.querySelector(".event-testimonials-slider__inner");
    this.testimonials = Array.from(this.wrapper.querySelectorAll(".testimonial"));
    this.prevButton = this.wrapper.querySelector("[data-testimonials-prev]");
    this.nextButton = this.wrapper.querySelector("[data-testimonials-next]");
    this.progressBar = this.wrapper.querySelector(".event-testimonials-slider__navigation-progress");

    this.currentIndex = 0;
    this.testimonialCount = this.testimonials.length;

    this.init();
  }

  init() {
    this.setSliderStyles();
    this.addListeners();
    this.updateProgressBar();
  }

  setSliderStyles() {
    // Each slide should already be full width in CSS.
    this.testimonials.forEach((testimonial) => {
      testimonial.style.flex = "0 0 100%";
    });
  }

  addListeners() {
    if (this.prevButton) {
      this.prevButton.addEventListener("click", () => {
        this.showPrevious();
      });
    }

    if (this.nextButton) {
      this.nextButton.addEventListener("click", () => {
        this.showNext();
      });
    }
  }

  showPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.testimonialCount - 1;
    }
    this.updateSliderPosition();
    this.updateProgressBar();
  }

  showNext() {
    if (this.currentIndex < this.testimonialCount - 1) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
    this.updateSliderPosition();
    this.updateProgressBar();
  }

  updateSliderPosition() {
    const offset = -this.currentIndex * 100;
    this.sliderInner.style.transform = `translateX(${offset}%)`;
  }

  updateProgressBar() {
    if (this.progressBar) {
      const currentLabel = this.progressBar.querySelector("[data-progress-bar-current]");
      const totalLabel = this.progressBar.querySelector("[data-progress-bar-all]");
      const filledLine = this.progressBar.querySelector(".progress-bar__line-filled");
      const dot = this.progressBar.querySelector(".progress-bar__dot");

      if (currentLabel) currentLabel.textContent = String(this.currentIndex + 1).padStart(2, "0");
      if (totalLabel) totalLabel.textContent = String(this.testimonialCount).padStart(2, "0");

      const progress = this.testimonialCount > 1
        ? (this.currentIndex / (this.testimonialCount - 1)) * 100
        : 0;

      if (filledLine) filledLine.style.width = `${progress}%`;
      if (dot) dot.style.left = `${progress}%`;

      if (this.currentIndex === this.testimonialCount - 1 && totalLabel) {
        totalLabel.style.color = "var(--color-brand)";
      } else if (totalLabel) {
        totalLabel.style.color = "var(--color-brand-light)";
      }
    }
  }
}

// Initialize the slider
document.addEventListener("DOMContentLoaded", () => {
  const testimonialSliders = document.querySelectorAll(".event-testimonials-slider");
  testimonialSliders.forEach((slider) => new EventTestimonialsSlider(slider));
});