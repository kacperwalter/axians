const targetSelector = '.submitted-message'

const observerCallback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const targetElement = document.querySelector(targetSelector)

            if (targetElement) {
                const headingToRemove = document.querySelector(["[data-form-heading]"])
                const backgroundToAddMargin = document.querySelector("[data-form-background]")
                
                if (headingToRemove) {
                  headingToRemove.remove()
                }

                if (backgroundToAddMargin) {
                  backgroundToAddMargin.style.marginBottom = "10rem"
              }

                observer.disconnect()
                break
            }
        }
    }
}

const observer = new MutationObserver(observerCallback)

observer.observe(document.body, { childList: true, subtree: true })