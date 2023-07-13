import React, { useEffect, useState } from "react";
import Weather from "./weather";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=API KEY`;
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { speed } = data.wind;
      const { name } = data;
      const { country, sunset } = data.sys;

      const myweather = {
        temp,
        humidity,
        pressure,
        weathermood,
        speed,
        name,
        country,
        sunset,
      };

      setTempInfo(myweather);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Enter place name here"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(event) =>setSearchValue(event.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      <Weather tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
