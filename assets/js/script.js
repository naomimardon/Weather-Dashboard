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

$("#search-button").on("click", function(event) {
    event.preventDefault();
    let cityInput = $("#search-input").val().trim();
    cities.push(cityInput);
    if (cities.length > 5) {
        cities.shift();
    }

    renderCityButtons();
    storeCitiesArray();

    cityInput = $("#search-input").val("");
});

init();





