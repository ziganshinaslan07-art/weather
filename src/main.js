import './styles/styles.css';

import {request} from './modules/request.js';
import {searchEnter} from './modules/searchEnter.js';

searchEnter()

const form = document.querySelector('.header__container');

form.addEventListener('click', (event) => {
    request(event, form)
})

