//DECLARE VARIABLES
//header elements
var currentDayEl = document.querySelector("#currentDay");
//search elements
var inputEl = document.querySelector("#cityInput");
var searchBtn = document.querySelector("#searchBtn");
var searchedList = document.querySelector("#citySearched");
var searchedListItem = document.querySelector(".search-list");
//City information elements
var cityNameEl = document.querySelector("#cityName");
var cityTempEl = document.querySelector("#cityTemp");
var cityWindEl = document.querySelector("#cityWind");
var cityHumidEl = document.querySelector("#cityHumid");
var cityUVEl = document.querySelector("#cityUV");
//5-day forecast elements
var forecastEl = document.querySelector("#forecast");
//Day 1
var oneDateEl = document.querySelector("#oneDate");
var oneIconEl = document.querySelector("#oneIcon");
var oneTempEl = document.querySelector("#oneTemp");
var oneWindEl = document.querySelector("#oneWind");
var oneHumidEl = document.querySelector("#oneHumid");
//Day 2
var twoDateEl = document.querySelector("#twoDate");
var twoIconEl = document.querySelector("#twoIcon");
var twoTempEl = document.querySelector("#twoTemp");
var twoWindEl = document.querySelector("#twoWind");
var twoHumidEl = document.querySelector("#twoHumid");
//Day 3
var threeDateEl = document.querySelector("#threeDate");
var threeIconEl = document.querySelector("#threeIcon");
var threeTempEl = document.querySelector("#threeTemp");
var threeWindEl = document.querySelector("#threeWind");
var threeHumidEl = document.querySelector("#threeHumid");
//Day 4
var fourDateEl = document.querySelector("#fourDate");
var fourIconEl = document.querySelector("#fourIcon");
var fourTempEl = document.querySelector("#fourTemp");
var fourWindEl = document.querySelector("#fourWind");
var fourHumidEl = document.querySelector("#fourHumid");
//Day 5
var fiveDateEl = document.querySelector("#fiveDate");
var fiveIconEl = document.querySelector("#fiveIcon");
var fiveTempEl = document.querySelector("#fiveTemp");
var fiveWindEl = document.querySelector("#fiveWind");
var fiveHumidEl = document.querySelector("#fiveHumid");
// Other variables

function pageRender() {
  const now = moment().format("LL");
  currentDayEl.textContent = now;
  forecastEl.style.display = "none";
}
pageRender();
/*
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
*/

/*
1. user types in input
2. user clicks button
  2.1. user input value is added as text content on a new list item under the search section
  2.2. selection of list item (city name) make the same fetch call in step 3 below.
3. fetch() - 
    3.1. using the city name of the user input, make fetch call to geocoding API of openweather
    3.2. return data should have latitude and longitude values
    3.3. use lat and long values to fill in full requestURL for location weather
    3.4 fetch for the one call API from open weather
    3.5 return data should have temp, wind, humidity and UV index (for today, and next 5 days)
4. take JSON response from 3.5 and 
    4.1 create new text content for the respective elements on each card
    4.2 including dates on main card and forecast cards
    4.2 - conditionals needed:
    -UV index - ranges for green, yellow, and red
    -weather icon - based on weather show certain icon
*/

function renderSearches() {
  //locally store city searches
  var citySearch = inputEl.value;
  //   ---setting captured values to local storage---
  localStorage.setItem("citySearch", citySearch);
  var citySearchItem = localStorage.getItem("citySearch");
  var cityLi = document.createElement("li");
  cityLi.classList.add("search-list");
  var cityBtn = document.createElement("button");
  //   cityBtn.setAttribute(‘data-city’,‘para-1’);
  cityBtn.classList.add("search-button");

  cityBtn.textContent = citySearchItem;
  cityLi.appendChild(cityBtn);
  searchedList.appendChild(cityLi);
}

//event delegation - need all city search buttons to retrigger searches using the button text
function redoSearch() {}

