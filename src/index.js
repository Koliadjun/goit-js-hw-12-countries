import fetchCountries from "./js/fetchCountries.js";
import countryCardTmp from "./templates/countryTpl.hbs";
import resultTmp from "./templates/resultTmp.hbs";
import debounce from "lodash.debounce";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/countdown/dist/PNotifyCountdown.css";
import './sass/main.scss';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyCountdown from '@pnotify/countdown';
import * as PNotifyMobile from '@pnotify/mobile/';
defaultModules.set(PNotifyMobile, {});
const event = new Event('input');

const notificationOptions = {
    toMachResults: {
        type: 'error',
        title: 'Too many matches found.',
        text: 'Please enter specific query!',
        delay: 2000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {}]
        ])
    },
    noResult: {
        type: 'error',
        title: 'No matches found.',
        text: 'Please enter different query!',
        delay: 2000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
    successResult: {
        type: 'success',
        title: 'Country found.',
        delay: 2000,
        // text: 'Please enter different query!',
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
    coupleResults: {
        type: 'notice',
        title: 'Found more than one country.',
        text: 'Choose country you are searching for!',
        delay: 3000,
        // text: 'Please enter different query!',
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
};

const refs = {
    countryCard: document.querySelector('.country-card'),
    input: document.querySelector('#search'),
    resultList: document.querySelector('.result-list'),
};

const onSearch = (event) => {
    let value = event.target.value;
    if (!value) { return }
    fetchCountries(event.target.value).then(render);
};

const renderCard = (data) => {
    refs.countryCard.insertAdjacentHTML("beforeend", countryCardTmp(data));
    refs.resultList.innerHTML = '';
};

const renderResultList = (data) => {
    refs.resultList.innerHTML = '';
    const resultArray = data.map(country => country.name);
    refs.resultList.insertAdjacentHTML("beforeend", resultTmp({ countryName: resultArray }));

};

const render = (data) => {
    const countryQuantity = data.length;
    refs.countryCard.innerHTML = '';
    if (countryQuantity) {
        if (countryQuantity === 1) {
            renderCard(data[0]);
            alert(notificationOptions.successResult);
            refs.resultList.classList.add('hidden')
            refs.input.value = '';
        }
        if (countryQuantity > 1 && countryQuantity <= 10) {
            refs.resultList.classList.remove('hidden')
            renderResultList(data);
            alert(notificationOptions.coupleResults);
        }
        if (countryQuantity > 10) {
            alert(notificationOptions.toMachResults);
            refs.resultList.classList.add('hidden')
        }
    } else {
        refs.resultList.classList.add('hidden')
        alert(notificationOptions.noResult);
    }
};

refs.input.addEventListener('input', debounce(onSearch, 500));
refs.input.addEventListener('keyup', (e) => {
    if (!e.target.value) {
        refs.resultList.classList.add('hidden')
    }
})
refs.resultList.addEventListener('click', function selected(e) {
    refs.input.value = '';
    refs.input.value = e.target.textContent;
    refs.input.dispatchEvent(event);
})
