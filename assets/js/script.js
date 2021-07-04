// DOM Nodes...
// Main Display...
var currentDateSpan = $("#currentDate");
var currentCityNameDisplay = $("#cityNameDisplay");
var currentCityTemp = $("#temp");
var currentCityWind = $("#wind");
var currentCityHumidity = $("#humidity");
var currentCityUV = $("#uv");
var currentCityWeatherIcon = $("#weatherIcon");
var weatherIconAdjustHolder = $("#weatherIconAdjust");
// Daily Card display...
var dailyDay1 = $("#day1");
var dailyDay1Icon = $("#iconDay1");
var dailyDay1Temp = $("#day1Temp");
var dailyDay1Wind = $("#day1Wind");
var dailyDay1Humidity = $("#day1Humidity");

var dailyDay2 = $("#day2");
var dailyDay2Icon = $("#iconDay2");
var dailyDay2Temp = $("#day2Temp");
var dailyDay2Wind = $("#day2Wind");
var dailyDay2Humidity = $("#day2Humidity");

var dailyDay3 = $("#day3");
var dailyDay3Icon = $("#iconDay3");
var dailyDay3Temp = $("#day3Temp");
var dailyDay3Wind = $("#day3Wind");
var dailyDay3Humidity = $("#day3Humidity");

var dailyDay4 = $("#day4");
var dailyDay4Icon = $("#iconDay4");
var dailyDay4Temp = $("#day4Temp");
var dailyDay4Wind = $("#day4Wind");
var dailyDay4Humidity = $("#day4Humidity");

var dailyDay5 = $("#day5");
var dailyDay5Icon = $("#iconDay5");
var dailyDay5Temp = $("#day5Temp");
var dailyDay5Wind = $("#day5Wind");
var dailyDay5Humidity = $("#day5Humidity");

var dailyDay6 = $("#day6");
var dailyDay6Icon = $("#iconDay6");
var dailyDay6Temp = $("#day6Temp");
var dailyDay6Wind = $("#day6Wind");
var dailyDay6Humidity = $("#day6Humidity");

var dailyDay7 = $("#day7");
var dailyDay7Icon = $("#iconDay7");
var dailyDay7Temp = $("#day7Temp");
var dailyDay7Wind = $("#day7Wind");
var dailyDay7Humidity = $("#day7Humidity");

var submitBtn = $("#btn");
var submitForm = $("#searchForm");
// Search History Li nodes...
var searchHistory = $("#search-history-ul");
var searchItem1 = $("<li></li>");
var searchItem2 = $("<li></li>");
var searchItem3 = $("<li></li>");
var searchItem4 = $("<li></li>");
var searchItem5 = $("<li></li>");
// Setting history...

// X tracks the key value of our search terms, iterating per search term searched (if response is not invalid)...
let x = 0;
// Checks to see if you have already searched for things...
if (localStorage.length > 0) {
  x = localStorage.length;
}
console.log(x);
// Takes the last five items from local storage and writes them to our stored items
function genHistory() {
  searchHistory.append(searchItem1);
  searchItem1.text(localStorage.getItem(x));
  searchHistory.append(searchItem2);
  searchItem2.text(localStorage.getItem(x-1));
  searchHistory.append(searchItem3);
  searchItem3.text(localStorage.getItem(x-2));
  searchHistory.append(searchItem4);
  searchItem4.text(localStorage.getItem(x-3));
  searchHistory.append(searchItem5);
  searchItem5.text(localStorage.getItem(x-4));
}
genHistory();

