// api key for openweather
const APIKey = "1e4594222d984bf5f75b387428c1a416";

const searchBtn = document.getElementById('searchBtn');
let cityName = ""
let city = ""
// let state = ""
// let country = ""
// let chooseOne = [];
let savedCities = [];
// let latitude = ""
// let longitude = ""
const savedCoordinates = [];
let pastSearches = "";
const displaySaved = document.getElementById('displaySaved');

// event listener to run search on button click
searchBtn.addEventListener("click", function (event) {
    cityName = document.getElementById('cityName').value;
    if (cityName) {
        getCities(cityName);
        event.preventDefault();
        console.log(cityName);
    } else {
        console.log('You must enter a city!')
        return;
    }
});

// add function to capitalize first letter of city name before saving to storage.

// get city from geo api
// For now, just take first result and return result.
function getCities(input) {
    let locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=" + 1 + "&appid=" + APIKey;
    fetch(locationURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let state = data[0].state;
            let country = data[0].country;
            let city = { city: cityName + ", " + state + ", " + country, };
            console.log(city);
            savedCities.push(city);
            console.log(savedCities)
            saveToLocalStorage("Cities", savedCities)
            GetCoordinates(data)
        })
    return savedCities;
};

// get coordinates
function GetCoordinates(data) {
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    console.log("lat = " + latitude + " lon = " + longitude);
    // savedCoordinates.push({ latitude: latitude, longitude: longitude, })
    // console.log(savedCoordinates);
    // saveToLocalStorage("Coordinates", savedCoordinates);
    // return savedCoordinates;
    getWeather(latitude, longitude);
}

// save to local storage (key, value assigned when function is called)
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(localStorage);
    value = ""
}

// retrieve & render search history
function renderSearchHistory(key) {
    pastSearches = JSON.parse(localStorage.getItem(key));
    console.log(pastSearches)
    if (pastSearches !== null) {
        console.log(pastSearches.length);
        for (i = 0; i < pastSearches.length; i++) {
            let pastSearchLi = document.createElement('li');
            console.log(pastSearches[i]);
            pastSearchLi.textContent = pastSearches[i].city;
            pastSearchLi.setAttribute('class', 'pastSearches');
            displaySaved.appendChild(pastSearchLi);
            console.log(displaySaved);
            savedCities = pastSearches;
            console.log(savedCities)
        }
    } else {
        let noPastSearchLi = document.createElement('li');
        noPastSearchLi.setAttribute('class', 'noPastSearches')
        noPastSearchLi.textContent = "No past search results to display."
        displaySaved.appendChild(noPastSearchLi);
        console.log(noPastSearchLi);
    }
    // add button to clear search       
}

function getWeather(lat, lon) {
    // console.log(localStorage);
    // var storedLat = JSON.parse(localStorage.getItem('latitude'));
    // var storedLon = JSON.parse(localStorage.getItem('longitude'));
    // console.log(storedLat);
    // console.log(storedLon);
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};

renderSearchHistory("Cities");

// retrieveFromLocalStorage("search history", pastSearches);
// retrieveFromLocalStorage("city coordinates: ")
