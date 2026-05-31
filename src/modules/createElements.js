export function createForecastElements(elementsClass, quantity, format) {
    for (let i = 0; i < quantity; i++) {
        const newLi = document.createElement('li');
        const newButton = document.createElement('button');

        newButton.classList.add('minicard', `minicard--forecast-${format}`, `button-forecast`, 'button');
        newLi.appendChild(newButton);

        document.querySelector(`.${elementsClass}`).appendChild(newLi);
    }
}