// Takes user location and populates page
function getUserLocationInitial() {
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
      })
      .then(
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
            // Creating date obj for current date
            var dateNow = new Date(
              responseData.current.dt * 1000
            ).toLocaleDateString("en-gb", {
              year: "numeric",
              day: "numeric",
              month: "long",
              weekday: "long",
            });

            currentDateSpan.text(dateNow);

            currentCityTemp.text(responseData.current.temp);

            currentCityWind.text(responseData.current.wind_speed);

            currentCityHumidity.text(responseData.current.humidity);

            currentCityUV.text(responseData.current.uvi);

            currentCityWeatherIcon.attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                responseData.current.weather[0].icon +
                "@4x.png"
            );

            weatherIconAdjustHolder.attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                responseData.current.weather[0].icon +
                "@4x.png"
            );

            // Daily forecast Tiles
            var dateDay1 = new Date(
              responseData.daily[1].dt * 1000
            ).toLocaleDateString("en-gb", {
              year: "numeric",
              day: "numeric",
              month: "long",
              weekday: "long",
            });
            dailyDay1.text(dateDay1);
            dailyDay1Icon.attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                responseData.daily[1].weather[0].icon +
                "@2x.png"
            );
            dailyDay1Temp.text(responseData.daily[1].temp.day + " Fareinheit");
            dailyDay1Wind.text(responseData.daily[1].wind_speed + "mph");
            dailyDay1Humidity.text(responseData.daily[1].humidity);

            var dateDay2 = new Date(
              responseData.daily[2].dt * 1000
            ).toLocaleDateString("en-gb", {
              year: "numeric",
              day: "numeric",
              month: "long",
              weekday: "long",
            });
            dailyDay2.text(dateDay2);
            dailyDay2Icon.attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                responseData.daily[2].weather[0].icon +
                "@2x.png"
            );
            dailyDay2Temp.text(responseData.daily[2].temp.day + " Fareinheit");
            dailyDay2Wind.text(responseData.daily[2].wind_speed + " mph");
            dailyDay2Humidity.text(responseData.daily[2].humidity);

            var dateDay3 = new Date(
              responseData.daily[3].dt * 1000
            ).toLocaleDateString("en-gb", {
              year: "numeric",
              day: "numeric",
              month: "long",
              weekday: "long",
            });
            dailyDay3.text(dateDay3);
            dailyDay3Icon.attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                responseData.daily[3].weather[0].icon +
                "@2x.png"
            );
            dailyDay3Temp.text(responseData.daily[3].temp.day + " Fareinheit");
            dailyDay3Wind.text(responseData.daily[3].wind_speed + " mph");
            dailyDay3Humidity.text(responseData.daily[3].humidity);

            var dateDay4 = new Date(
              responseData.daily[4].dt * 1000
            ).toLocaleDateString("en-gb", {
              year: "numeric",
              day: "numeric",
              month: "long",
              weekday: "long",
            });
            dailyDay4.text(dateDay4);
            dailyDay4Icon.attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                responseData.daily[4].weather[0].icon +
                "@2x.png"
            );
            dailyDay4Temp.text(responseData.daily[4].temp.day + " Fareinheit");
            dailyDay4Wind.text(responseData.daily[4].wind_speed + " mph");
            dailyDay4Humidity.text(responseData.daily[4].humidity);

            var dateDay5 = new Date(
              responseData.daily[5].dt * 1000
            ).toLocaleDateString("en-gb", {
              year: "numeric",
              day: "numeric",
              month: "long",
              weekday: "long",
            });
            dailyDay5.text(dateDay5);
            dailyDay5Icon.attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                responseData.daily[5].weather[0].icon +
                "@2x.png"
            );
            dailyDay5Temp.text(responseData.daily[5].temp.day + " Fareinheit");
            dailyDay5Wind.text(responseData.daily[5].wind_speed + " mph");
            dailyDay5Humidity.text(responseData.daily[5].humidity);

            var dateDay6 = new Date(
              responseData.daily[6].dt * 1000
            ).toLocaleDateString("en-gb", {
              year: "numeric",
              day: "numeric",
              month: "long",
              weekday: "long",
            });
            dailyDay6.text(dateDay6);
            dailyDay6Icon.attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                responseData.daily[6].weather[0].icon +
                "@2x.png"
            );
            dailyDay6Temp.text(responseData.daily[6].temp.day + " Fareinheit");
            dailyDay6Wind.text(responseData.daily[6].wind_speed + " mph");
            dailyDay6Humidity.text(responseData.daily[6].humidity);

            var dateDay7 = new Date(
              responseData.daily[7].dt * 1000
            ).toLocaleDateString("en-gb", {
              year: "numeric",
              day: "numeric",
              month: "long",
              weekday: "long",
            });
            dailyDay7.text(dateDay7);
            dailyDay7Icon.attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                responseData.daily[7].weather[0].icon +
                "@2x.png"
            );
            dailyDay7Temp.text(responseData.daily[7].temp.day + " Fareinheit");
            dailyDay7Wind.text(responseData.daily[7].wind_speed + " mph");
            dailyDay7Humidity.text(responseData.daily[7].humidity);
          })
      );
  });
}
getUserLocationInitial();

