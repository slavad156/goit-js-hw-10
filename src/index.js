import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import countryInfoTpl from './templates/info-country.hbs';
import countiesListTpl from './templates/countries-list.hbs';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

const messageManyMatches = 'Too many matches found. Please enter a more specific name.';
const messageWrongCountry = 'Oops, there is no country with that name';

const renderCountryInfo = function (data) {
    const markup = countryInfoTpl(data);
    countryInfoRef.innerHTML = markup;
}

const renderCountriesList = function (data) {
    const markup = countiesListTpl(data);
    countryListRef.innerHTML = markup;
}

function changeInput(e) {
    const dataInput = (e.target.value).trim();  
    
    if (dataInput !== '') {
        
        fetchCountries(dataInput)
        .then(data => {
            
            if (data.length > 10) {
                return Notiflix.Notify.info(messageManyMatches);
            } else if (data.length >= 2 && data.length < 11) {
                return renderCountriesList(data);
            } else if (data.length = 1) {
                return renderCountryInfo(data);
            };         
         
        })
        .catch(error => Notiflix.Notify.failure(messageWrongCountry));
       };
    
    countryListRef.innerHTML = '';
    countryInfoRef.innerHTML = '';
};

inputRef.addEventListener('input', debounce(changeInput, DEBOUNCE_DELAY));
