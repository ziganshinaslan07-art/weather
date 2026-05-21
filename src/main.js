import './styles/styles.css';

import {scroll} from './modules/scroll.js'
import {request} from './modules/request.js';
import {searchEnter} from './modules/searchEnter.js';
import {setExtra} from './modules/extra.js'

scroll()

searchEnter()

setExtra()

const form = document.querySelector('.header__container');

form.addEventListener('click', (event) => {
    request(event, form)
})

