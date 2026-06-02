import {fetchWeather} from "./request.js";

const API_KEY = '01890537221a47ba8c8195027262405';
const API_BASE = 'https://api.weatherapi.com/v1/forecast.json';
const FORECAST_DAYS = 14;

export function initSearch() {

    const searchInput = document.querySelector('.header__search')
    const searchButton = document.getElementById('search-button')
    const headerForm = document.querySelector('.header__container')

    searchButton.addEventListener('click', () => {})

    searchInput.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return
        event.preventDefault()

        const location = new FormData(headerForm).get('location')
        fetchWeather(`${API_BASE}?key=${API_KEY}&q=${location}&days=${FORECAST_DAYS}`)

        document.getElementById('cardDays').scrollTo({
            left: 0,
            behavior: 'smooth'
        });

    })

    headerForm.addEventListener('click', (event) => {
        const clicked = event.target.closest('button')
        if (!clicked || clicked.disabled || !(clicked.id === 'search-button' || clicked.id === 'navigation-button')) return

        const location = new FormData(headerForm).get('location')

        const url = clicked.id === 'search-button'
            ? `${API_BASE}?key=${API_KEY}&q=${location}&days=${FORECAST_DAYS}`
            : `${API_BASE}?key=${API_KEY}&q=auto:ip&days=${FORECAST_DAYS}`

        fetchWeather(url)

        document.getElementById('cardDays').scrollTo({
            left: 0,
            behavior: 'smooth'
        });

    })
}

