import { setAnimation } from './animation.js'

function renderLocation(data) {
    const { name, country } = data.location

    document.querySelector('.card__location').textContent = `${name}, ${country}`;
}

let clockInterval = null

function renderClock(data) {
    const cardTime = document.querySelector('.card__time');
    const timeZone = data.location.tz_id

    clearInterval(clockInterval);

    function updateTime() {
        const now = new Date()

        const time = now.toLocaleTimeString('ru-RU', {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
        })

        const date = now.toLocaleDateString('en-US', {
            timeZone: timeZone,
            day: 'numeric',
            month: 'short',
        })

        cardTime.innerHTML = `
            <p>${time}, ${date}</p>
        `
    }

    clockInterval = setInterval(updateTime, 30000);

    updateTime()
}

function renderWeatherIcon(data) {
    const { is_day, condition } = data.current
    const folder = is_day ? 'day' : 'night'
    const iconPath = `./icons/${folder}/${condition.code}.svg`
    document.querySelector('.card__icon-container').innerHTML = `
        <img
            src="${iconPath}"
            alt="${condition.code}"
            title="${condition.text}"
            width="200"
            height="200"
        >
    `;
}

function renderDescription(data) {
    const { condition, temp_c, last_updated, is_day } = data.current

    const weatherText = (condition.text === 'Sunny' || condition.text === 'Clear') && is_day === 0
        ? 'Clear'
        : condition.text

    const date = last_updated.slice(0, 10)
    const weekday = new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long' });

    document.querySelector('.card__description').innerHTML = `
        <div class="card__description-weather">${weatherText}</div>
        <div class="card__description-degree">${temp_c} <span>°</span>C</div>
        <div class="card__description-day">${weekday}</div>
    `

    setAnimation('card__description-weather', 'appearence-left')
    setAnimation('card__description-degree', 'appearence-right')
    setAnimation('card__description-day', 'appearence-bottom')
}

function renderForecast(data) {
    const forecastCards = document.querySelectorAll('.minicard--forecast-day');

    document.querySelector('.current-day')?.classList.remove('current-day');

    forecastCards.forEach((card, index) => {
        const day = data.forecast.forecastday[index];
        const date = new Date(`${day.date}T12:00:00`);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        const shortDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const iconPath = `./icons/day/${day.day.condition.code}.svg`;

        card.innerHTML = `
            <p class="card__forecast-${index + 1}-name">${weekday},</p>
            <p class="card__forecast-${index + 1}-date">${shortDate}</p>
            <div class="card__forecast-icon card__forecast-${index + 1}-icon">
                <img
                    src="${iconPath}"
                    alt="${day.day.condition.text}"
                    title="${day.day.condition.text}"
                    width="60"
                    height="60"
                >
            </div>
            <p class="card__forecast-${index + 1}-degree">${day.day.mintemp_c} / ${day.day.maxtemp_c} <span>°</span>C</p>
        `;
    })
}

function renderSupportingInformation(data) {
    const { wind_kph, feelslike_c, humidity } = data.current

    document.querySelector('.card__supporting-information').innerHTML = `
        <div class="minicard card__supporting-information-wind">
            <p class="card__supporting-information-wind-value">${wind_kph} kph</p>
            <p>Wind</p>
        </div>
        <div class="minicard card__supporting-information-feels-like">
            <p class="card__supporting-information-feels-like-value">${feelslike_c} <span>°</span>C</p>
            <p>Feels Like</p>
        </div>
        <div class="minicard card__supporting-information-humidity">
            <p class="card__supporting-information-humidity-value">${humidity}%</p>
            <p>Humidity</p>
        </div>
    `
}

export {renderLocation, renderClock, renderDescription, renderForecast, renderSupportingInformation, renderWeatherIcon}