// Handles our fetch request and the response for search items
function queryRequst() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      $("#searchInput").val() +
      "&appid=c11639f11059953c1817728af454e744"
  )
    .then(function (response) {
      if (response.ok) {
        console.log($("#searchInput").val());
        $("#searchInput").val();
        var input = $("#searchInput").val();
        input.replace(" ", "");
        localStorage.setItem(x, input);
        x++;
        genHistory();
        return response.json();
      } else {
        window.alert(response.statusText + ", Please try again!");
      }
    })
    .then((searchResponseData) => {
      var searchLatLon = [
        searchResponseData.coord.lat,
        searchResponseData.coord.lon,
      ];

      currentCityNameDisplay.text(searchResponseData.name);

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          searchLatLon[0] +
          "&lon=" +
          searchLatLon[1] +
          "&units=imperial&exclude=hourly,minutely&appid=c11639f11059953c1817728af454e744"
      )
        .then((response) => response.json())
        .then((citySearchedData) => {
          console.log(citySearchedData);
          // Printing search to Current City Display
          var dateNow = new Date(
            citySearchedData.current.dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          currentCityNameDisplay.text();
          console.log(dateNow);
          currentDateSpan.text(dateNow);

          currentCityTemp.text(citySearchedData.current.temp);

          currentCityWind.text(citySearchedData.current.wind_speed);

          currentCityHumidity.text(citySearchedData.current.humidity);

          currentCityUV.text(citySearchedData.current.uvi);

          currentCityWeatherIcon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );

          weatherIconAdjustHolder.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );
          // Printing daily forecast for search

          var dateDay1 = new Date(
            citySearchedData.daily[1].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay1.text(dateDay1);
          dailyDay1Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[1].weather[0].icon +
              "@2x.png"
          );
          dailyDay1Temp.text(
            citySearchedData.daily[1].temp.day + " Fareinheit"
          );
          dailyDay1Wind.text(citySearchedData.daily[1].wind_speed + "mph");
          dailyDay1Humidity.text(citySearchedData.daily[1].humidity);

          var dateDay2 = new Date(
            citySearchedData.daily[2].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay2.text(dateDay2);
          dailyDay2Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[2].weather[0].icon +
              "@2x.png"
          );
          dailyDay2Temp.text(
            citySearchedData.daily[2].temp.day + " Fareinheit"
          );
          dailyDay2Wind.text(citySearchedData.daily[2].wind_speed + "mph");
          dailyDay2Humidity.text(citySearchedData.daily[2].humidity);

          var dateDay3 = new Date(
            citySearchedData.daily[3].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay3.text(dateDay3);
          dailyDay3Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[3].weather[0].icon +
              "@2x.png"
          );
          dailyDay3Temp.text(
            citySearchedData.daily[3].temp.day + " Fareinheit"
          );
          dailyDay3Wind.text(citySearchedData.daily[3].wind_speed + "mph");
          dailyDay3Humidity.text(citySearchedData.daily[3].humidity);

          var dateDay4 = new Date(
            citySearchedData.daily[4].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay4.text(dateDay4);
          dailyDay4Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[4].weather[0].icon +
              "@2x.png"
          );
          dailyDay4Temp.text(
            citySearchedData.daily[4].temp.day + " Fareinheit"
          );
          dailyDay4Wind.text(citySearchedData.daily[4].wind_speed + "mph");
          dailyDay4Humidity.text(citySearchedData.daily[4].humidity);

          var dateDay5 = new Date(
            citySearchedData.daily[5].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay5.text(dateDay5);
          dailyDay5Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[5].weather[0].icon +
              "@2x.png"
          );
          dailyDay5Temp.text(
            citySearchedData.daily[5].temp.day + " Fareinheit"
          );
          dailyDay5Wind.text(citySearchedData.daily[5].wind_speed + "mph");
          dailyDay5Humidity.text(citySearchedData.daily[5].humidity);

          var dateDay6 = new Date(
            citySearchedData.daily[6].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay6.text(dateDay6);
          dailyDay6Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[6].weather[0].icon +
              "@2x.png"
          );
          dailyDay6Temp.text(
            citySearchedData.daily[6].temp.day + " Fareinheit"
          );
          dailyDay6Wind.text(citySearchedData.daily[6].wind_speed + "mph");
          dailyDay6Humidity.text(citySearchedData.daily[6].humidity);

          var dateDay7 = new Date(
            citySearchedData.daily[7].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay7.text(dateDay7);
          dailyDay7Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[7].weather[0].icon +
              "@2x.png"
          );
          dailyDay7Temp.text(
            citySearchedData.daily[7].temp.day + " Fareinheit"
          );
          dailyDay7Wind.text(citySearchedData.daily[7].wind_speed + "mph");
          dailyDay7Humidity.text(citySearchedData.daily[7].humidity);
        });
    });
}
// If user uses enter to submit form...
submitForm.on('submit', function(event) {
  event.preventDefault();
  queryRequst();
});
// if user clicks to submit form...
submitBtn.on('click', function(event) {
  event.preventDefault();
  queryRequst();
});

// Click listeners for the 5 history items that are stored...

