let cities = [];

function init () {
    let storedCities = JSON.parse(localStorage.getItem("Cities"));
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

function renderTodaysWeather(weatherResponse) {
    console.log(weatherResponse);

    let today = $("#today")
        .css("border", "2px solid black")

    let cityInput = $("#search-input").val().trim().toUpperCase();
    let todaysHeader = $("#todaysHeader");
    let todaysDate = moment().format("(DD/MM/YYYY)");
    todaysHeader.text(cityInput + " " + todaysDate);

    let todaysIconID = weatherResponse.list[0].weather[0].icon;
    let iconURL = 'https://openweathermap.org/img/wn/'+ todaysIconID + '@2x.png';
    let todaysIcon = $("<img>")
        .attr("src", iconURL);
    todaysHeader.append(todaysIcon);

    let todaysTemp = $("#todaysTemp");
    todaysTemp.text("Temperature: " + weatherResponse.list[0].main.temp + "°C");

    let todaysWind = $("#todaysWind");
    let todaysWindSpeed = Math.round((weatherResponse.list[0].wind.speed *10) *100) /100;
    todaysWind.text("Wind Speed: " + todaysWindSpeed + "km/hr");

    let todaysHumidity = $("#todaysHumidity");
    todaysHumidity.text("Humidity: " + weatherResponse.list[0].main.humidity + "%");

    cityInput = $("#search-input").val("");
}

function buildQueryURL() {
let APIKey = "2befb069531c6856f267a412d5ad148c";
let cityInput = $("#search-input").val().trim().toLowerCase();

lonLatURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + APIKey;
console.log("lonLatURL: " + lonLatURL);

    $.ajax({
        url: lonLatURL,
        method: "GET"
    }).then(function(geoResponse) {
        let lon = geoResponse[0].lon;
        let lat = geoResponse[0].lat;
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" +APIKey;
        console.log(queryURL);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(weatherResponse) {
            renderTodaysWeather(weatherResponse);
        });
    });

};

$("#search-button").on("click", function(event) {
    event.preventDefault();
    let cityInput = $("#search-input").val().trim().toUpperCase();
    console.log(cityInput);
    if (cities.includes(cityInput)) {
        console.log("Already in search list");;
    } else {
        cities.push(cityInput);
    }
    if (cities.length > 5) {
        cities.shift();
    }

    storeCitiesArray();
    renderCityButtons();
    buildQueryURL();

    
});

init();





