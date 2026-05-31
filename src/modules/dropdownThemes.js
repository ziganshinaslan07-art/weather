const root = document.documentElement

export function initDropDown() {
    const settingsButton = document.getElementById('settings-button');
    const dropdownMenu = document.getElementById('dropdown-menu');

    settingsButton.addEventListener('click', (event) => {
        event.stopPropagation();
        settingsButton.classList.toggle('show');
        dropdownMenu.classList.toggle('show');
    })

    document.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('show')) {
            settingsButton.classList.remove('show');
            dropdownMenu.classList.remove('show');
        }
    })

    const defaultButton = document.getElementById('theme-default-button');
    const forestButton = document.getElementById('theme-forest-button');
    const sakuraButton = document.getElementById('theme-sakura-button');
    const orangeButton = document.getElementById('theme-orange-button');
    const oceanButton = document.getElementById('theme-ocean-button');

    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
        setTheme(savedTheme)
    }

    defaultButton.addEventListener('click', () => setTheme('default'))
    forestButton.addEventListener('click', () => setTheme('forest'))
    sakuraButton.addEventListener('click', () => setTheme('sakura'))
    orangeButton.addEventListener('click', () => setTheme('orange'))
    oceanButton.addEventListener('click', () => setTheme('ocean'))

}

function setTheme(themeName) {
    root.setAttribute('data-theme', themeName);
    localStorage.setItem('selected-theme', themeName);
}



