let cities = [];


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

$("#search-button").on("click", function(event) {
    event.preventDefault();
    let cityInput = $("#search-input").val().trim();
    cities.push(cityInput);
    if (cities.length > 5) {
        cities.shift();
    }
    console.log(cities);

    renderCityButtons();

    cityInput = $("#search-input").val("");
})





