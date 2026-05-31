import './styles/styles.css';

import {createForecastElements} from './modules/createElements'
import {initForecastScroll} from "./modules/scroll";
import {initSearch} from "./modules/search";
import {initLeave, initForecastHourClick} from "./modules/extra";
import {initDropDown} from "./modules/dropdownThemes";

initDropDown()
createForecastElements('card__forecast', 14, 'day');
createForecastElements('extra__hours', 24, 'hour')
initForecastHourClick()
initForecastScroll();
initSearch()
initLeave()

