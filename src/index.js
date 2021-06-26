import fetchCountries from "./js/fetchCountries.js";
import countryCardTmp from './templates/countryTpl.hbs'
const debounce = require('lodash.debounce');
// import notification from "./js/notification.js"

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/mobile/dist/PNotifyMobile.css"
import "@pnotify/countdown/dist/PNotifyCountdown.css"
import { alert, defaultModules, error } from '@pnotify/core';
import * as PNotifyCountdown from '@pnotify/countdown';
import * as PNotifyMobile from '@pnotify/mobile/';
defaultModules.set(PNotifyMobile, {})

const errorNotificationOptions = {
    type: 'error',
    title: 'Too many matches found.',
    text: 'Please enter specific query!',
    modules: new Map([
        ...defaultModules,
        [PNotifyCountdown, {

        }]
    ])
};


const refs = {
    countryCard: document.querySelector('.country-card'),
    input: document.querySelector('#search'),
}

const onSearch = (event) => {
    let value = event.target.value;
    if (!value) { return }
    fetchCountries(event.target.value).then(render);
}
const renderCard = (data) => {
    refs.countryCard.innerHTML = '';
    refs.countryCard.insertAdjacentHTML("beforeend", countryCardTmp(data))
}
const render = (data) => {
    const countryQuantity = data.length;
    if (countryQuantity) {
        if (countryQuantity === 1) {
            renderCard(data[0]);
        }
        if (countryQuantity > 1 && countryQuantity <= 10) {
            console.log('result 1 and 10', + countryQuantity);
            console.dir(refs.input)

        }
        if (countryQuantity > 10) {
            console.log(`more than 10 ${countryQuantity}`)
            error(errorNotificationOptions);
        }
    } else {
        console.log('result 0');
    }


}
refs.input.addEventListener('input', debounce(onSearch, 500));
