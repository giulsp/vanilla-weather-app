//comment
function formatDate (timestamp){
  let date = new Date (timestamp);

  let hours = date.getHours ();
    if (hours < 10) {
      hours = `0${hours}`;
    } 

  let minutes = date.getMinutes ();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    } 

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days [date.getDay ()];

  return `${day} ${hours}:${minutes}`;
}

function getForecast (coordinates) {
  
  let apiKey = "50d24603e09f450a85b01b98d6805e3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  
  
  axios.get (apiUrl).then(displayForecast);
}

function displayTemperature (response) {
  let temperatureElement = document.querySelector ("#temperature");
  let cityElement = document.querySelector ("#city");
  let descriptionElement = document.querySelector ("#description");
  let humidityElement = document.querySelector ("#humidity");
  let windElement = document.querySelector ("#wind");
  let dateElement = document.querySelector ("#date");
  let iconElement = document.querySelector ("#icon");

  celsiusTemperature = response.data.main.temp; //local variable

  temperatureElement.innerHTML = Math.round (celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round (response.data.wind.speed);
  dateElement.innerHTML = formatDate (response.data.dt *1000);
  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute ("alt", response.data.weather[0].description);

 
  getForecast (response.data.coord);

  }
  
function formatDay (timestamp){
  let date = new Date (timestamp * 1000);
  let day = date.getDay ();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days [day];
}

function displayForecast (response) {
 let forecast = response.data.daily;

  let forecastElement = document.querySelector ("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach (function (forecastDay, index) {
    if (index < 6) {
    forecastHTML = 
    forecastHTML + 
      `
      <div class="col-2">
        <div class="forecast-date">
          ${formatDay(forecastDay.dt)}
        </div>
        
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
        alt="" 
        width="5"/> 
        <div class="forecast-temperatures">
          <span class="max"> ${Math.round(forecastDay.temp.max)}º </span> 
          <span class="min"> ${Math.round (forecastDay.temp.min)}º </span>
        </div>
      </div>
      `;
    }
  })

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}
// NOT WORKING. MAYBE THE API IS BEING CALLED TOO MANY TIMES ?
// REPLACED IMAGE WITH GOOGLE IMAGE
//added RESPONSE and red disappears but still not showing on my app
// NOW IT´S WORKING
//displayForecast (); NOT NEEDED ANYMORE ?

function search (city) {
  let apiKey = "50d24603e09f450a85b01b98d6805e3d";
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit (event) {
  event.preventDefault();
  let cityInputElement = document.querySelector ("#city-input");
  search (cityInputElement.value)
}

let form = document.querySelector ("#search-form");
form.addEventListener("submit", handleSubmit);

search ("Madrid");

//trying to make the Current Location button work

function showPosition (position){
  let apiKey ="50d24603e09f450a85b01b98d6805e3d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayTemperature);
}

function getLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition (showPosition);
}

let currentLocationButton = document.querySelector ("#current-location-button");
currentLocationButton.addEventListener = ("click", getLocation);

showPosition ();