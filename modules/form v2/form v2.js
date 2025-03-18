class FormV2Module {
  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    this.checkSubmittedMessage();

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          this.checkSubmittedMessage();
        }
      });
    });
    this.observer.observe(this.container, { childList: true, subtree: true });
  }

  checkSubmittedMessage() {
    const submittedMessage = this.container.querySelector('.submitted-message');
    if (submittedMessage) {
      const formElement = this.container.querySelector('.forms_v2_form');
      if (formElement) {
        formElement.style.boxShadow = 'none';
        formElement.style.backgroundColor = 'transparent';
      }
      submittedMessage.style.color = 'white';
      submittedMessage.style.fontSize = '32px';

      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.section_form_v2');
  containers.forEach((container) => new FormV2Module(container));
});