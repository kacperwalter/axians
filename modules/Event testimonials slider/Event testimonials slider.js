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
    // Adjust the offset if needed. Currently each slide is 100% width, 
    // so translating by 100% per slide might be what you want.
    const offset = -this.currentIndex * 100;
    this.slider.style.transform = `translateX(${offset}%)`;
  }

  updateProgressBar() {
    if (this.progressBar) {
      const currentLabel = this.progressBar.querySelector("[data-progress-bar-current]");
      const totalLabel = this.progressBar.querySelector("[data-progress-bar-all]");
      const filledLine = this.progressBar.querySelector(".progress-bar__line-filled");
      const dot = this.progressBar.querySelector(".progress-bar__dot");
  
      // Update numbers
      if (currentLabel) currentLabel.textContent = String(this.currentIndex + 1).padStart(2, "0");
      if (totalLabel) totalLabel.textContent = String(this.testimonialCount).padStart(2, "0");
  
      // Calculate progress as a percentage of how far along we are
      const progress = this.testimonialCount > 1
        ? (this.currentIndex / (this.testimonialCount - 1)) * 100
        : 0;
  
      // Update the line and dot positions
      if (filledLine) {
        filledLine.style.width = progress + "%";
      }
  
      if (dot) {
        dot.style.left = progress + "%";
      }
  
      // Change the colors when on the last slide
      if (this.currentIndex === this.testimonialCount - 1) {
        if (totalLabel) totalLabel.style.color = "var(--color-brand)";
      } else {
        if (totalLabel) totalLabel.style.color = "var(--color-brand-light)";
      }
    }
  }
}

// Initialize the slider
document.addEventListener("DOMContentLoaded", () => {
  const testimonialSliders = document.querySelectorAll(".event-testimonials-slider");
  testimonialSliders.forEach((slider) => new EventTestimonialsSlider(slider));
});