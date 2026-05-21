export function scroll() {
    const scrollContainer = document.querySelector('.card__forecast');

    scrollContainer.addEventListener('wheel', (event) => {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
    });
}