// These are written individually as each uses the value of searchItem1 to run their fetch request, in hindsight I would create a "search history query" function that takes an argument/parameter of searchItemX.val() so that the code can be reused. Dont know how to prevent event default when writing this way though so leaving as is for now...
searchItem1.on("click", function (event) {
  event.preventDefault();

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchItem1.text() +
      "&appid=c11639f11059953c1817728af454e744"
  )
    .then((response) => response.json())
    .then((searchResponseData) => {
      var searchLatLon = [
        searchResponseData.coord.lat,
        searchResponseData.coord.lon,
      ];

      currentCityNameDisplay.text(searchResponseData.name);

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          searchLatLon[0] +
          "&lon=" +
          searchLatLon[1] +
          "&units=imperial&exclude=hourly,minutely&appid=c11639f11059953c1817728af454e744"
      )
        .then((response) => response.json())
        .then((citySearchedData) => {
          console.log(citySearchedData);
          // Printing search to Current City Display
          var dateNow = new Date(
            citySearchedData.current.dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          currentCityNameDisplay.text();
          console.log(dateNow);
          currentDateSpan.text(dateNow);

          currentCityTemp.text(citySearchedData.current.temp);

          currentCityWind.text(citySearchedData.current.wind_speed);

          currentCityHumidity.text(citySearchedData.current.humidity);

          currentCityUV.text(citySearchedData.current.uvi);

          currentCityWeatherIcon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );

          weatherIconAdjustHolder.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );
          // Printing daily forecast for search
          var dateDay1 = new Date(
            citySearchedData.daily[1].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay1.text(dateDay1);
          dailyDay1Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[1].weather[0].icon +
              "@2x.png"
          );
          dailyDay1Temp.text(
            citySearchedData.daily[1].temp.day + " Fareinheit"
          );
          dailyDay1Wind.text(citySearchedData.daily[1].wind_speed + "mph");
          dailyDay1Humidity.text(citySearchedData.daily[1].humidity);

          var dateDay2 = new Date(
            citySearchedData.daily[2].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay2.text(dateDay2);
          dailyDay2Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[2].weather[0].icon +
              "@2x.png"
          );
          dailyDay2Temp.text(
            citySearchedData.daily[2].temp.day + " Fareinheit"
          );
          dailyDay2Wind.text(citySearchedData.daily[2].wind_speed + "mph");
          dailyDay2Humidity.text(citySearchedData.daily[2].humidity);

          var dateDay3 = new Date(
            citySearchedData.daily[3].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay3.text(dateDay3);
          dailyDay3Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[3].weather[0].icon +
              "@2x.png"
          );
          dailyDay3Temp.text(
            citySearchedData.daily[3].temp.day + " Fareinheit"
          );
          dailyDay3Wind.text(citySearchedData.daily[3].wind_speed + "mph");
          dailyDay3Humidity.text(citySearchedData.daily[3].humidity);

          var dateDay4 = new Date(
            citySearchedData.daily[4].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay4.text(dateDay4);
          dailyDay4Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[4].weather[0].icon +
              "@2x.png"
          );
          dailyDay4Temp.text(
            citySearchedData.daily[4].temp.day + " Fareinheit"
          );
          dailyDay4Wind.text(citySearchedData.daily[4].wind_speed + "mph");
          dailyDay4Humidity.text(citySearchedData.daily[4].humidity);

          var dateDay5 = new Date(
            citySearchedData.daily[5].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay5.text(dateDay5);
          dailyDay5Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[5].weather[0].icon +
              "@2x.png"
          );
          dailyDay5Temp.text(
            citySearchedData.daily[5].temp.day + " Fareinheit"
          );
          dailyDay5Wind.text(citySearchedData.daily[5].wind_speed + "mph");
          dailyDay5Humidity.text(citySearchedData.daily[5].humidity);

          var dateDay6 = new Date(
            citySearchedData.daily[6].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay6.text(dateDay6);
          dailyDay6Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[6].weather[0].icon +
              "@2x.png"
          );
          dailyDay6Temp.text(
            citySearchedData.daily[6].temp.day + " Fareinheit"
          );
          dailyDay6Wind.text(citySearchedData.daily[6].wind_speed + "mph");
          dailyDay6Humidity.text(citySearchedData.daily[6].humidity);

          var dateDay7 = new Date(
            citySearchedData.daily[7].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay7.text(dateDay7);
          dailyDay7Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[7].weather[0].icon +
              "@2x.png"
          );
          dailyDay7Temp.text(
            citySearchedData.daily[7].temp.day + " Fareinheit"
          );
          dailyDay7Wind.text(citySearchedData.daily[7].wind_speed + "mph");
          dailyDay7Humidity.text(citySearchedData.daily[7].humidity);
        });
    });
  // Close sidebar?
  $("#sidebarBtn").trigger("click");
});

