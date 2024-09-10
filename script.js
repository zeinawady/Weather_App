const apiKey = "c94e9e7b45ea41aca8a1c734e585fb6a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherPhoto = document.querySelector(".weather-icon");
let weather = document.querySelector(".weather");
let errorMsg = document.querySelector(".error");

async function checkWether(cityname) {
    if (cityname.trim().length === 0) {
        errorMsg.style.display = "block";
        errorMsg.innerHTML = "Please Enter a city name";
        weather.style.display = "none";
        return;
    }
    const response = await fetch(apiUrl + cityname + `&appid=${apiKey}`);

    if (response.status == 404) {
        errorMsg.style.display = "block";
        weather.style.display = "none";

    }

    else {

        var data = await response.json();

        console.log(data);
        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + "Km/h";

        if (data.weather[0].main == "Clouds") {
            weatherPhoto.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherPhoto.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherPhoto.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherPhoto.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherPhoto.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherPhoto.src = "images/snow.png";
        }
        weather.style.display = "block";
        errorMsg.style.display = "none";

    }
}
searchBtn.addEventListener("click", () => {
    let cityName = searchBox.value;
    checkWether(cityName);

})
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let cityName = searchBox.value;
        checkWether(cityName);
    }


})