//comment
function displayTemperature (response) {
  console.log (response.data);

  let temperatureElement = document.querySelector ("#temperature");
  let cityElement = document.querySelector ("#city");
  let description = document.querySelector ("#description");
  

  temperatureElement.innerHTML = Math.round (response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
}

let apiKey = "50d24603e09f450a85b01b98d6805e3d";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);