function fetchResults(event) {
  event.preventDefault();
  //show 5-day forecast section
  forecastEl.style.display = "block";
  //variable for user input city
  var citySearch = inputEl.value;
  if (!citySearch) {
    alert("Please enter a city name");
  }

  renderSearches();
  //geo-location fetch
  var geoURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    citySearch +
    "&limit=1&appid=7a7cf95b9e7bc5abfa9774305fd77b7e";
  fetch(geoURL)
    .then(function (responseGeo) {
      console.log(responseGeo);
      return responseGeo.json();
    })
    .then(function (dataGeo) {
      console.log(dataGeo);
      var latitude = dataGeo[0].lat.toFixed(2);
      console.log(latitude);
      var longitude = dataGeo[0].lon.toFixed(2);
      console.log(longitude);

      //2nd fetch call using the geolocation info
      var requestURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=imperial&exclude=minutely,hourly,alerts&appid=7a7cf95b9e7bc5abfa9774305fd77b7e";
      fetch(requestURL)
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          //current variables
          var currentTemp = data.current.temp;
          var currentWind = data.current.wind_speed;
          var currentHumid = data.current.humidity;
          var currentUV = data.current.uvi;
          console.log(currentUV);
          var currentIcon = data.current.weather[0].icon;
          //day 1 forecast variables
          var oneTemp = data.daily[0].temp.day;
          var oneWind = data.daily[0].wind_speed;
          var oneHumid = data.daily[0].humidity;
          var oneIconCode = data.daily[0].weather[0].icon;
          var oneIcon =
            "http://openweathermap.org/img/wn/" + oneIconCode + "@2x.png";
          //day 2 forecast variables
          var twoTemp = data.daily[1].temp.day;
          var twoWind = data.daily[1].wind_speed;
          var twoHumid = data.daily[1].humidity;
          var twoIconCode = data.daily[1].weather[0].icon;
          var twoIcon =
            "http://openweathermap.org/img/wn/" + twoIconCode + "@2x.png";
          //day 3 forecast variables
          var threeTemp = data.daily[2].temp.day;
          var threeWind = data.daily[2].wind_speed;
          var threeHumid = data.daily[2].humidity;
          var threeIconCode = data.daily[2].weather[0].icon;
          var threeIcon =
            "http://openweathermap.org/img/wn/" + threeIconCode + "@2x.png";
          //day 4 forecast variables
          var fourTemp = data.daily[3].temp.day;
          var fourWind = data.daily[3].wind_speed;
          var fourHumid = data.daily[3].humidity;
          var fourIconCode = data.daily[3].weather[0].icon;
          var fourIcon =
            "http://openweathermap.org/img/wn/" + fourIconCode + "@2x.png";
          //day 5 forecast variables
          var fiveTemp = data.daily[4].temp.day;
          var fiveWind = data.daily[4].wind_speed;
          var fiveHumid = data.daily[4].humidity;
          var fiveIconCode = data.daily[4].weather[0].icon;
          var fiveIcon =
            "http://openweathermap.org/img/wn/" + fiveIconCode + "@2x.png";
          // TEXT CONTENT
          //City information elements
          cityNameEl.textContent = citySearch;
          cityTempEl.textContent = "Temp: " + currentTemp + "\u00B0F";
          cityWindEl.textContent = "Wind: " + currentWind + " MPH";
          cityHumidEl.textContent = "Humidity: " + currentHumid + " %";
          cityUVEl.textContent = currentUV;
          if (currentUV < 3) {
            cityUVEl.classList.add("lowUV");
          } else if (current < 6) {
            cityUVEl.classList.add("medUV");
          } else if (current < 8) {
            cityUVEl.classList.add("hiUV");
          } else {
            cityUVEl.classList.add("veryHiUV");
          }
          //5-day forecast elements
          //Day 1
          oneDateEl.textContent = moment().add(1, "days").format("l");
          oneIconEl.src = oneIcon;
          oneTempEl.textContent = "Temp: " + oneTemp + "\u00B0F";
          oneWindEl.textContent = "Wind: " + oneWind + " MPH";
          oneHumidEl.textContent = "Humidity: " + oneHumid + " %";
          //Day 2
          twoDateEl.textContent = moment().add(2, "days").format("l");
          twoIconEl.src = twoIcon;
          twoTempEl.textContent = "Temp: " + twoTemp + "\u00B0F";
          twoWindEl.textContent = "Wind: " + twoWind + " MPH";
          twoHumidEl.textContent = "Humidity: " + twoHumid + " %";
          //Day 3
          threeDateEl.textContent = moment().add(3, "days").format("l");
          threeIconEl.src = threeIcon;
          threeTempEl.textContent = "Temp: " + threeTemp + "\u00B0F";
          threeWindEl.textContent = "Wind: " + threeWind + " MPH";
          threeHumidEl.textContent = "Humidity: " + threeHumid + " %";
          //Day 4
          fourDateEl.textContent = moment().add(4, "days").format("l");
          fourIconEl.src = fourIcon;
          fourTempEl.textContent = "Temp: " + fourTemp + "\u00B0F";
          fourWindEl.textContent = "Wind: " + fourWind + " MPH";
          fourHumidEl.textContent = "Humidity: " + fourHumid + " %";
          //Day 5
          fiveDateEl.textContent = moment().add(5, "days").format("l");
          fiveIconEl.src = fiveIcon;
          fiveTempEl.textContent = "Temp: " + fiveTemp + "\u00B0F";
          fiveWindEl.textContent = "Wind: " + fiveWind + " MPH";
          fiveHumidEl.textContent = "Humidity: " + fiveHumid + " %";
        });
    });
}

/*
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
*/

