// api key for openweather
const APIKey = "1e4594222d984bf5f75b387428c1a416";

// country codes for united states
var countryCodeUS = "US";
var countryCodeUSA = "USA";
var countryCodeNumUS = 840;

var city = "berkeley, us-ca, usa";
var latitude;
var longitude;

let savedSearches = [];
function runSearch() {
    getCoords();
}

// get coordinates from search
function getCoords() {
    let locationURL =  "http://api.openweathermap.org/geo/1.0/direct?q="+ city + "&limit=" + 5 + "&appid=" + APIKey;
    fetch(locationURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    //   console.log("lat = " + data[0].lat);
    //   console.log("lon = " + data[0].lon);
      latitude = (data[0].lat);
      longitude = (data[0].lon);
      console.log(latitude);
      console.log(longitude);
      localStorage.setItem("latitude = ", JSON.stringify(latitude));
      localStorage.setItem("longitude = ", longitude);
    getWeather();
    })
};

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

runSearch();