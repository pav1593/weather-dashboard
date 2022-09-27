// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// assignments and declarations

var searchFormEl = document.querySelector('#user-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var searchInputEl = document.querySelector('#search');
var resultsContainerEl = document.querySelector('#results-container');
var repoSearchTerm = document.querySelector('#repo-search-term');


// get user input from search field when search button is pressed

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var searchStr = searchInputEl.value.trim();
  
    if (searchStr) {
      console.log(searchStr);
  
      searchInputEl.value = '';
    } else {
      alert('Please enter a city');
    }
  };

// get user input if search history city button is clicked

function seachHistoryButton() {

}

// verify city input
// convert city input to coordinates


function getCityAPI(str) {

    let apiUrl = "";

  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => console.log(data));
}

// save varified city/coordinates locally as search history

function saveSearchHistory (data) {
    
}

//make API call for the given city and receive data

function getWeatherAPI(str) {

    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => console.log(data));
}

// process current forecast

// process 5 day forecast

// display current forecast

function displayCurrentWeather() {

}

// display 5 day forecast

function displayForecast() {

}


// display search history (if any)

function displaySearchHistory (history) {

}

// main code and listeners

searchFormEl.addEventListener('submit', formSubmitHandler);
//historyButton.addEventListener('click',seachHistoryButton);