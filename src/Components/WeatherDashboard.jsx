import { useQuery } from "@tanstack/react-query";
import ForeCast from "./ForeCast";
import WeatherCard from "./WeatherCard";
import { useContext } from "react";
import { weatherContext } from "../Context/ContextApi";

const WeatherDashboard = () => {
  const { city, setCity } = useContext(weatherContext);
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mx-10 py-4">
        <div>
          <WeatherCard />
        </div>
        <div>
          <ForeCast city={city} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
