import fetchCountries from "./js/fetchCountries.js";
import countryCardTmp from './templates/countryTpl.hbs'
const debounce = require('lodash.debounce');

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
        }
        if (countryQuantity > 10) {
            console.log(`more than 10 ${countryQuantity}`)
        }
    } else {
        console.log('result 0');
    }


}
refs.input.addEventListener('input', debounce(onSearch, 500));