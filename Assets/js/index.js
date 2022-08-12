// import fetchWeatherData from "./fetchWeather";
// import renderCurrentWeather from "./cityInfo";
// import render5DayForecast from "./5dayForecast";

window.onload = function () {
	const now = moment().format("LL");
	document.getElementById("currentDay").textContent = now;
	document.getElementById("forecast").style.display = "none";
};

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
const inputEl = document.getElementById("cityInput");
const searchedList = document.getElementById("citySearched");

function renderSearchHistory() {
	//locally store city searches
	const citySearch = inputEl.value;
	//   ---setting captured values to local storage---
	localStorage.setItem("citySearch", citySearch);
	const cityLi = document.createElement("li");
	cityLi.classList.add("search-list");
	const cityBtn = document.createElement("button");
	//   cityBtn.setAttribute(‘data-city’,‘para-1’);
	cityBtn.classList.add("search-button");

	cityBtn.textContent = citySearch;
	cityLi.appendChild(cityBtn);
	searchedList.appendChild(cityLi);
}

function renderCurrentWeather(data) {
	const currentTemp = data.current.temp;
	const currentWind = data.current.wind_speed;
	const currentHumid = data.current.humidity;
	const currentUV = data.current.uvi;
	const currentIcon = data.current.weather[0].icon;

	const cityNameEl = document.getElementById("cityName");
	const cityTempEl = document.getElementById("cityTemp");
	const cityWindEl = document.getElementById("cityWind");
	const cityHumidEl = document.getElementById("cityHumid");
	const cityUVEl = document.getElementById("cityUV");

	const inputEl = document.getElementById("cityInput");
	//City information elements
	cityNameEl.textContent = inputEl.value;
	cityTempEl.textContent = `Temp: ${currentTemp} \u00B0F`;
	cityWindEl.textContent = `Wind: ${currentWind} MPH`;
	cityHumidEl.textContent = `Humidity: ${currentHumid} %`;
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
}
function render5DayForecast(data) {
	const dailyArray = data.daily;
	for (let i = 0; i < 5; i++) {
		const dailyData = dailyArray[i];
		// pull variables from data
		const temp = dailyData.temp.day;
		const wind = dailyData.wind_speed;
		const humidity = dailyData.humidity;
		const iconCode = dailyData.weather[0].icon;
		const iconPath = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		// create cards
		// // date
		const dateEl = document.createElement("h4");
		dateEl.setAttribute("id", `date${i + 1}`);
		dateEl.textContent = moment().add(1, "days").format("l");
		// // img
		const imgEl = document.createElement("img");
		imgEl.setAttribute("id", `icon${i + 1}`);
		imgEl.setAttribute("src", iconPath);
		imgEl.setAttribute("alt", `Day ${i + 1} forecast weather icon`);
		// // temp
		const tempEl = document.createElement("p");
		tempEl.setAttribute("id", `temp${i + 1}`);
		tempEl.textContent = `Temp: ${temp} \u00B0F`;
		// // wind
		const windEl = document.createElement("p");
		windEl.setAttribute("id", `wind${i + 1}`);
		windEl.textContent = `Wind: ${wind} MPH`;
		// // humidity
		const humidityEl = document.createElement("p");
		humidityEl.setAttribute("id", `humidity${i + 1}`);
		humidityEl.textContent = `Humidity: ${humidity} %`;
		const cardDiv = document.createElement("div");
		// // full card append
		cardDiv.classList.add("card");
		cardDiv.setAttribute("id", `cardDay${i + 1}`);
		cardDiv.append(dateEl, imgEl, tempEl, windEl, humidityEl);
		// card container append
		document.getElementById("cardContainer").appendChild(cardDiv);
	}
}

async function fetchWeatherData(input) {
	//geo-location fetch\
	const geoURL =
		"https://api.openweathermap.org/geo/1.0/direct?q=" +
		input +
		"&limit=1&appid=7a7cf95b9e7bc5abfa9774305fd77b7e";
	const responseGeo = await fetch(geoURL);
	const dataGeo = await responseGeo.json();

	const latitude = dataGeo[0].lat.toFixed(2);
	const longitude = dataGeo[0].lon.toFixed(2);
	const requestURL =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" +
		latitude +
		"&lon=" +
		longitude +
		"&units=imperial&exclude=minutely,hourly,alerts&appid=7a7cf95b9e7bc5abfa9774305fd77b7e";

	//2nd fetch call using the geolocation info
	const responseWeatherData = await fetch(requestURL);
	const weatherData = await responseWeatherData.json();
	return weatherData;
}

function displayWeatherData() {
	document.getElementById("main").style.display = "block";
	document.getElementById("forecast").style.display = "block";
}

async function renderSearchResults(event) {
	event.preventDefault();
	const inputValue = document.getElementById("cityInput").value;
	if (!inputValue) {
		alert("Please enter a city name");
	}
	const response = await fetchWeatherData(inputValue);
	renderCurrentWeather(response);
	render5DayForecast(response);
	displayWeatherData();
	renderSearchHistory();
}

searchedList.addEventListener("click", async (event) => {
	if (event.target.className !== "search-button") return;
	else {
		const searchBtnText = event.target.innerText;
		const response = await fetchWeatherData(searchBtnText);
		renderCurrentWeather(response);
		render5DayForecast(response);
		displayWeatherData();
		renderSearchHistory();
	}
});

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", renderSearchResults);