/*
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/
searchedList.addEventListener("click", (event) => {
  console.log("hello!");
  if (event.target.className === "search-button") {
    // function redoSearch(event) {
    //   event.stopPropagation();
    var element = event.target;
    console.log(event.target);
    var searchBtnText = element.innerText;
    console.log(searchBtnText);
    //geo-location fetch
    var geoURL =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      searchBtnText +
      "&limit=1&appid=7a7cf95b9e7bc5abfa9774305fd77b7e";
    fetch(geoURL)
      .then(function (responseGeo) {
        console.log(responseGeo);
        return responseGeo.json();
      })
      .then(function (dataGeo) {
        console.log(dataGeo);
        var latitude = dataGeo[0].lat.toFixed(2);
        console.log(latitude);
        var longitude = dataGeo[0].lon.toFixed(2);
        console.log(longitude);

        //2nd fetch call using the geolocation info
        var requestURL =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&units=imperial&exclude=minutely,hourly,alerts&appid=7a7cf95b9e7bc5abfa9774305fd77b7e";
        fetch(requestURL)
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            //current variables
            var currentTemp = data.current.temp;
            var currentWind = data.current.wind_speed;
            var currentHumid = data.current.humidity;
            var currentUV = data.current.uvi;
            console.log(currentUV);
            var currentIcon = data.current.weather[0].icon;
            //day 1 forecast variables
            var oneTemp = data.daily[0].temp.day;
            var oneWind = data.daily[0].wind_speed;
            var oneHumid = data.daily[0].humidity;
            var oneIconCode = data.daily[0].weather[0].icon;
            var oneIcon =
              "http://openweathermap.org/img/wn/" + oneIconCode + "@2x.png";
            //day 2 forecast variables
            var twoTemp = data.daily[1].temp.day;
            var twoWind = data.daily[1].wind_speed;
            var twoHumid = data.daily[1].humidity;
            var twoIconCode = data.daily[1].weather[0].icon;
            var twoIcon =
              "http://openweathermap.org/img/wn/" + twoIconCode + "@2x.png";
            //day 3 forecast variables
            var threeTemp = data.daily[2].temp.day;
            var threeWind = data.daily[2].wind_speed;
            var threeHumid = data.daily[2].humidity;
            var threeIconCode = data.daily[2].weather[0].icon;
            var threeIcon =
              "http://openweathermap.org/img/wn/" + threeIconCode + "@2x.png";
            //day 4 forecast variables
            var fourTemp = data.daily[3].temp.day;
            var fourWind = data.daily[3].wind_speed;
            var fourHumid = data.daily[3].humidity;
            var fourIconCode = data.daily[3].weather[0].icon;
            var fourIcon =
              "http://openweathermap.org/img/wn/" + fourIconCode + "@2x.png";
            //day 5 forecast variables
            var fiveTemp = data.daily[4].temp.day;
            var fiveWind = data.daily[4].wind_speed;
            var fiveHumid = data.daily[4].humidity;
            var fiveIconCode = data.daily[4].weather[0].icon;
            var fiveIcon =
              "http://openweathermap.org/img/wn/" + fiveIconCode + "@2x.png";
            // TEXT CONTENT
            //City information elements
            cityNameEl.textContent = searchBtnText;
            cityTempEl.textContent = "Temp: " + currentTemp + "\u00B0F";
            cityWindEl.textContent = "Wind: " + currentWind + " MPH";
            cityHumidEl.textContent = "Humidity: " + currentHumid + " %";
            cityUVEl.textContent = currentUV;
            if (currentUV < 3) {
              cityUVEl.classList.add("lowUV");
            } else if (current < 6) {
              cityUVEl.classList.add("medUV");
            } else if (current < 8) {
              cityUVEl.classList.add("hiUV");
            } else {
              cityUVEl.classList.add("veryHiUV");
            }
            //5-day forecast elements
            //Day 1
            oneDateEl.textContent = moment().add(1, "days").format("l");
            oneIconEl.src = oneIcon;
            oneTempEl.textContent = "Temp: " + oneTemp + "\u00B0F";
            oneWindEl.textContent = "Wind: " + oneWind + " MPH";
            oneHumidEl.textContent = "Humidity: " + oneHumid + " %";
            //Day 2
            twoDateEl.textContent = moment().add(2, "days").format("l");
            twoIconEl.src = twoIcon;
            twoTempEl.textContent = "Temp: " + twoTemp + "\u00B0F";
            twoWindEl.textContent = "Wind: " + twoWind + " MPH";
            twoHumidEl.textContent = "Humidity: " + twoHumid + " %";
            //Day 3
            threeDateEl.textContent = moment().add(3, "days").format("l");
            threeIconEl.src = threeIcon;
            threeTempEl.textContent = "Temp: " + threeTemp + "\u00B0F";
            threeWindEl.textContent = "Wind: " + threeWind + " MPH";
            threeHumidEl.textContent = "Humidity: " + threeHumid + " %";
            //Day 4
            fourDateEl.textContent = moment().add(4, "days").format("l");
            fourIconEl.src = fourIcon;
            fourTempEl.textContent = "Temp: " + fourTemp + "\u00B0F";
            fourWindEl.textContent = "Wind: " + fourWind + " MPH";
            fourHumidEl.textContent = "Humidity: " + fourHumid + " %";
            //Day 5
            fiveDateEl.textContent = moment().add(5, "days").format("l");
            fiveIconEl.src = fiveIcon;
            fiveTempEl.textContent = "Temp: " + fiveTemp + "\u00B0F";
            fiveWindEl.textContent = "Wind: " + fiveWind + " MPH";
            fiveHumidEl.textContent = "Humidity: " + fiveHumid + " %";
          });
      });
    // }
  }
});

searchBtn.addEventListener("click", fetchResults);
// searchedList.addEventListener("click", ".search-button", );
