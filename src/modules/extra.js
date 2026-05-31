import {setAnimation} from "./animation";

const mainCard = document.getElementById('main__card')
const extraCard = document.querySelector('.main__card--extra')
let currentDayIndex = null

export function initForecastDayClick(data) {
    const forecastElementDay = document.getElementById('cardDays')
    const forecastCards = document.querySelectorAll('.minicard--forecast-day')
    const forecastElementHour = document.getElementById('cardHours')

    forecastElementDay.onclick = (event) => {
        const clickedCard = event.target.closest('button')
        if (!clickedCard) return

        const dayIndex = Array.from(forecastCards).indexOf(clickedCard)
        currentDayIndex = dayIndex
        console.log(dayIndex)

        mainCard.style.display = 'none'
        extraCard.style.display = 'flex'

        forecastElementHour.scrollTo({
            left: 0,
            behavior: 'smooth'
        });

        renderDate(data, dayIndex)
        renderForecastHour(data, dayIndex)
        renderDescriptionHour(data, currentDayIndex, 0)
        renderInformationHour(data, currentDayIndex, 0)

        setAnimation('extra__hours', 'slide-down-max')
        setAnimation('extra__header-date', 'appearence-top')
        setAnimation('extra__description', 'appearence-bottom')
        setAnimation('extra__wind', 'appearence-bottom')

    }
}

export function initForecastHourClick(data) {
    const forecastElementHour = document.getElementById('cardHours')
    const forecastCards = document.querySelectorAll('.minicard--forecast-hour')

    forecastElementHour.onclick = (event) => {
        const clickedCard = event.target.closest('button')
        if (!clickedCard) return

        const hourIndex = Array.from(forecastCards).indexOf(clickedCard)
        console.log(hourIndex)

        forecastElementHour.querySelector('.current-hour').classList.remove('current-hour')
        clickedCard.classList.add('current-hour')

        renderDescriptionHour(data, currentDayIndex, hourIndex)
        renderInformationHour(data, currentDayIndex, hourIndex)
        renderCompassDegree(data, currentDayIndex, hourIndex)
        rotateCompass(data, currentDayIndex, hourIndex)

        setAnimation('extra__description', 'appearence-top')
    }
}

export function initLeave() {
    const leaveButton = document.querySelector('.extra__header-leave')

    leaveButton.addEventListener('click', (event) => {
        mainCard.style.display = 'flex'
        extraCard.style.display = 'none'

        document.getElementById('cardDays').scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    })
}

function renderDate(data, dayIndex) {
    const day = data.forecast.forecastday[dayIndex]
    const date = new Date(`${day.date}T12:00:00`);
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const shortDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    document.querySelector('.extra__header-date').textContent = `${weekday}, ${shortDate}`;

}

function renderForecastHour(data, dayIndex) {
    const forecastCards = document.querySelectorAll('.minicard--forecast-hour');

    document.querySelector('.current-hour')?.classList.remove('current-hour');
    forecastCards[0].classList.add('current-hour');

    forecastCards.forEach((card, index) => {
        const hour = data.forecast.forecastday[dayIndex].hour[index];

        const folder = hour.is_day ? 'day' : 'night'
        const iconPath = `./icons/${folder}/${hour.condition.code}.svg`

        const time = hour.time.slice(10, 16)

        card.innerHTML = `
            <p class="card__forecast-${index}-time">${time}</p>
            <div class="card__forecast-icon card__forecast-${index}-icon">
                <img
                    src="${iconPath}"
                    alt="${hour.condition.text}"
                    title="${hour.condition.text}"
                    width="60"
                    height="60"
                >
            </div>
            <p class="card__forecast-${index}-degree">${hour.temp_c} <span>°</span>C</p>
        `;
    })
}

function renderDescriptionHour(data, dayIndex, hourIndex) {
    const hour = data.forecast.forecastday[dayIndex].hour[hourIndex]
    const descriptionElement = document.querySelector('.extra__description')

    descriptionElement.textContent = hour.condition.text;
}

function renderInformationHour(data, dayIndex, hourIndex) {
    const hour = data.forecast.forecastday[dayIndex].hour[hourIndex]
    const extraInformation = document.querySelector('.extra__information')

    extraInformation.innerHTML = `
        <div class="information__card">
            <p>Cloudiness</p>
            <p>${hour.cloud} %</p>
        </div>
        <div class="information__card">
            <p>Dew point</p>
            <p>${hour.dewpoint_c} <span>°</span>C</p>
        </div>
        <div class="information__card">
            <p>Feelslike</p>
            <p>${hour.feelslike_c} <span>°</span>C</p>
        </div>
        <div class="information__card">
            <p>Humidity</p>
            <p>${hour.humidity} %</p>
        </div>
        <div class="information__card">
            <p>Pressure</p>
            <p>${hour.pressure_mb} mb</p>
        </div>
        <div class="information__card">
            <p>Temperature</p>
            <p>${hour.temp_c} <span>°</span>C</p>
        </div>
        <div class="information__card">
            <p>UV</p>
            <p>${hour.uv}</p>
        </div>
        <div class="information__card">
            <p>Wind speed</p>
            <p>${hour.wind_kph} kph</p>
        </div>
    `
    const cards = document.querySelectorAll('.information__card');
    cards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.remove('appearence-left')
            void card.offsetWidth
            card.classList.add('appearence-left')
        }
        else {
            card.classList.remove('appearence-right')
            void card.offsetWidth
            card.classList.add('appearence-right')
        }
    })
}

function renderCompassDegree(data, dayIndex, hourIndex) {
    const hour = data.forecast.forecastday[dayIndex].hour[hourIndex]
    const compassDegree = document.querySelector('.compass__degree')

    compassDegree.innerHTML = `${hour.wind_degree}<span>°</span>`
}

function rotateCompass(data, dayIndex, hourIndex) {

    const hour = data.forecast.forecastday[dayIndex].hour[hourIndex]
    const needle = document.querySelector('.compass__needle')

    needle.style.transform = `rotate(${hour.wind_degree}deg)`
}




