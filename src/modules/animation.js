export function animation () {
    setAnimation('card__location', 'appearence-top')
    setAnimation('card__time', 'appearence-top-slow')
    setAnimation('card__icon-container', 'appearence-bottom')
    setAnimation('card__forecast', 'slide-down-max')
    setAnimation('card__supporting-information', 'appearence-top-slow')
}

export function setAnimation (elementClass, animation) {
    const element = document.querySelector(`.${elementClass}`)

    element.classList.remove(animation)

    void element.offsetWidth

    element.classList.add(animation)
}