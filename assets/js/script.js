// DOM Nodes...
var currentCityNameDisplay = $("#cityNameDisplay");
var currentCityTemp = $("#temp");
var currentCityWind = $("#wind");
var currentCityHumidity = $("#humidity");
var currentCityUV = $("#uv");
var currentCityWeatherIcon = $("#weatherIcon");

// Grabbing visitor IP address...

var userLoc;

function getUserIP() {
  fetch("https://ipinfo.io/json?token=5607825501f064")
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      currentCityNameDisplay.text(responseJSON.city);
      userLoc = responseJSON.loc;
      console.log(userLoc);
      var latLon = userLoc.split(",");
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          latLon[0] +
          "&lon=" +
          latLon[1] +
          "&units=imperial&&exclude=hourly,minutely&appid=c11639f11059953c1817728af454e744"
      )
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          currentCityTemp.text(responseData.current.temp);
          currentCityWind.text(responseData.current.wind_speed);
          currentCityHumidity.text(responseData.current.humidity);
          currentCityUV.text(responseData.current.uvi);
          console.log(responseData.current.weather[0].icon);
          currentCityWeatherIcon.attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              responseData.current.weather[0].icon +
              "@4x.png"
          );
        });
    });
}

getUserIP();

// Check local storage for search info, pull latest key and fetch current weather data for previously searched entry
if (localStorage.length > 0) {
}
// Stringholder for Fetch
var fetchForm =
  "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  cityLat +
  "&lon=" +
  cityLon +
  "&units=imperial&appid=c11639f11059953c1817728af454e744";

let x = localStorage.length;
$("#btn").submit(function (event) {
  event.preventDefault();
  localStorage.setItem(x, $("#searchInput").val());
  x++;
});

fetch(
  `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&appid=c11639f11059953c1817728af454e744`
)
  .then((response) => response.json())
  .then((data) => console.log(data));
