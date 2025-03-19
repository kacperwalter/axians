class EventFormModule {
  constructor(container) {
    this.container = container;
    this.formContainer = this.container.querySelector('.website-multi-step-form__form');
    this.init();
  }

  init() {
    if (!this.formContainer) return;
    // Check if the iframe is already present
    const iframe = this.formContainer.querySelector('iframe');
    if (iframe) {
      this.attachLoadEvent(iframe);
    } else {
      // If the iframe hasn't been added yet, observe for its insertion.
      this.observer = new MutationObserver(this.observerCallback.bind(this));
      this.observer.observe(this.formContainer, { childList: true, subtree: true });
    }
  }

  observerCallback(mutations) {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const iframe = this.formContainer.querySelector('iframe');
        if (iframe) {
          this.attachLoadEvent(iframe);
          this.observer.disconnect();
          break;
        }
      }
    }
  }

  attachLoadEvent(iframe) {
    iframe.addEventListener('load', () => {
      this.onIframeLoaded();
    });
  }

  onIframeLoaded() {
    setTimeout(() => {
      this.formContainer.classList.add('loaded');
    }, 200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.website-multi-step-form');
  containers.forEach((container) => new EventFormModule(container));
});