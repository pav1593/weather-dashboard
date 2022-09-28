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

// get user input if search history city button is clicked

function searchHistoryButton(event) {
    let item = event.target;
    let history = JSON.parse(localStorage.getItem("searchHistory"));
    let lat=0;
    let lon=0;

    console.log($(item).text());
    for(let i=0;i<history.length;i++) {
        if (history[i].name===$(item).text()) {
            lat=history[i].lat;
            lon=history[i].lon;
            console.log(history[i].name,lat,lon);
        } 
    }

    getWeatherAPI("",lat.toFixed(2),lon.toFixed(2));
    
}

// verify city input
// convert city input to coordinates


function getCityAPI(str) {

    let apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+str+'&limit=5&appid=d94837374dd795af58b4fafcf7fe308f';

  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    
    city.name=data[0].name;
    city.lat=data[0].lat;
    city.lon=data[0].lon;

    let history = JSON.parse(localStorage.getItem("searchHistory"));

    if (history !== null) {
          searchHistory=history;
      }

    if (!checkSearchHistory(city.name)) {

      searchHistory.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }

    getWeatherAPI("",city.lat.toFixed(2),city.lon.toFixed(2));
  
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
    
  displayCurrentWeather(data);
  displayForecast(data);
  displaySearchHistory();

  });
}

// process current forecast

// process 5 day forecast

// display current forecast

function reformatDate(date) {

    let reformatDateStr = moment(date, "YYYY-MM-DD h:mm:ss").format("MM/DD/YYYY");

  return reformatDateStr;
}

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


// retrieve search history if any

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
  let defaultUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=43.65&lon=-79.38&appid=d94837374dd795af58b4fafcf7fe308f&units=metric';
  displaySearchHistory();
  getWeatherAPI(defaultUrl,0,0);
}

main();