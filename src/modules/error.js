class ErrorPopup extends Error {
    #hideTimer

    showErrorModal(message, duration = 1500) {

        const popup = document.querySelector('.error-popup')
        const messageElement = document.querySelector('.error-popup-message')

        messageElement.textContent = message
        popup.classList.add('active')

        clearTimeout(this.#hideTimer)

        this.#hideTimer = setTimeout(this.closeModal, duration);
    }

    closeModal() {
        document.querySelector('.error-popup').classList.remove('active')
        clearTimeout(this.#hideTimer)
    }
}

export const errorPopup = new ErrorPopup();