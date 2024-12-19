class EventTestimonialsSlider {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.slider = this.wrapper.querySelector(".event-testimonials-slider__wrapper");
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
    // Set up the slider for side-by-side layout
    this.slider.style.display = "flex";
    this.slider.style.transition = "transform 0.4s ease-in-out";

    this.testimonials.forEach((testimonial) => {
      testimonial.style.flex = "0 0 100%"; // Each slide takes full width of the container
    });
  }

  addListeners() {
    if (this.prevButton) {
      this.prevButton.addEventListener("click", () => this.showPrevious());
    }

    if (this.nextButton) {
      this.nextButton.addEventListener("click", () => this.showNext());
    }
  }

  showPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.testimonialCount - 1; // Loop back to the last slide
    }
    this.updateSliderPosition();
    this.updateProgressBar();
  }

  showNext() {
    if (this.currentIndex < this.testimonialCount - 1) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0; // Loop back to the first slide
    }
    this.updateSliderPosition();
    this.updateProgressBar();
  }

  updateSliderPosition() {
    const offset = -this.currentIndex * 70; // Calculate offset based on currentIndex
    this.slider.style.transform = `translateX(${offset}%)`;
  }

  updateProgressBar() {
    if (this.progressBar) {
      // const progress = ((this.currentIndex + 1) / this.testimonialCount) * 100;
      // this.progressBar.style.width = `${progress}%`;
    }
  }
}

// Initialize the slider
document.addEventListener("DOMContentLoaded", () => {
  const testimonialSliders = document.querySelectorAll(".event-testimonials-slider");
  testimonialSliders.forEach((slider) => new EventTestimonialsSlider(slider));
});