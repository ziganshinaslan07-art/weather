import {CustomError} from "./error.js";
import {setLocation, setTime, setDescription, setForecast, setSupportingInformation, setIcon} from "./setValues.js";

function request(event, form) {
    const button = event.target.closest('button');
    if (!button || button.disabled) return

    const searchButton = document.getElementById('search-button');
    const navigationButton = document.getElementById('navigation-button');
    const inputElement = document.querySelector('.header__search');

    searchButton.disabled = true;
    searchButton.classList.add('disabled');
    navigationButton.disabled = true;
    navigationButton.classList.add('disabled');

    let location_API = ''

    if (button.id === 'search-button') {
        const formData = new FormData(form);
        location_API = `http://api.weatherapi.com/v1/forecast.json?key=357b0f1c8fdb446a869135515261605&q=${formData.get('location')}&days=7`
    }

    if (button.id === 'navigation-button') {
        location_API = 'http://api.weatherapi.com/v1/forecast.json?key=357b0f1c8fdb446a869135515261605&q=auto:ip&days=7'
    }

    inputElement.disabled = true
    inputElement.value = "";
    inputElement.placeholder = "Processing...";

    requestFetch(location_API, searchButton, navigationButton, inputElement)
}

function requestFetch(location_API, searchButton, navigationButton, inputElement) {
    fetch(location_API)
        .then(response => {
            if (!response.ok) {
                throw new CustomError('Location not found!');
            }
            return response.json();
        })
        .then(data => {
            const mainCard = document.querySelector('.main__card')
            const meetingElement = document.querySelector('.meeting')

            meetingElement.style.display = 'none'
            mainCard.style.display = 'flex'

            console.log(data)
            setLocation(data)
            setTime(data)
            setDescription(data)
            setForecast(data)
            setSupportingInformation(data)
            setIcon(data)
        })
        .catch(error => {
            if (error instanceof CustomError) {
                error.showErrorModal('Location not found!', 1500);
            } else {
                console.error('Системная ошибка:', error);

                const genericError = new CustomError();
                genericError.showErrorModal('Произошла ошибка при загрузке данных!', 1500);
            }
        })
        .finally(() => {
            searchButton.disabled = false;
            searchButton.classList.remove('disabled');
            navigationButton.disabled = false;
            navigationButton.classList.remove('disabled');
            inputElement.disabled = false;
            inputElement.placeholder = "Search Location..."
            inputElement.value = ""
        })
}

export {request, requestFetch}