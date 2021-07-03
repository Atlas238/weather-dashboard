// Media query for Icon movement
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
});

// DOM Nodes...
var currentCityNameDisplay = $("#cityNameDisplay");
var currentCityTemp = $("#temp");
var currentCityWind = $("#wind");
var currentCityHumidity = $("#humidity");
var currentCityUV = $("#uv");
var currentCityWeatherIcon = $("#weatherIcon");
var weatherIconAdjustHolder = $("#weatherIconAdjust");

// Grabbing visitor IP address...

var userLoc;
var windowWidth = window.matchMedia("(max-width:780px)");

function getUserIP() {
  // Asks for location and pulls current location then runs a fetch request at given lat long values
  navigator.geolocation.getCurrentPosition((position) => {
    fetch(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
        position.coords.latitude +
        "&longitude=" +
        position.coords.longitude +
        "&localityLanguage=en"
    )
      .then((response) => response.json())
      .then((responseCityData) => {
        currentCityNameDisplay.text(responseCityData.city);
      });

    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&units=imperial&exclude=hourly,minutely&appid=c11639f11059953c1817728af454e744"
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        // First block handles main display
        currentCityNameDisplay.text(responseData.city);
        currentCityTemp.text(responseData.current.temp);
        currentCityWind.text(responseData.current.wind_speed);
        currentCityHumidity.text(responseData.current.humidity);
        currentCityUV.text(responseData.current.uvi);
        currentCityWeatherIcon.attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            responseData.current.weather[0].icon +
            "@4x.png"
        );
        weatherIconAdjustHolder.attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            responseData.current.weather[0].icon +
            "@4x.png"
        );
      });
  });

  // Daily forecast Tiles
}

getUserIP();

// Check local storage for search info, pull latest key and fetch current weather data for previously searched entry
if (localStorage.length > 0) {
}
// Stringholder for Fetch
// var fetchForm =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//   cityLat +
//   "&lon=" +
//   cityLon +
//   "&units=imperial&appid=c11639f11059953c1817728af454e744";

let x = localStorage.length;
$("#btn").submit(function (event) {
  event.preventDefault();
  localStorage.setItem(x, $("#searchInput").val());
  x++;
});
