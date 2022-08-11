//DECLARE VARIABLES
//header elements
const currentDayEl = document.querySelector("#currentDay");
//search elements
const inputEl = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const searchedList = document.querySelector("#citySearched");
const searchedListItem = document.querySelector(".search-list");
//City information elements
const cityNameEl = document.querySelector("#cityName");
const cityTempEl = document.querySelector("#cityTemp");
const cityWindEl = document.querySelector("#cityWind");
const cityHumidEl = document.querySelector("#cityHumid");
const cityUVEl = document.querySelector("#cityUV");
//5-day forecast elements
const forecastEl = document.querySelector("#forecast");
//Day 1
const oneDateEl = document.querySelector("#oneDate");
const oneIconEl = document.querySelector("#oneIcon");
const oneTempEl = document.querySelector("#oneTemp");
const oneWindEl = document.querySelector("#oneWind");
const oneHumidEl = document.querySelector("#oneHumid");
//Day 2
const twoDateEl = document.querySelector("#twoDate");
const twoIconEl = document.querySelector("#twoIcon");
const twoTempEl = document.querySelector("#twoTemp");
const twoWindEl = document.querySelector("#twoWind");
const twoHumidEl = document.querySelector("#twoHumid");
//Day 3
const threeDateEl = document.querySelector("#threeDate");
const threeIconEl = document.querySelector("#threeIcon");
const threeTempEl = document.querySelector("#threeTemp");
const threeWindEl = document.querySelector("#threeWind");
const threeHumidEl = document.querySelector("#threeHumid");
//Day 4
const fourDateEl = document.querySelector("#fourDate");
const fourIconEl = document.querySelector("#fourIcon");
const fourTempEl = document.querySelector("#fourTemp");
const fourWindEl = document.querySelector("#fourWind");
const fourHumidEl = document.querySelector("#fourHumid");
//Day 5
const fiveDateEl = document.querySelector("#fiveDate");
const fiveIconEl = document.querySelector("#fiveIcon");
const fiveTempEl = document.querySelector("#fiveTemp");
const fiveWindEl = document.querySelector("#fiveWind");
const fiveHumidEl = document.querySelector("#fiveHumid");
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
	const citySearch = inputEl.value;
	//   ---setting captured values to local storage---
	localStorage.setItem("citySearch", citySearch);
	const citySearchItem = localStorage.getItem("citySearch");
	const cityLi = document.createElement("li");
	cityLi.classList.add("search-list");
	const cityBtn = document.createElement("button");
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
	const citySearch = inputEl.value;
	if (!citySearch) {
		alert("Please enter a city name");
	}

	renderSearches();
	//geo-location fetch
	const geoURL =
		"https://api.openweathermap.org/geo/1.0/direct?q=" +
		citySearch +
		"&limit=1&appid=7a7cf95b9e7bc5abfa9774305fd77b7e";
	fetch(geoURL)
		.then(function (responseGeo) {
			console.log(responseGeo);
			return responseGeo.json();
		})
		.then(function (dataGeo) {
			console.log(dataGeo);
			const latitude = dataGeo[0].lat.toFixed(2);
			console.log(latitude);
			const longitude = dataGeo[0].lon.toFixed(2);
			console.log(longitude);

			//2nd fetch call using the geolocation info
			const requestURL =
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
					const currentTemp = data.current.temp;
					const currentWind = data.current.wind_speed;
					const currentHumid = data.current.humidity;
					const currentUV = data.current.uvi;
					console.log(currentUV);
					const currentIcon = data.current.weather[0].icon;
					//day 1 forecast variables
					const oneTemp = data.daily[0].temp.day;
					const oneWind = data.daily[0].wind_speed;
					const oneHumid = data.daily[0].humidity;
					const oneIconCode = data.daily[0].weather[0].icon;
					const oneIcon =
						"https://openweathermap.org/img/wn/" + oneIconCode + "@2x.png";
					//day 2 forecast variables
					const twoTemp = data.daily[1].temp.day;
					const twoWind = data.daily[1].wind_speed;
					const twoHumid = data.daily[1].humidity;
					const twoIconCode = data.daily[1].weather[0].icon;
					const twoIcon =
						"https://openweathermap.org/img/wn/" + twoIconCode + "@2x.png";
					//day 3 forecast variables
					const threeTemp = data.daily[2].temp.day;
					const threeWind = data.daily[2].wind_speed;
					const threeHumid = data.daily[2].humidity;
					const threeIconCode = data.daily[2].weather[0].icon;
					const threeIcon =
						"https://openweathermap.org/img/wn/" + threeIconCode + "@2x.png";
					//day 4 forecast variables
					const fourTemp = data.daily[3].temp.day;
					const fourWind = data.daily[3].wind_speed;
					const fourHumid = data.daily[3].humidity;
					const fourIconCode = data.daily[3].weather[0].icon;
					const fourIcon =
						"https://openweathermap.org/img/wn/" + fourIconCode + "@2x.png";
					//day 5 forecast variables
					const fiveTemp = data.daily[4].temp.day;
					const fiveWind = data.daily[4].wind_speed;
					const fiveHumid = data.daily[4].humidity;
					const fiveIconCode = data.daily[4].weather[0].icon;
					const fiveIcon =
						"https://openweathermap.org/img/wn/" + fiveIconCode + "@2x.png";
					// TEXT CONTENT
					//City information elements
					cityNameEl.textContent = citySearch;
					cityTempEl.textContent = "Temp: " + currentTemp + "\u00B0F";
					cityWindEl.textContent = "Wind: " + currentWind + " MPH";
					cityHumidEl.textContent = "Humidity: " + currentHumid + " %";
					cityUVEl.textContent = currentUV;
					if (currentUV < 3) {
						cityUVEl.classList.add("lowUV");
					} else if (currentUV < 6) {
						cityUVEl.classList.add("medUV");
					} else if (currentUV < 8) {
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
		const element = event.target;
		console.log(event.target);
		const searchBtnText = element.innerText;
		console.log(searchBtnText);
		//geo-location fetch
		const geoURL =
			"https://api.openweathermap.org/geo/1.0/direct?q=" +
			searchBtnText +
			"&limit=1&appid=7a7cf95b9e7bc5abfa9774305fd77b7e";
		fetch(geoURL)
			.then(function (responseGeo) {
				console.log(responseGeo);
				return responseGeo.json();
			})
			.then(function (dataGeo) {
				console.log(dataGeo);
				const latitude = dataGeo[0].lat.toFixed(2);
				console.log(latitude);
				const longitude = dataGeo[0].lon.toFixed(2);
				console.log(longitude);

				//2nd fetch call using the geolocation info
				const requestURL =
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
						const currentTemp = data.current.temp;
						const currentWind = data.current.wind_speed;
						const currentHumid = data.current.humidity;
						const currentUV = data.current.uvi;
						console.log(currentUV);
						const currentIcon = data.current.weather[0].icon;
						//day 1 forecast variables
						const oneTemp = data.daily[0].temp.day;
						const oneWind = data.daily[0].wind_speed;
						const oneHumid = data.daily[0].humidity;
						const oneIconCode = data.daily[0].weather[0].icon;
						const oneIcon =
							"https://openweathermap.org/img/wn/" + oneIconCode + "@2x.png";
						//day 2 forecast variables
						const twoTemp = data.daily[1].temp.day;
						const twoWind = data.daily[1].wind_speed;
						const twoHumid = data.daily[1].humidity;
						const twoIconCode = data.daily[1].weather[0].icon;
						const twoIcon =
							"https://openweathermap.org/img/wn/" + twoIconCode + "@2x.png";
						//day 3 forecast variables
						const threeTemp = data.daily[2].temp.day;
						const threeWind = data.daily[2].wind_speed;
						const threeHumid = data.daily[2].humidity;
						const threeIconCode = data.daily[2].weather[0].icon;
						const threeIcon =
							"https://openweathermap.org/img/wn/" + threeIconCode + "@2x.png";
						//day 4 forecast variables
						const fourTemp = data.daily[3].temp.day;
						const fourWind = data.daily[3].wind_speed;
						const fourHumid = data.daily[3].humidity;
						const fourIconCode = data.daily[3].weather[0].icon;
						const fourIcon =
							"https://openweathermap.org/img/wn/" + fourIconCode + "@2x.png";
						//day 5 forecast variables
						const fiveTemp = data.daily[4].temp.day;
						const fiveWind = data.daily[4].wind_speed;
						const fiveHumid = data.daily[4].humidity;
						const fiveIconCode = data.daily[4].weather[0].icon;
						const fiveIcon =
							"https://openweathermap.org/img/wn/" + fiveIconCode + "@2x.png";
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
