import {requestFetch} from "./request.js";

export function searchEnter() {
    const searchInput = document.querySelector('.header__search')
    const searchButton = document.getElementById('search-button')
    const navigationButton = document.getElementById('navigation-button')
    const form = document.querySelector('.header__container')

    searchButton.addEventListener('click', () => {})

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            const formData = new FormData(form);
            const location_API = `http://api.weatherapi.com/v1/forecast.json?key=357b0f1c8fdb446a869135515261605&q=${formData.get('location')}&days=7`

            requestFetch(location_API, searchButton, navigationButton, searchInput)
        }
    })
}

