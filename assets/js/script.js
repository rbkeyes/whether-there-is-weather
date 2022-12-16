// api key for openweather
const APIKey = "1e4594222d984bf5f75b387428c1a416";

const searchBtn = document.getElementById('searchBtn');
let cityName = ""
// let city = ""
// let state = ""
// let country = ""
// let chooseOne = [];
const savedCities = [];
// let latitude = ""
// let longitude = ""
const savedCoordinates = [];
let pastSearches = "";
const displaySaved = document.getElementById('displaySaved');

// event listener to run search on button click
searchBtn.addEventListener("click", function (event) {
    // event.preventDefault();
    cityName = document.getElementById('cityName').value;

    if (cityName) {
        event.preventDefault();
        // city = cityName;
        console.log(cityName);
    } else {
        console.log('You must enter a city!')
        return;
    }
    getCities();
});

// get city from geo api
// for now, just retrieve one value. Could pull 5 and offer users option to select from (modal, )
function getCities() {
    console.log(cityName)
    let locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + 1 + "&appid=" + APIKey;
    fetch(locationURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
            let state = data[0].state;
            let country = data[0].country;
            let city = { city: cityName + ", " + state + ", " + country, };
            console.log(city);
            savedCities.push(city);
            console.log(savedCities)
            saveToLocalStorage("search history", savedCities)
            GetCoordinates(data)
        })
};

// get coordinates
function GetCoordinates(data) {
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    console.log("lat = " + latitude + " lon = " + longitude);
    savedCoordinates.push({ latitude: latitude, longitude: longitude, })
    console.log(savedCoordinates);
    saveToLocalStorage("city coordinates", savedCoordinates);
}

// save to local storage (key, value assigned when function is called)
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(localStorage);
    value = ""
    console.log(key + value)
}

// // retrieve from local storage
// function retrieveFromLocalStorage(key, variable) {
//     variable = JSON.parse(localStorage.getItem(key));
//     console.log(variable);
//     // return retrieved;
//     renderSearchHistory(pastSearches);
// }
// console.log(retrieveFromLocalStorage("search history"))

// retrieve & render search history
function renderSearchHistory(key) {
    pastSearches = JSON.parse(localStorage.getItem(key));
    // create div for past search results
    let pastSearchEl = document.createElement('div');
    console.log(pastSearches);
    // add classes for info alert (bootstrap)
    pastSearchEl.classList.add("alert","alert-info", 'alert-dismissible', 'fade', 'show');
    pastSearchEl.setAttribute('role', "alert");
    if (pastSearches !== null) {
        pastSearchEl.textContent = pastSearches[0].city;
        displaySaved.appendChild(pastSearchEl);
        console.log(pastSearchEl);
    } else {
        // maybe hard code this one and just change the class & change text content when results are available?
        pastSearchEl.classList.remove('alert-info')
        pastSearchEl.classList.add('alert-light');
        pastSearchEl.textContent = "No past search results to display."
        displaySaved.appendChild(pastSearchEl);
        console.log(pastSearchEl);
    }
    // add button to clear search       
    }

function getWeather() {
    // console.log(localStorage);
    // var storedLat = JSON.parse(localStorage.getItem('latitude'));
    // var storedLon = JSON.parse(localStorage.getItem('longitude'));
    // console.log(storedLat);
    // console.log(storedLon);
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};

renderSearchHistory("search history");

// retrieveFromLocalStorage("search history", pastSearches);
// retrieveFromLocalStorage("city coordinates: ")


// get coordinates from search
// this version is for retrieve 5 results
// function getCities() {
//     console.log(cityName)
//     let locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + 5 + "&appid=" + APIKey;
//     fetch(locationURL)
//         .then(function (response) {
//             console.log(response);
//             return response.json();
//         })
//     .then(function (data) {
//         console.log(data[0]);
// once it's working I'll add ability to select specific city from list, for now just use i=0
//     for (let i = 0; i < data.length; i++) {
//         state = data[i].state;
//         country = data[i].country;
//         console.log(city + ", " + state + ", " + country);
//         chooseOne.push({ city: city, state: state, country: country });
//         latitude.push(data[i].lat);
//         longitude.push(data[i].lon);
//     }
//     let state = data[0].state;
//     let country = data[0].country;
//     let city = {city: cityName + ", " + state + ", " + country,};
//     console.log(city);
//     savedCities.push(city);
//     console.log(savedCities)
//     saveToLocalStorage("search history: ", savedCities)
//     GetCoordinates(data)
//     })
// };

// populate results of the different cities
// when user selects which city they're looking for, then getCoordinates()
// could be an alert, or a modal?