// OPEN WEATHER API CALL REFERENCE 

// API KEY: c11639f11059953c1817728af454e744

// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

// On page load, update weather from localStorage items
// ie: pull the x-5 index localStorage items to get the previous 5
// If none wait for field input

let x = localStorage.length
console.log(x)
$("#btn").submit(function(event) {
    event.preventDefault();
    localStorage.setItem(x, $("#searchInput").val());
    x++;
});

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&appid=c11639f11059953c1817728af454e744`)
.then(response => response.json())
.then(data => console.log(data));