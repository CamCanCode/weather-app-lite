// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

let weather = {
    "apiKey": "fc292b5ad1c1e4a2e36ebe4cfd6dcc25",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
         + city 
         + "&units=metric&appid=" 
         + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search__bar").value);
    }
};

// SEARCH BAR 

document.querySelector(".search button")
.addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search__bar")
.addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
    }
});

// on page load

weather.fetchWeather("Durban");

