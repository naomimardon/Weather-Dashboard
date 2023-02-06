let cities = [];

function init () {
    const storedCities = JSON.parse(localStorage.getItem("Cities"));
    if (storedCities !== null) {
        cities = storedCities;
        renderCityButtons();
    }
}

function renderCityButtons() {
    let cityContainer = $(".list-group");

    cityContainer.empty();

    cities.forEach(function (city) {
        let cityButton = $("<button>");
            cityButton.text(city);
            cityButton.addClass("cityBtn btn btn-secondary btn-lg btn-block");
            cityButton.attr("type", "button");
            cityButton.attr("data-city", city);
            cityButton.css("border-radius", "5px");
            cityContainer.prepend(cityButton);
    });
};

function storeCitiesArray() {
    localStorage.setItem("Cities", JSON.stringify(cities));
};

function callWeatherData(weatherResponse) {
    console.log(weatherResponse);
    console.log(weatherResponse.list[0].main.temp);
}

function buildQueryURL() {
const APIKey = "2befb069531c6856f267a412d5ad148c";
let cityInput = $("#search-input").val().trim().toLowerCase();

lonLatURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + APIKey;

    $.ajax({
        url: lonLatURL,
        method: "GET"
    }).then(function(geoResponse) {
        let lon = geoResponse[0].lon;
        let lat = geoResponse[0].lat;
        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" +APIKey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(weatherResponse) {
            callWeatherData(weatherResponse);
        });
    });

};

$("#search-button").on("click", function(event) {
    event.preventDefault();
    let cityInput = $("#search-input").val().trim().toUpperCase();
    cities.push(cityInput);
    if (cities.length > 5) {
        cities.shift();
    }

    renderCityButtons();
    storeCitiesArray();
    buildQueryURL();

    cityInput = $("#search-input").val("");
});

init();





