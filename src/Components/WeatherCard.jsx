import { useContext, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaTemperatureHigh } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { FaDroplet } from "react-icons/fa6";
import { WiBarometer } from "react-icons/wi";
import { weatherContext } from "../Context/ContextApi";
import { WiNightAltCloudyGusts } from "react-icons/wi";

const WeatherCard = () => {
  const apiKey = "2dd7c3c9013bf22fed8a3979f7d95519";
  const { city, setCity } = useContext(weatherContext);

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
        <IoLocationOutline className="absolute left-2 top-3 text-xl" />
        <input
          className="bg-slate-800 px-8 py-2 rounded-full w-full outline-none"
          onKeyUp={(e) => {
            if (e.key === "Enter" && e.target.value) {
              setCity(e.target.value); // Set the city when Enter is pressed
            }
          }}
          type="text"
          placeholder="Enter City"
        />
      </div>
      <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg backdrop-filter px-10 p-16 rounded-md text-center my-3">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching data: {error.message}</p>}
        {data && (
          <>
            <h1 className="text-5xl font-bold my-2">
              {Math.round(data.main.temp)}°C
            </h1>
            <h2 className="text-3xl my-5">{data.weather[0].description}</h2>
            <p className="text-sm my-5">
              {data.name}, {data.sys.country}
            </p>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10">
              <div className="p-5 bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 rounded-md">
                <div className="flex justify-center items-center">
                  <FaTemperatureHigh />
                  <h3 className="m-3 font-sm">Feels Like</h3>
                </div>
                <div className="flex justify-center mb-2">
                  <hr className="w-32" />
                </div>
                <span className="font-bold ">
                  {Math.round(data.main.feels_like)}°C
                </span>
              </div>
              {/* Additional weather details can go here */}
              <div className="p-5 bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 rounded-md">
                <div className="flex justify-center items-center">
                  <FaDroplet />
                  <h3 className="m-3 text-sm">Humidity</h3>
                </div>
                <div className="flex justify-center mb-2">
                  <hr className="w-32" />
                </div>

                <p className="font-bold ">{data.main.humidity}%</p>
              </div>
              {/* Additional weather details can go here */}
              <div className="p-5 bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 rounded-md">
                <div className="flex justify-center items-center">
                  <WiNightAltCloudyGusts className="text-xl" />
                  <h3 className="m-3 text-sm">Wind</h3>
                </div>
                <div className="flex justify-center mb-2">
                  <hr className="w-32" />
                </div>
                <span className="font-bold ">{data.wind.speed}m/s</span>
              </div>
              {/* Additional weather details can go here */}
              <div className="p-5 bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 rounded-md">
                <div className="flex justify-center items-center">
                  <WiBarometer className="text-2xl" />
                  <h3 className="m-3 text-sm">Pressure</h3>
                </div>
                <div className="flex justify-center mb-2">
                  <hr className="w-32" />
                </div>
                <span className="font-bold ">{data.main.pressure}pa</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
