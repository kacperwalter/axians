const targetSelector = '.submitted-message';

const observerCallback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                const headingToRemove = document.querySelector("[data-form-heading]");
                const elementToOffset = document.querySelector("[data-event-partner]");
                const eventForm = document.querySelector(".event-form__form");

                if (headingToRemove) {
                    headingToRemove.remove();
                }

                if (elementToOffset) {
                    elementToOffset.style.marginTop = "10rem";
                }
                
                if (eventForm) {
                    eventForm.style.backgroundColor = "transparent";
                    eventForm.style.boxShadow = "none";
                }

                observer.disconnect();
                break;
            }
        }
    }
};

const observer = new MutationObserver(observerCallback);
observer.observe(document.body, { childList: true, subtree: true });