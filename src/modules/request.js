import {errorPopup} from "./error.js";
import {renderLocation, renderClock, renderDescription, renderForecast, renderSupportingInformation, renderWeatherIcon} from "./setValues.js";
import { initForecastDayClick, initForecastHourClick } from "./extra.js"
import {animation} from "./animation";

function setControlsDisabled(disabled) {
    const searchButton = document.getElementById('search-button')
    const navigationButton = document.getElementById('navigation-button')
    const searchInput = document.querySelector('.header__search')

    searchButton.disabled = disabled
    navigationButton.disabled = disabled
    searchButton.classList.toggle('disabled', disabled)
    navigationButton.classList.toggle('disabled', disabled)

    searchInput.disabled = disabled
    searchInput.placeholder = disabled ? 'Processing...' : 'Search Location...'

    if (disabled) {
        searchInput.value = ''
    }
}

function showWeatherCard(show) {
    const meetingElement = document.querySelector('.meeting')
    const weatherCard = document.getElementById('main__card')
    const extraCard = document.querySelector('.main__card--extra')

    meetingElement.style.display = show ? 'none' : ''
    weatherCard.style.display = show ? 'flex' : 'none'
    extraCard.style.display = 'none'
}



function fetchWeather(url) {
    setControlsDisabled(true)

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Location not found!')
            }
            return response.json()
        })
        .then((data) => {
            renderLocation(data)
            renderClock(data)
            renderDescription(data)
            renderForecast(data)
            renderSupportingInformation(data)
            renderWeatherIcon(data)
            initForecastDayClick(data)
            initForecastHourClick(data)

            showWeatherCard(true)
            animation()

        })
        .catch((error) => {
            const message = error.message === 'Location not found!'
                ? 'Location not found!'
                : 'Произошла ошибка при загрузке данных!'

            if (message !== 'Location not found!') {
                console.log('Системная ошибка:', error)
            }

            errorPopup.showErrorModal(message, 1500)
        })
        .finally(() => {
            setControlsDisabled(false)
        })
}

export {fetchWeather}