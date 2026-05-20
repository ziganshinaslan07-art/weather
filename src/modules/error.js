export class CustomError extends Error {
    hideTimer

    showErrorModal(message, duration) {

        const popup = document.querySelector('.error-popup')
        const messageElement = document.querySelector('.error-popup-message')

        messageElement.textContent = message
        popup.classList.add('active')

        clearTimeout(this.hideTimer)

        this.hideTimer = setTimeout(this.closeModal, duration);
    }

    closeModal() {
        const popup = document.querySelector('.error-popup')
        popup.classList.remove('active')

        clearTimeout(this.hideTimer)
    }
}