searchItem2.on("click", function (event) {
  event.preventDefault();
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchItem2.text() +
      "&appid=c11639f11059953c1817728af454e744"
  )
    .then((response) => response.json())
    .then((searchResponseData) => {
      var searchLatLon = [
        searchResponseData.coord.lat,
        searchResponseData.coord.lon,
      ];

      currentCityNameDisplay.text(searchResponseData.name);

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          searchLatLon[0] +
          "&lon=" +
          searchLatLon[1] +
          "&units=imperial&exclude=hourly,minutely&appid=c11639f11059953c1817728af454e744"
      )
        .then((response) => response.json())
        .then((citySearchedData) => {
          console.log(citySearchedData);
          // Printing search to Current City Display
          var dateNow = new Date(
            citySearchedData.current.dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          currentCityNameDisplay.text();
          console.log(dateNow);
          currentDateSpan.text(dateNow);

          currentCityTemp.text(citySearchedData.current.temp);

          currentCityWind.text(citySearchedData.current.wind_speed);

          currentCityHumidity.text(citySearchedData.current.humidity);

          currentCityUV.text(citySearchedData.current.uvi);

          currentCityWeatherIcon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );

          weatherIconAdjustHolder.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );
          // Printing daily forecast for search
          var dateDay1 = new Date(
            citySearchedData.daily[1].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay1.text(dateDay1);
          dailyDay1Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[1].weather[0].icon +
              "@2x.png"
          );
          dailyDay1Temp.text(
            citySearchedData.daily[1].temp.day + " Fareinheit"
          );
          dailyDay1Wind.text(citySearchedData.daily[1].wind_speed + "mph");
          dailyDay1Humidity.text(citySearchedData.daily[1].humidity);

          var dateDay2 = new Date(
            citySearchedData.daily[2].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay2.text(dateDay2);
          dailyDay2Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[2].weather[0].icon +
              "@2x.png"
          );
          dailyDay2Temp.text(
            citySearchedData.daily[2].temp.day + " Fareinheit"
          );
          dailyDay2Wind.text(citySearchedData.daily[2].wind_speed + "mph");
          dailyDay2Humidity.text(citySearchedData.daily[2].humidity);

          var dateDay3 = new Date(
            citySearchedData.daily[3].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay3.text(dateDay3);
          dailyDay3Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[3].weather[0].icon +
              "@2x.png"
          );
          dailyDay3Temp.text(
            citySearchedData.daily[3].temp.day + " Fareinheit"
          );
          dailyDay3Wind.text(citySearchedData.daily[3].wind_speed + "mph");
          dailyDay3Humidity.text(citySearchedData.daily[3].humidity);

          var dateDay4 = new Date(
            citySearchedData.daily[4].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay4.text(dateDay4);
          dailyDay4Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[4].weather[0].icon +
              "@2x.png"
          );
          dailyDay4Temp.text(
            citySearchedData.daily[4].temp.day + " Fareinheit"
          );
          dailyDay4Wind.text(citySearchedData.daily[4].wind_speed + "mph");
          dailyDay4Humidity.text(citySearchedData.daily[4].humidity);

          var dateDay5 = new Date(
            citySearchedData.daily[5].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay5.text(dateDay5);
          dailyDay5Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[5].weather[0].icon +
              "@2x.png"
          );
          dailyDay5Temp.text(
            citySearchedData.daily[5].temp.day + " Fareinheit"
          );
          dailyDay5Wind.text(citySearchedData.daily[5].wind_speed + "mph");
          dailyDay5Humidity.text(citySearchedData.daily[5].humidity);

          var dateDay6 = new Date(
            citySearchedData.daily[6].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay6.text(dateDay6);
          dailyDay6Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[6].weather[0].icon +
              "@2x.png"
          );
          dailyDay6Temp.text(
            citySearchedData.daily[6].temp.day + " Fareinheit"
          );
          dailyDay6Wind.text(citySearchedData.daily[6].wind_speed + "mph");
          dailyDay6Humidity.text(citySearchedData.daily[6].humidity);

          var dateDay7 = new Date(
            citySearchedData.daily[7].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay7.text(dateDay7);
          dailyDay7Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[7].weather[0].icon +
              "@2x.png"
          );
          dailyDay7Temp.text(
            citySearchedData.daily[7].temp.day + " Fareinheit"
          );
          dailyDay7Wind.text(citySearchedData.daily[7].wind_speed + "mph");
          dailyDay7Humidity.text(citySearchedData.daily[7].humidity);
        });
    });

  // Close sidebar?
  $("#sidebarBtn").trigger("click");
});

