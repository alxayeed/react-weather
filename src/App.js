import React, { useState } from "react";
import "./App.css";

const api = {
  key: "24371e4b61b6f8684e5c44642175a47d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.clouds["all"] < 30
            ? "app-warm"
            : weather.clouds["all"] > 30 && weather.clouds["all"] < 60
            ? "app-cloud"
            : weather.clouds["all"] > 60 && weather.clouds["all"] < 80
            ? "app-rain"
            : "app-storm"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by your location. If empty page comes,try a bigger location(e.g. your division)"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">
                {typeof weather.main !== "undefined"
                  ? weather.clouds["all"] < 30
                    ? "Sunny"
                    : weather.clouds["all"] > 30 && weather.clouds["all"] < 60
                    ? "Cloudy"
                    : weather.clouds["all"] > 60 && weather.clouds["all"] < 80
                    ? "Rainy"
                    : "Stormy"
                  : "app"}
              </div>
              <div className="weather-info">
                <p>Maximum Temperature : {weather.main["temp_max"]}</p>
                <p>Minimum Temperature : {weather.main["temp_min"]}</p>
                <p>Feels like : {weather.main["feels_like"]}</p>
                <p>Humidity : {weather.main["humidity"]}%</p>
                <p>Pressure : {weather.main["pressure"]}</p>
                <p>Sunrise : {weather.sys["sunrise"]}</p>
                <p>Sunset : {weather.sys["sunset"]}</p>
                <p>
                  {weather.coord["lon"]}, {weather.coord["lat"]}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
