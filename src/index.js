import fetchCountries from "./js/fetchCountries.js";
import fetchBackground from "./js/fetchBackground.js";
import countryCardTmp from "./templates/countryTpl.hbs";
import resultTmp from "./templates/resultTmp.hbs";
import debounce from "lodash.debounce";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/countdown/dist/PNotifyCountdown.css";
import './sass/main.scss';
import { alert } from '@pnotify/core';
import notificationOptions from './js/notificationSettings.js';
const event = new Event('input');
// refs to HTML object
const refs = {
    countryCard: document.querySelector('.country-card'),
    input: document.querySelector('#search'),
    resultList: document.querySelector('.result-list'),
};
const setBackgroundImg = (data) => {
    let randomImgId = getRandomInt(0, data.hits.length);
    let url = data.hits[randomImgId].largeImageURL;
    document.body.style.backgroundImage = `url(${url})`;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
const onSearch = (event) => {
    let value = event.target.value;
    if (!value) { return }
    fetchCountries(event.target.value).then(render);

};

const renderCard = (data) => {
    refs.countryCard.insertAdjacentHTML("beforeend", countryCardTmp(data));
    fetchBackground(data.capital).then((res => setBackgroundImg(res)));

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
