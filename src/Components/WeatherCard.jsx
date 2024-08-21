import { useContext, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaTemperatureHigh } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { FaDroplet } from "react-icons/fa6";
import { WiBarometer } from "react-icons/wi";
import { weatherContext } from "../Context/ContextApi";
import { WiNightAltCloudyGusts } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiDayHaze } from "react-icons/wi";

const WeatherCard = () => {
  const [inputValue, setInputValue] = useState(""); // State to manage the input field value
  const apiKey = "f94ffb48f4d1b096c49c190d0467da73";
  const { city, setCity, setLon, setLat } = useContext(weatherContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["Weather Data", city],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    enabled: !!city, // The query will only run if 'city' is not an empty string
  });
  console.log(data);

  return (
    <div>
      <div className="relative">
        <IoLocationOutline className="absolute left-2 top-3 text-xl duration-700 hover:text-orange-600" />
        <input
          className="bg-slate-800 px-8 py-2 rounded-full w-full duration-700 hover:bg-slate-700 outline-none"
          value={inputValue} // Set the input field's value
          onChange={(e) => setInputValue(e.target.value)} // Update the state when input changes
          onKeyUp={(e) => {
            if (e.key === "Enter" && e.target.value) {
              setCity(e.target.value); // Set the city when Enter is pressed
              setInputValue(""); // Clear the input field
            }
          }}
          type="text"
          placeholder="Enter City"
        />
      </div>

      <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg backdrop-filter px-10 p-16 rounded-md text-center my-3">
        <div className="flex justify-center items-center text-2xl">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching data: {error.message}</p>}
        </div>
        {data && (
          <>
            <h1 className="text-5xl font-bold my-2">
              {Math.round(data.main.temp)}°C
            </h1>
            <h2 className="text-3xl my-5">{data.weather[0].description}</h2>
            <p className="text-xl my-5">
              {data.name}, {data.sys.country}
            </p>
            <div className="text-sm flex md:justify-between justify-center  flex-wrap">
              <div className="flex items-center">
                <WiDaySunny className="text-2xl duration-700 hover:text-orange-600" />
                Sunrise:{" "}
                {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
              </div>
              <span className="md:block hidden"> |</span>
              <div className="flex items-center">
                <WiDayHaze className="text-2xl duration-700 hover:text-orange-600" />
                Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
              </div>
              <span className="md:block hidden"> |</span>
              <div className="flex items-center">
                Current Time: {new Date(data.dt * 1000).toLocaleTimeString()}
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10">
              <div className="p-5 bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 duration-700 cursor-pointer hover:bg-gray-900 rounded-md">
                <div className="flex justify-center items-center">
                  <FaTemperatureHigh className="duration-700 hover:text-orange-600" />
                  <h3 className="m-3 font-sm">Feels Like</h3>
                </div>
                <div className="flex justify-center mb-2">
                  <hr className="w-32" />
                </div>
                <span className="font-bold ">
                  {Math.round(data.main.feels_like)}°C
                </span>
              </div>
              <div className="p-5 bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 duration-700 cursor-pointer hover:bg-gray-900 rounded-md">
                <div className="flex justify-center items-center">
                  <FaDroplet className="duration-700 hover:text-orange-600" />
                  <h3 className="m-3 text-sm">Humidity</h3>
                </div>
                <div className="flex justify-center mb-2">
                  <hr className="w-32" />
                </div>

                <p className="font-bold ">{data.main.humidity}%</p>
              </div>
              <div className="p-5 bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 duration-700 cursor-pointer hover:bg-gray-900 rounded-md">
                <div className="flex justify-center items-center">
                  <WiNightAltCloudyGusts className="text-xl duration-700 hover:text-orange-600" />
                  <h3 className="m-3 text-sm">Wind</h3>
                </div>
                <div className="flex justify-center mb-2">
                  <hr className="w-32" />
                </div>
                <span className="font-bold ">{data.wind.speed}MPH</span>
              </div>
              <div className="p-5 bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 duration-700 cursor-pointer hover:bg-gray-900 rounded-md">
                <div className="flex justify-center items-center">
                  <WiBarometer className="text-2xl duration-700 hover:text-orange-600" />
                  <h3 className="m-3 text-sm">Pressure</h3>
                </div>
                <div className="flex justify-center mb-2">
                  <hr className="w-32" />
                </div>
                <span className="font-bold ">{data.main.pressure}pa</span>
              </div>
            </div>
            {setLon(data.coord.lon)}
            {setLat(data.coord.lat)}
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