searchItem3.on("click", function (event) {
  event.preventDefault();
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchItem3.text() +
      "&appid=c11639f11059953c1817728af454e744"
  )
    .then((response) => response.json())
    .then((searchResponseData) => {
      var searchLatLon = [
        searchResponseData.coord.lat,
        searchResponseData.coord.lon,
      ];

      currentCityNameDisplay.text(searchResponseData.name);

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          searchLatLon[0] +
          "&lon=" +
          searchLatLon[1] +
          "&units=imperial&exclude=hourly,minutely&appid=c11639f11059953c1817728af454e744"
      )
        .then((response) => response.json())
        .then((citySearchedData) => {
          console.log(citySearchedData);
          // Printing search to Current City Display
          var dateNow = new Date(
            citySearchedData.current.dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          currentCityNameDisplay.text();
          console.log(dateNow);
          currentDateSpan.text(dateNow);

          currentCityTemp.text(citySearchedData.current.temp);

          currentCityWind.text(citySearchedData.current.wind_speed);

          currentCityHumidity.text(citySearchedData.current.humidity);

          currentCityUV.text(citySearchedData.current.uvi);

          currentCityWeatherIcon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );

          weatherIconAdjustHolder.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );
          // Printing daily forecast for search
          var dateDay1 = new Date(
            citySearchedData.daily[1].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay1.text(dateDay1);
          dailyDay1Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[1].weather[0].icon +
              "@2x.png"
          );
          dailyDay1Temp.text(
            citySearchedData.daily[1].temp.day + " Fareinheit"
          );
          dailyDay1Wind.text(citySearchedData.daily[1].wind_speed + "mph");
          dailyDay1Humidity.text(citySearchedData.daily[1].humidity);

          var dateDay2 = new Date(
            citySearchedData.daily[2].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay2.text(dateDay2);
          dailyDay2Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[2].weather[0].icon +
              "@2x.png"
          );
          dailyDay2Temp.text(
            citySearchedData.daily[2].temp.day + " Fareinheit"
          );
          dailyDay2Wind.text(citySearchedData.daily[2].wind_speed + "mph");
          dailyDay2Humidity.text(citySearchedData.daily[2].humidity);

          var dateDay3 = new Date(
            citySearchedData.daily[3].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay3.text(dateDay3);
          dailyDay3Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[3].weather[0].icon +
              "@2x.png"
          );
          dailyDay3Temp.text(
            citySearchedData.daily[3].temp.day + " Fareinheit"
          );
          dailyDay3Wind.text(citySearchedData.daily[3].wind_speed + "mph");
          dailyDay3Humidity.text(citySearchedData.daily[3].humidity);

          var dateDay4 = new Date(
            citySearchedData.daily[4].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay4.text(dateDay4);
          dailyDay4Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[4].weather[0].icon +
              "@2x.png"
          );
          dailyDay4Temp.text(
            citySearchedData.daily[4].temp.day + " Fareinheit"
          );
          dailyDay4Wind.text(citySearchedData.daily[4].wind_speed + "mph");
          dailyDay4Humidity.text(citySearchedData.daily[4].humidity);

          var dateDay5 = new Date(
            citySearchedData.daily[5].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay5.text(dateDay5);
          dailyDay5Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[5].weather[0].icon +
              "@2x.png"
          );
          dailyDay5Temp.text(
            citySearchedData.daily[5].temp.day + " Fareinheit"
          );
          dailyDay5Wind.text(citySearchedData.daily[5].wind_speed + "mph");
          dailyDay5Humidity.text(citySearchedData.daily[5].humidity);

          var dateDay6 = new Date(
            citySearchedData.daily[6].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay6.text(dateDay6);
          dailyDay6Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[6].weather[0].icon +
              "@2x.png"
          );
          dailyDay6Temp.text(
            citySearchedData.daily[6].temp.day + " Fareinheit"
          );
          dailyDay6Wind.text(citySearchedData.daily[6].wind_speed + "mph");
          dailyDay6Humidity.text(citySearchedData.daily[6].humidity);

          var dateDay7 = new Date(
            citySearchedData.daily[7].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay7.text(dateDay7);
          dailyDay7Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[7].weather[0].icon +
              "@2x.png"
          );
          dailyDay7Temp.text(
            citySearchedData.daily[7].temp.day + " Fareinheit"
          );
          dailyDay7Wind.text(citySearchedData.daily[7].wind_speed + "mph");
          dailyDay7Humidity.text(citySearchedData.daily[7].humidity);
        });
    });

  // Close sidebar?
  $("#sidebarBtn").trigger("click");
});

