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

export default fetchWeatherData;
