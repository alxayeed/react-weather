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
          console.log(result.weather[0]["main"]);
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

    return `${day}, ${date} ${month}, ${year}`;
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
            placeholder="Search by your location"
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
              <div className="temp">
                {Math.round(weather.main.temp)}°C
                <br></br>
                <div className="feels-like">
                  Feels like {weather.main["feels_like"]} °C
                </div>
              </div>
              <div className="weather">{weather.weather[0]["main"]}</div>
              <div className="weather-info">
                <p>
                  <i>Max Temp</i> : {weather.main["temp_max"]} °C
                </p>
                <p>
                  <i>Min Temp :</i> {weather.main["temp_min"]} °C
                </p>
                <p>
                  <i>Wind Speed :</i> {weather.wind.speed} m/s
                </p>
                <p>
                  <i>Humidity :</i> {weather.main["humidity"]}%
                </p>
                <p>
                  <i>Pressure :</i> {weather.main["pressure"]}
                </p>
                <p>
                  <i>Sunrise : </i>
                  {new Date(weather.sys["sunrise"] * 1000).toLocaleTimeString()}
                </p>
                <p>
                  <i>Sunset : </i>
                  {new Date(weather.sys["sunset"] * 1000).toLocaleTimeString()}
                </p>
                <p>
                  <i>Coordinates : </i>
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