searchItem4.on("click", function (event) {
  event.preventDefault();
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchItem4.text() +
      "&appid=c11639f11059953c1817728af454e744"
  )
    .then((response) => response.json())
    .then((searchResponseData) => {
      var searchLatLon = [
        searchResponseData.coord.lat,
        searchResponseData.coord.lon,
      ];

      currentCityNameDisplay.text(searchResponseData.name);

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          searchLatLon[0] +
          "&lon=" +
          searchLatLon[1] +
          "&units=imperial&exclude=hourly,minutely&appid=c11639f11059953c1817728af454e744"
      )
        .then((response) => response.json())
        .then((citySearchedData) => {
          console.log(citySearchedData);
          // Printing search to Current City Display
          var dateNow = new Date(
            citySearchedData.current.dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          currentCityNameDisplay.text();
          console.log(dateNow);
          currentDateSpan.text(dateNow);

          currentCityTemp.text(citySearchedData.current.temp);

          currentCityWind.text(citySearchedData.current.wind_speed);

          currentCityHumidity.text(citySearchedData.current.humidity);

          currentCityUV.text(citySearchedData.current.uvi);

          currentCityWeatherIcon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );

          weatherIconAdjustHolder.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );
          // Printing daily forecast for search
          var dateDay1 = new Date(
            citySearchedData.daily[1].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay1.text(dateDay1);
          dailyDay1Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[1].weather[0].icon +
              "@2x.png"
          );
          dailyDay1Temp.text(
            citySearchedData.daily[1].temp.day + " Fareinheit"
          );
          dailyDay1Wind.text(citySearchedData.daily[1].wind_speed + "mph");
          dailyDay1Humidity.text(citySearchedData.daily[1].humidity);

          var dateDay2 = new Date(
            citySearchedData.daily[2].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay2.text(dateDay2);
          dailyDay2Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[2].weather[0].icon +
              "@2x.png"
          );
          dailyDay2Temp.text(
            citySearchedData.daily[2].temp.day + " Fareinheit"
          );
          dailyDay2Wind.text(citySearchedData.daily[2].wind_speed + "mph");
          dailyDay2Humidity.text(citySearchedData.daily[2].humidity);

          var dateDay3 = new Date(
            citySearchedData.daily[3].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay3.text(dateDay3);
          dailyDay3Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[3].weather[0].icon +
              "@2x.png"
          );
          dailyDay3Temp.text(
            citySearchedData.daily[3].temp.day + " Fareinheit"
          );
          dailyDay3Wind.text(citySearchedData.daily[3].wind_speed + "mph");
          dailyDay3Humidity.text(citySearchedData.daily[3].humidity);

          var dateDay4 = new Date(
            citySearchedData.daily[4].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay4.text(dateDay4);
          dailyDay4Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[4].weather[0].icon +
              "@2x.png"
          );
          dailyDay4Temp.text(
            citySearchedData.daily[4].temp.day + " Fareinheit"
          );
          dailyDay4Wind.text(citySearchedData.daily[4].wind_speed + "mph");
          dailyDay4Humidity.text(citySearchedData.daily[4].humidity);

          var dateDay5 = new Date(
            citySearchedData.daily[5].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay5.text(dateDay5);
          dailyDay5Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[5].weather[0].icon +
              "@2x.png"
          );
          dailyDay5Temp.text(
            citySearchedData.daily[5].temp.day + " Fareinheit"
          );
          dailyDay5Wind.text(citySearchedData.daily[5].wind_speed + "mph");
          dailyDay5Humidity.text(citySearchedData.daily[5].humidity);

          var dateDay6 = new Date(
            citySearchedData.daily[6].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay6.text(dateDay6);
          dailyDay6Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[6].weather[0].icon +
              "@2x.png"
          );
          dailyDay6Temp.text(
            citySearchedData.daily[6].temp.day + " Fareinheit"
          );
          dailyDay6Wind.text(citySearchedData.daily[6].wind_speed + "mph");
          dailyDay6Humidity.text(citySearchedData.daily[6].humidity);

          var dateDay7 = new Date(
            citySearchedData.daily[7].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay7.text(dateDay7);
          dailyDay7Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[7].weather[0].icon +
              "@2x.png"
          );
          dailyDay7Temp.text(
            citySearchedData.daily[7].temp.day + " Fareinheit"
          );
          dailyDay7Wind.text(citySearchedData.daily[7].wind_speed + "mph");
          dailyDay7Humidity.text(citySearchedData.daily[7].humidity);
        });
    });

  // Close sidebar?
  $("#sidebarBtn").trigger("click");
});

