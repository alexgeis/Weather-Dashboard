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

export default render5DayForecast;
