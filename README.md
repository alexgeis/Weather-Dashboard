# Weather Dashboard

Application uses the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Description

First, I structured the page with the aside and main sections, along with the 5-day forecast section that would appear after user search.

Next, I set up the logic to fetch data from the Open Weather API and return the relevant key values to their respective HTML element displays. I then used the moment.js API to pull the current day and dynamic dates for the 5-day forecast cards.

After that, I added conditional logic to deny empty search submits and highlight the UV index amount. After I added dynamic styling to the UV index indicator I fully styled the rest of the page.

Finally, I reapplied the fetch request logic to work on the previous search buttons. I was able to duplicate the code, but unable to find a way to keep this code within one function that I could use in different areas. Will need to improve my understanding of scope in that regard to have DRYer code.

## Deployment Details

Repo: [Weather Dashboard Homework - Alex Geis Github](https://github.com/alexgeis/Weather-Dashboard-HW)

GitHub Pages URL: [Weather Dashboard](https://alexgeis.github.io/Weather-Dashboard-HW/)

Screenshot: ![Weather Dashboard - full page screenshot](./Assets/weather-dashboard-screenshot.png)