searchItem5.on("click", function (event) {
  event.preventDefault();
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchItem5.text() +
      "&appid=c11639f11059953c1817728af454e744"
  )
    .then((response) => response.json())
    .then((searchResponseData) => {
      var searchLatLon = [
        searchResponseData.coord.lat,
        searchResponseData.coord.lon,
      ];

      currentCityNameDisplay.text(searchResponseData.name);

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          searchLatLon[0] +
          "&lon=" +
          searchLatLon[1] +
          "&units=imperial&exclude=hourly,minutely&appid=c11639f11059953c1817728af454e744"
      )
        .then((response) => response.json())
        .then((citySearchedData) => {
          console.log(citySearchedData);
          // Printing search to Current City Display
          var dateNow = new Date(
            citySearchedData.current.dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          currentCityNameDisplay.text();
          console.log(dateNow);
          currentDateSpan.text(dateNow);

          currentCityTemp.text(citySearchedData.current.temp);

          currentCityWind.text(citySearchedData.current.wind_speed);

          currentCityHumidity.text(citySearchedData.current.humidity);

          currentCityUV.text(citySearchedData.current.uvi);

          currentCityWeatherIcon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );

          weatherIconAdjustHolder.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.current.weather[0].icon +
              "@4x.png"
          );
          // Printing daily forecast for search
          var dateDay1 = new Date(
            citySearchedData.daily[1].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay1.text(dateDay1);
          dailyDay1Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[1].weather[0].icon +
              "@2x.png"
          );
          dailyDay1Temp.text(
            citySearchedData.daily[1].temp.day + " Fareinheit"
          );
          dailyDay1Wind.text(citySearchedData.daily[1].wind_speed + "mph");
          dailyDay1Humidity.text(citySearchedData.daily[1].humidity);

          var dateDay2 = new Date(
            citySearchedData.daily[2].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay2.text(dateDay2);
          dailyDay2Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[2].weather[0].icon +
              "@2x.png"
          );
          dailyDay2Temp.text(
            citySearchedData.daily[2].temp.day + " Fareinheit"
          );
          dailyDay2Wind.text(citySearchedData.daily[2].wind_speed + "mph");
          dailyDay2Humidity.text(citySearchedData.daily[2].humidity);

          var dateDay3 = new Date(
            citySearchedData.daily[3].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay3.text(dateDay3);
          dailyDay3Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[3].weather[0].icon +
              "@2x.png"
          );
          dailyDay3Temp.text(
            citySearchedData.daily[3].temp.day + " Fareinheit"
          );
          dailyDay3Wind.text(citySearchedData.daily[3].wind_speed + "mph");
          dailyDay3Humidity.text(citySearchedData.daily[3].humidity);

          var dateDay4 = new Date(
            citySearchedData.daily[4].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay4.text(dateDay4);
          dailyDay4Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[4].weather[0].icon +
              "@2x.png"
          );
          dailyDay4Temp.text(
            citySearchedData.daily[4].temp.day + " Fareinheit"
          );
          dailyDay4Wind.text(citySearchedData.daily[4].wind_speed + "mph");
          dailyDay4Humidity.text(citySearchedData.daily[4].humidity);

          var dateDay5 = new Date(
            citySearchedData.daily[5].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay5.text(dateDay5);
          dailyDay5Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[5].weather[0].icon +
              "@2x.png"
          );
          dailyDay5Temp.text(
            citySearchedData.daily[5].temp.day + " Fareinheit"
          );
          dailyDay5Wind.text(citySearchedData.daily[5].wind_speed + "mph");
          dailyDay5Humidity.text(citySearchedData.daily[5].humidity);

          var dateDay6 = new Date(
            citySearchedData.daily[6].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay6.text(dateDay6);
          dailyDay6Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[6].weather[0].icon +
              "@2x.png"
          );
          dailyDay6Temp.text(
            citySearchedData.daily[6].temp.day + " Fareinheit"
          );
          dailyDay6Wind.text(citySearchedData.daily[6].wind_speed + "mph");
          dailyDay6Humidity.text(citySearchedData.daily[6].humidity);

          var dateDay7 = new Date(
            citySearchedData.daily[7].dt * 1000
          ).toLocaleDateString("en-gb", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          });
          dailyDay7.text(dateDay7);
          dailyDay7Icon.attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              citySearchedData.daily[7].weather[0].icon +
              "@2x.png"
          );
          dailyDay7Temp.text(
            citySearchedData.daily[7].temp.day + " Fareinheit"
          );
          dailyDay7Wind.text(citySearchedData.daily[7].wind_speed + "mph");
          dailyDay7Humidity.text(citySearchedData.daily[7].humidity);
        });
    });

  // Close sidebar?
  $("#sidebarBtn").trigger("click");
});
