// api key for openweather
var apiKey = "41f329d85d1a516c5b46f4e25159f568";

// country codes for united states
var countryCodeUS = "US";
var countryCodeUSA = "USA";
var countryCodeNumUS = 840;

var city;
var latitude;
var longitude;

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

var query = fetch(queryURL);

console.log(query.value);
