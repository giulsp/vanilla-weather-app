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
  }
  
function displayForecast () {
  let forecastElement = document.querySelector ("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML = forecastHTML + 
  `
  <div class="col-2">
    <div class="forecast-date">
      Thu
    </div>
    <img src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png" alt="" width="5"/> <!--width is not being applied-->
    <div class="forecast-temperatures">
      <span class="max"> 28 º </span> <span class="min"> 21 º </span>
    </div>
  </div>
  `;

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}
// NOT WORKING. MAYBE THE API IS BEING CALLED TOO MANY TIMES ?
// REPLACED IMAGE WITH GOOGLE IMAGE
//added RESPONSE and red disappears but still not showing on my app
// NOW IT´S WORKING

displayForecast ();

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

function displayFahrenheit (event) {
  event.preventDefault ();
  let temperatureElement = document.querySelector ("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round (fahrenheitTemperature);

}

function displayCelsius (event){
  event.preventDefault ();
  let temperatureElement = document.querySelector ("#temperature");
  temperatureElement.innerHTML = Math.round (celsiusTemperature);
}

let celsiusTemperature = null; //global variable

let form = document.querySelector ("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector ("#fahrenheit-link");
fahrenheit.addEventListener ("click", displayFahrenheit);

let celsius = document.querySelector ("#celsius-link");
celsius.addEventListener ("click", displayCelsius);

search ("Madrid");