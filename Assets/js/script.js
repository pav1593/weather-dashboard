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

var searchHistory = [];

// declare city object to store city attribs
var city = {

    name: "",
    lat: 0,
    lon: 0
};

// get user input from search field when search button is pressed

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var searchStr = searchInputEl.value.trim();
  
    if (searchStr) {
     
      getCityAPI(searchStr);
  
      searchInputEl.value = '';
    } else {
      alert('Please enter a city');
    }
  };

// get user input if search history city button is clicked and fetch the weather data for item in history

function searchHistoryButton(event) {
    let item = event.target;
    let history = JSON.parse(localStorage.getItem("searchHistory"));
    let lat=0;
    let lon=0;

    for(let i=0;i<history.length;i++) {
        if (history[i].name===$(item).text()) {
            lat=history[i].lat;
            lon=history[i].lon;
        } 
    }
    searchInputEl.value = '';
    getWeatherAPI("",lat.toFixed(2),lon.toFixed(2));
    
}

// convert city input to coordinates
function getCityAPI(str) {

    let apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+str+'&limit=5&appid=d94837374dd795af58b4fafcf7fe308f';

  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    
    if (data===null) {
        alert('City not found. Please try again.');
        return;
    }
    //populate the city object with info if data payload received
    city.name=data[0].name;
    city.lat=data[0].lat;
    city.lon=data[0].lon;

    // check to see if there's any seach history, if so then copy over that history prior to adding new items
    let history = JSON.parse(localStorage.getItem("searchHistory"));
    if (history !== null) {
          searchHistory=history;
      }

    // check that city search is not already in search history before making a geolocation API call and don't double-count into search history
    if (!checkSearchHistory(city.name)) {

      searchHistory.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }

    getWeatherAPI("",city.lat.toFixed(2),city.lon.toFixed(2));
  
  }).catch((error) => {
    alert('There was an error looking up the city name. Please try again. Error: ',error);
  });
}

//make API call for the given city and receive data

function getWeatherAPI(str,lat,lon) {
  
  if (str==="") {
    apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=d94837374dd795af58b4fafcf7fe308f&units=metric';
    //let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=43.65&lon=-79.38&appid=d94837374dd795af58b4fafcf7fe308f&units=metric'; // test link
  } else {
      apiUrl = str;      
  }

  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    
    if (data===null) {
      alert('Weather data not found. Please try again.');
      return;
  }

    displayCurrentWeather(data);
    displayForecast(data);
    displaySearchHistory();

  }).catch((error) => {
    alert('There was an error retreiving weather information. Please try again. Error: ',error);
  });
}



// this function uses moment() api to reformat the time for display
function reformatDate(date) {

    let reformatDateStr = moment(date, "YYYY-MM-DD h:mm:ss").format("MM/DD/YYYY");

  return reformatDateStr;
}

// display current forecast
function displayCurrentWeather(data) {

  $('#city-header').text(data.city.name +' ('+reformatDate(data.list[0].dt_txt)+') ');
  $('#city-icon').attr('src', 'http://openweathermap.org/img/w/'+data.list[0].weather[0].icon+'.png');
  $('#temp-current').text(data.list[0].main.temp);
  $('#wind-current').text(data.list[0].wind.speed);
  $('#humidity-current').text(data.list[0].main.humidity);


}

// display 5 day forecast

function displayForecast(data) {

  $('#day1-date').text(reformatDate(data.list[0].dt_txt));
  $('#day1-icon').attr('src', 'http://openweathermap.org/img/w/'+data.list[0].weather[0].icon+'.png');
  $('#temp-day1').text(data.list[0].main.temp);
  $('#wind-day1').text(data.list[0].wind.speed);
  $('#humidity-day1').text(data.list[0].main.humidity);
 
  $('#day2-date').text(reformatDate(data.list[11].dt_txt));
  $('#day2-icon').attr('src', 'http://openweathermap.org/img/w/'+data.list[11].weather[0].icon+'.png');
  $('#temp-day2').text(data.list[11].main.temp);
  $('#wind-day2').text(data.list[11].wind.speed);
  $('#humidity-day2').text(data.list[11].main.humidity);

  $('#day3-date').text(reformatDate(data.list[19].dt_txt));
  $('#day3-icon').attr('src', 'http://openweathermap.org/img/w/'+data.list[19].weather[0].icon+'.png');
  $('#temp-day3').text(data.list[19].main.temp);
  $('#wind-day3').text(data.list[19].wind.speed);
  $('#humidity-day3').text(data.list[19].main.humidity);

  $('#day4-date').text(reformatDate(data.list[27].dt_txt));
  $('#day4-icon').attr('src', 'http://openweathermap.org/img/w/'+data.list[27].weather[0].icon+'.png');
  $('#temp-day4').text(data.list[27].main.temp);
  $('#wind-day4').text(data.list[27].wind.speed);
  $('#humidity-day4').text(data.list[27].main.humidity);

  $('#day5-date').text(reformatDate(data.list[35].dt_txt));
  $('#day5-icon').attr('src', 'http://openweathermap.org/img/w/'+data.list[35].weather[0].icon+'.png');
  $('#temp-day5').text(data.list[35].main.temp);
  $('#wind-day5').text(data.list[35].wind.speed);
  $('#humidity-day5').text(data.list[35].main.humidity);
      
}


// check if there's a duplicate entry in the search history

function checkSearchHistory(str) {

  let isIncluded = false;

  let history = JSON.parse(localStorage.getItem("searchHistory"));

  if (history !== null) {

    for (let i=0;i<history.length;i++) {
        if(history[i].name===str) {
              isIncluded = !isIncluded;
              return isIncluded;
        }
    }
  }
  return isIncluded;
}


// display search history (if any)

function displaySearchHistory() {

  $('#searchHistory').text('');
  
  let history = JSON.parse(localStorage.getItem("searchHistory"));

  if (history !== null) {
  
    for (let i=0;i<history.length;i++) {
    
          var buttonEl = $('<button>');
          buttonEl.addClass("btn btn-primary mr-1");
          buttonEl.attr('type','submit');
          buttonEl.attr('id','button');
          buttonEl.text(history[i].name);
          $('#searchHistory').append(buttonEl);

    }
  }

}

// main code and listeners

searchFormEl.addEventListener('submit', formSubmitHandler);
$('#searchHistory').on('click','#button',searchHistoryButton);

function main() {
  // displays Toronto weather as the default
  let defaultUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=43.65&lon=-79.38&appid=d94837374dd795af58b4fafcf7fe308f&units=metric';
  displaySearchHistory();
  getWeatherAPI(defaultUrl,0,0);
}

main();