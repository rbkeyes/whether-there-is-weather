// api key for openweather
const APIKey = "1e4594222d984bf5f75b387428c1a416";

const searchBtn = document.getElementById('searchBtn');
let cityName = ""
let city = ""
let state = ""
let country = ""
// let chooseOne = [];
const searchHistory = [];
let latitude = ""
let longitude = ""

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

// add code to capitalize first letter of city

// get coordinates from search
function getCities() {
    console.log(cityName)
    let locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + 5 + "&appid=" + APIKey;
    fetch(locationURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
    .then(function (data) {
        console.log(data[0]);
        // once it's working I'll add ability to select specific city from list, for now just use i=0
    //     for (let i = 0; i < data.length; i++) {
    //         state = data[i].state;
    //         country = data[i].country;
    //         console.log(city + ", " + state + ", " + country);
    //         chooseOne.push({ city: city, state: state, country: country });
    //         latitude.push(data[i].lat);
    //         longitude.push(data[i].lon);
    //     }
    state = data[0].state;
    country = data[0].country;
    city = cityName + ", " + state + ", " + country;
    console.log(city);
    searchHistory.push({city: city, coordinates: latitude + ", " + longitude,})
    console.log(searchHistory)
    GetCoordinates()
    })
};

// populate results of the different cities
// when user selects which city they're looking for, then getCoordinates()
// could be an alert, or a modal?

function GetCoordinates() {
    latitude = data[0].lat;
    longitude = data[0].lon;
    console.log("lat = " + latitude + " lon = " + longitude);
    localStorage.setItem("latitude = ", JSON.stringify(latitude));
    localStorage.setItem("longitude = ", longitude);
    getWeather();
}


function saveSearchtoLocalStorage(city, coordinates) {
    
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

