// Grabbing visitor IP address...
var userLoc 
fetch("https://ipinfo.io/json?token=5607825501f064").then(
    (response) => response.json()
).then( (data) => {
    console.log(data);
    currentCityNameDisplay.text(data.city);
    userLoc = data.loc;
    console.log(userLoc);
})




// DOM Nodes...
var currentCityNameDisplay = $("#cityNameDisplay")
var currentCityTemp = $("#temp")
var currentCityWind = $("#wind")
var currentCityHumidity = $("#humidity")
var currentCityUV = $("#uv")

// City Lat/Lon holders for search api response


// Check local storage for search info, pull latest key and fetch current weather data for previously searched entry
if (localStorage.length > 0) {

}
// Stringholder for Fetch
var fetchForm = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=c11639f11059953c1817728af454e744"

let x = localStorage.length
$("#btn").submit(function(event) {
    event.preventDefault();
    localStorage.setItem(x, $("#searchInput").val());
    x++;
});

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&appid=c11639f11059953c1817728af454e744`)
.then(response => response.json())
.then(data => console.log(data));