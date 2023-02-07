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
    let iconURL = "https://openweathermap.org/img/wn/"+ todaysIconID + "@2x.png";
    let todaysIcon = $("<img>")
        .attr("src", iconURL);
    todaysHeader.append(todaysIcon);

    let todaysTemp = $("#todaysTemp");
    todaysTemp.text("Temperature: " + parseInt(weatherResponse.list[0].main.temp) + "°C");

    let todaysWind = $("#todaysWind");
    let windSpeed = parseInt((weatherResponse.list[0].wind.speed) * 3.6);
    todaysWind.text("Wind Speed: " + windSpeed + " km/h");

    let todaysHumidity = $("#todaysHumidity");
    todaysHumidity.text("Humidity: " + weatherResponse.list[0].main.humidity + "%");

    cityInput = $("#search-input").val("");
}

function renderForecast(weatherResponse) {
    console.log(weatherResponse);

    $("#forecastHeaderRow").empty();
    $("#forecastRow").empty();

    let forecastHeader = $("<h3>")
        .attr("id", "forecastHeader")
        .css("padding-left", "20px")
        .text("5 Day Forecast:")
    $("#forecastHeaderRow").append(forecastHeader);

    forecastArray = [weatherResponse.list[8], weatherResponse.list[16], weatherResponse.list[24], weatherResponse.list[32], weatherResponse.list[39]]
    console.log(forecastArray);
    forecastArray.forEach(function (forecast) {
        let dayCard = $("<div>")
            .addClass("card dayCard");

        let dayIconID = forecast.weather[0].icon;
        let dayIconURL = "https://openweathermap.org/img/wn/"+ dayIconID + "@2x.png";
        let dayIcon = $("<img>")
            .addClass("card-img-top dayIcon")
            .attr("src", dayIconURL);

        let dayHeader = $("<h4>")
            .addClass("dayHeader");
        let date = moment(forecast.dt_txt, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY")
        dayHeader.text(date);


        let dayTemp = $("<p>")
            .addClass("card-text dayPTag")
            .attr("id", "dayTemp");
        let temp = parseInt(forecast.main.temp);
        dayTemp.text("Temp: " + temp + "°C");
        
        let dayWind = $("<p>")
            .addClass("card-text dayPTag")
            .attr("id", "dayWind");
        let wind = parseInt((forecast.wind.speed) *3.6);
        dayWind.text("Wind: " + wind + " km/h");
        
        let dayHumidity = $("<p>")
            .addClass("card-text dayPTag")
            .attr("id", "dayHumidity");
        let humidity = forecast.main.humidity;
        dayHumidity.text("Humidity: " + humidity + "%");
        
        dayCard.append(dayIcon);
        dayCard.append(dayHeader);
        dayCard.append(dayTemp);
        dayCard.append(dayWind);
        dayCard.append(dayHumidity);

        $("#forecastRow").append(dayCard);
    });
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
            renderForecast(weatherResponse);
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





