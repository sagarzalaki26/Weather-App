import { useEffect, useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

   const fetchWeather = async (cityName) => {
    const api = '258fca00377054ef92ab0559430825ee';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found");
        setWeather(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchWeather("Solapur");
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-400 text-white rounded-3xl p-8 w-full max-w-md shadow-2xl transition-all duration-300">
      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 mb-6 shadow-inner">
        <input
          type="text"
          placeholder="Search city..."
          className="flex-1 outline-none text-gray-700 text-lg bg-transparent placeholder-gray-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FaSearch className="text-indigo-600 text-xl cursor-pointer hover:scale-110 transition" />
      </div>

      {/* Weather Icon */}
      <div className="flex justify-center mb-4">
        <div className="text-6xl">☀️</div>
      </div>

      <div className="text-center">
        <h1 className="text-5xl font-bold mb-1">16°C</h1>
        <p className="text-2xl font-medium">{city}</p>
      </div>

  
      <div className="flex justify-around items-center mt-8">
    
        <div className="flex flex-col items-center">
          <WiHumidity size={48} className="mb-1" />
          <p className="text-xl font-semibold">91%</p>
          <p className="text-sm">Humidity</p>
        </div>

        <div className="flex flex-col items-center">
          <FaWind size={36} className="mb-2" />
          <p className="text-xl font-semibold">3.6 km/h</p>
          <p className="text-sm">Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
