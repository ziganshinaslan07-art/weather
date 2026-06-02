const root = document.documentElement

export function initDropDown() {
    setupDropdownToggle();
    setupThemeSwitcher();
}

function setupDropdownToggle() {
    const settingsButton = document.getElementById('settings-button');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (!settingsButton || !dropdownMenu) return;

    settingsButton.addEventListener('click', (event) => {
        event.stopPropagation();
        settingsButton.classList.toggle('show');
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('show')) {
            settingsButton.classList.remove('show');
            dropdownMenu.classList.remove('show');
        }
    });
}

function setupThemeSwitcher() {
    const themeContainer = document.querySelector('.dropdown__menu-list'); // Контейнер для кнопок тем

    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) setTheme(savedTheme);

    themeContainer?.addEventListener('click', (event) => {
        const target = event.target.closest('[data-theme-name]');
        if (target) {
            setTheme(target.dataset.themeName);
        }
    });
}

function setTheme(themeName) {
    root.setAttribute('data-theme', themeName);
    localStorage.setItem('selected-theme', themeName);
}



