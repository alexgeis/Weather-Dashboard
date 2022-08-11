const cityNameEl = document.getElementById("cityName");
const cityTempEl = document.getElementById("cityTemp");
const cityWindEl = document.getElementById("cityWind");
const cityHumidEl = document.getElementById("cityHumid");
const cityUVEl = document.getElementById("cityUV");

const inputEl = document.getElementById("cityInput");
//City information elements
cityNameEl.textContent = inputEl.value;
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
