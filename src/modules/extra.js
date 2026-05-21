const cardForecast = document.querySelector(".card__forecast")
const forecastCards = document.querySelectorAll(".minicard--forecast")
const mainCard = document.querySelector("#main__card")
const mainCardExtra = document.querySelector(".main__card--extra")


export function setExtra() {
    cardForecast.addEventListener("click", (event) => {
        const targetElement = event.target.closest('button')
        if (!targetElement) return

        const index = Array.from(forecastCards).indexOf(targetElement)

        const currentElement = cardForecast.querySelector('.current')
        currentElement.classList.remove('current')

        targetElement.classList.add('current')

        mainCard.style.display = 'none'
        mainCardExtra.style.display = 'flex'

        console.log(`target clicked ${index + 1}`)
    })
}

