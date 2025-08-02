import { useEffect, useRef, useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const inputref = useRef();

  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const fetchLatLng = async (place) => {
    const apiKey = "ef2144a33f4e4faca0f3acfa331d99fc";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${apiKey}&limit=1&no_annotations=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      

      if (data.status.code === 200 && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        const formattedName = data.results[0].formatted;
        fetchWeather(lat, lng, formattedName);
      } else {
        alert("Location not found. Try another city or taluka.");
        setWeather(null);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Error while fetching location.");
    }
  };

  const fetchWeather = async (lat, lon, displayName) => {
    const api = "258fca00377054ef92ab0559430825ee";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      

      if (data.cod !== 200) {
        alert("Weather data not found for this location.");
        setWeather(null);
        return;
      }

      const iconCode = data.weather[0].icon;
      const icon = weatherIcons[iconCode] || clear_icon;

      setWeather({
        location: displayName,
        temprature: data.main.temp,
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        icon,
      });
    } catch (error) {
      console.error("Weather error:", error);
      alert("Error while fetching weather.");
    }
  };

  useEffect(() => {
    fetchLatLng("Solapur"); 
  }, []);

  const handleSearch = () => {
    const place = inputref.current.value.trim();
    if (place) {
      fetchLatLng(place);
    } else {
      alert("Please enter a location");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-400 text-white rounded-3xl p-8 w-full max-w-md shadow-2xl transition-all duration-300">
      <div className="flex items-center bg-white rounded-full px-4 py-2 mb-6 shadow-inner">
        <input
          type="text"
          placeholder="Search city or taluka..."
          className="flex-1 outline-none text-gray-700 text-lg bg-transparent placeholder-gray-500"
          value={city}
          ref={inputref}
          onChange={(e) => setCity(e.target.value)}
        />
        <FaSearch
          onClick={handleSearch}
          className="text-indigo-600 text-xl cursor-pointer hover:scale-110 transition"
        />
      </div>

      {weather ? (
        <>
          <div className="flex justify-center mb-4">
            <img src={weather.icon} alt="weather-icon" className="w-24 h-24" />
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-bold mb-1">{weather.temprature}°C</h1>
            <p className="text-2xl font-medium">{weather.location}</p>
          </div>

          <div className="flex justify-around items-center mt-8">
            <div className="flex flex-col items-center">
              <WiHumidity size={48} className="mb-1" />
              <p className="text-xl font-semibold">{weather.humidity}%</p>
              <p className="text-sm">Humidity</p>
            </div>
            <div className="flex flex-col items-center">
              <FaWind size={36} className="mb-2" />
              <p className="text-xl font-semibold">{weather.windspeed} km/h</p>
              <p className="text-sm">Wind Speed</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center mt-4">No weather data available</p>
      )}
    </div>
  );
}

export default WeatherCard;
