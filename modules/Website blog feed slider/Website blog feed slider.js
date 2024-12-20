class BlogFeedSlider {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.sliderWrapper = this.wrapper.querySelector(".blog-feed-slider__wrapper");
    this.sliderInner = this.wrapper.querySelector(".blog-feed-slider__inner");
    this.slides = Array.from(this.wrapper.querySelectorAll(".testimonial"));
    this.prevButton = this.wrapper.querySelector("[data-testimonials-prev]");
    this.nextButton = this.wrapper.querySelector("[data-testimonials-next]");
    this.progressBar = this.wrapper.querySelector(".blog-feed-slider__navigation-progress");

    this.currentIndex = 0;
    this.slideCount = this.slides.length;

    this.init();
  }

  init() {
    this.setSliderStyles();
    this.addListeners();
    this.updateProgressBar();
  }

  setSliderStyles() {
    this.slides.forEach((slide) => {
      slide.style.flex = "0 0 100%";
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
      this.currentIndex = this.slideCount - 1;
    }
    this.updateSliderPosition();
    this.updateProgressBar();
  }

  showNext() {
    if (this.currentIndex < this.slideCount - 1) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
    this.updateSliderPosition();
    this.updateProgressBar();
  }

  updateSliderPosition() {
    const slideWidth = this.sliderWrapper.clientWidth;
    const offset = -this.currentIndex * slideWidth;
    this.sliderInner.style.transform = `translateX(${offset}px)`;
  }

  updateProgressBar() {
    if (this.progressBar) {
      const currentLabel = this.progressBar.querySelector("[data-progress-bar-current]");
      const totalLabel = this.progressBar.querySelector("[data-progress-bar-all]");
      const filledLine = this.progressBar.querySelector(".progress-bar__line-filled");
      const dot = this.progressBar.querySelector(".progress-bar__dot");

      if (currentLabel) currentLabel.textContent = String(this.currentIndex + 1).padStart(2, "0");
      if (totalLabel) totalLabel.textContent = String(this.slideCount).padStart(2, "0");

      const progress = this.slideCount > 1
        ? (this.currentIndex / (this.slideCount - 1)) * 100
        : 0;

      if (filledLine) filledLine.style.width = `${progress}%`;
      if (dot) dot.style.left = `${progress}%`;

      if (this.currentIndex === this.slideCount - 1 && totalLabel) {
        totalLabel.style.color = "var(--color-brand)";
      } else if (totalLabel) {
        totalLabel.style.color = "var(--color-brand-light)";
      }
    }
  }
}

// Initialize the slider
document.addEventListener("DOMContentLoaded", () => {
  const blogFeedSliders = document.querySelectorAll(".blog-feed-slider");
  blogFeedSliders.forEach((slider) => new BlogFeedSlider(slider));
});