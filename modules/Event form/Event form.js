class EventFormModule {
    constructor(container) {
      this.container = container;
      this.init();
    }
  
    init() {
      this.observer = new MutationObserver(this.observerCallback.bind(this));
      this.observer.observe(this.container, { childList: true, subtree: true });
    }
  
    observerCallback(mutations) {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const submittedMessage = this.container.querySelector('.submitted-message');
          if (submittedMessage) {
            const headingToRemove = this.container.querySelector('[data-form-heading]');
            if (headingToRemove) {
              headingToRemove.remove();
            }

            const elementToOffset = this.container.querySelector('[data-event-partner]');
            if (elementToOffset) {
              elementToOffset.style.marginTop = '10rem';
            }
            const eventForm = this.container.querySelector('.event-form__form');
            if (eventForm) {
              eventForm.style.backgroundColor = 'transparent';
              eventForm.style.boxShadow = 'none';
            }
  
            this.observer.disconnect();
            break;
          }
        }
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.event-form');
    containers.forEach((container) => new EventFormModule(container));
  });