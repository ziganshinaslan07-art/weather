export function initForecastScroll() {
    const forecastElementDay = document.getElementById('cardDays');
    const forecastElementHour = document.getElementById('cardHours');

    forecastElementDay.addEventListener('wheel', (event) => {
        event.preventDefault();
        forecastElementDay.scrollLeft += event.deltaY * 1.5;
    });
    forecastElementHour.addEventListener('wheel', (event) => {
        event.preventDefault();
        forecastElementHour.scrollLeft += event.deltaY * 2.5;
    });
}
