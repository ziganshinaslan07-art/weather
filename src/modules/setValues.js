function setLocation(data) {
    const cardLocation = document.querySelector('.card__location');

    cardLocation.textContent = `
        ${data.location.name}, ${data.location.country}
    `
}

function setTime(data) {
    const cardTime = document.querySelector('.card__time');
    const timeZone = data.location.tz_id

    function updateTime() {
        cardTime.innerHTML = `
            <p>${new Date().toLocaleTimeString('ru-RU', {
                    timeZone: timeZone,
                    hour: '2-digit',
                    minute: '2-digit'
                })},
            ${new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    timeZone: timeZone 
                })}
            </p>
        `
    }

    setInterval(updateTime, 30000);

    updateTime()
}

function setIcon(data) {
    const iconContainer = document. querySelector('.card__icon-container');
    const textIcon = data.current.condition.code;
    const textAPI = data.current.condition.text
    let link = (data.current.is_day) ? `./src/assets/icons/day/${textIcon}.svg` : `./src/assets/icons/night/${textIcon}.svg`

    iconContainer.innerHTML = `
        <img
            src="${link}"
            alt="${textIcon}"
            title="${textAPI}"
            width="200"
            height="200"
        >
    `
}

function setDescription(data) {
    const cardDescription = document.querySelector('.card__description');
    const textAPI = data.current.condition.text
    const text = ((textAPI === 'Sunny' || textAPI === 'Clear') && data.current.is_day === 0)
        ? `Clear`
        : textAPI
    const dateAPI = data.current.last_updated.slice(0, 10);
    const date = new Date(`${dateAPI}T12:00:00`);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

    cardDescription.innerHTML = `
        <div class="card__description-weather">${text}</div>
        <div class="card__description-degree">${data.current.temp_c} <sup>°</sup>C</div>
        <div class="card__description-day">${dayName}</div>
    `
}

function setForecast(data) {
    const cardForecastList = document.querySelectorAll('.minicard--forecast');

    cardForecastList[0].classList.add('current');

    for (let i = 0; i < cardForecastList.length; i++) {
        const day = data.forecast.forecastday[i];
        const dateAPI = day.date;

        const date = new Date(`${dateAPI}T12:00:00`);

        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });

        const textIcon = day.day.condition.text;
        const dayTemperature = day.day.avgtemp_c;
        let link = `./src/assets/icons/day/${day.day.condition.code}.svg`;

        cardForecastList[i].innerHTML = `
            <p class="card__forecast-${i+1}-name">${dayName},</p>
            <p class="card__forecast-${i+1}-date">${formattedDate}</p>
            <div class="card__forecast-icon card__forecast-${i+1}-icon">
                <img
                    src="${link}"
                    alt="${textIcon}"
                    title="${textIcon}"
                    width="60"
                    height="60"
                >
            </div>
            <p class="card__forecast-${i+1}-degree">${dayTemperature} <sup>°</sup>C</p>
        `;
    }
}

function setSupportingInformation(data) {
    const supportingInformation = document.querySelector('.card__supporting-information');

    supportingInformation.innerHTML = `
        <div class="minicard card__supporting-information-wind">
            <p class="card__supporting-information-wind-value">${data.current.wind_kph} kph</p>
            <p>Wind</p>
        </div>
        <div class="minicard card__supporting-information-feels-like">
            <p class="card__supporting-information-feels-like-value">${data.current.feelslike_c} <sup>°</sup>C</p>
            <p>Feels Like</p>
        </div>
        <div class="minicard card__supporting-information-humidity">
            <p class="card__supporting-information-humidity-value">${data.current.humidity}%</p>
            <p>Humidity</p>
        </div>
    `
}

export {setLocation, setTime, setDescription, setForecast, setSupportingInformation, setIcon}



