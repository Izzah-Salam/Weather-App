import { useQuery } from "@tanstack/react-query";

const ForeCast = ({ lat, lon }) => {
  const apiKey = "f94ffb48f4d1b096c49c190d0467da73"; // Replace with your actual API key
  console.log(lat);
  console.log(lon);

  const { data, isLoading, error } = useQuery({
    queryKey: ["Weather Data", lat, lon],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!lat && !!lon, // The query will only run if lat and lon are available
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center  md:text-2xl  text-xl bg-slate-800 bg-opacity-30 backdrop-blur-lg backdrop-filter px-10 p-16 rounded-md text-center mt-12">
        Loading Forcast data...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center  md:text-2xl  text-xl bg-slate-800 bg-opacity-30 backdrop-blur-lg backdrop-filter px-10 p-16 rounded-md text-center mt-12">
        {" "}
        Error: {error.message}{" "}
      </div>
    );

  // Safeguard to ensure data and data.list are defined
  if (!data || !data.list)
    return (
      <div className="flex justify-center items-center  md:text-2xl  text-xl bg-slate-800 bg-opacity-30 backdrop-blur-lg backdrop-filter px-10 p-16 rounded-md text-center mt-12">
        No forecast data available.
      </div>
    );
  console.log(data);

  // Extract up to 5 items from the data for hourly forecast
  const hourlyData = data.list.slice(0, Math.min(12, data.list.length));

  // Aggregate daily data by selecting the first available forecast for each day
  const dailyData = [];
  const daysProcessed = new Set();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayOfWeek = date.toLocaleDateString([], { weekday: "long" });

    // If the day hasn't been added yet, add the first instance of that day
    if (!daysProcessed.has(dayOfWeek)) {
      dailyData.push(item);
      daysProcessed.add(dayOfWeek);
    }
  });

  return (
    <div>
      {/* Hourly Forecast */}
      <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg backdrop-filter p-5 rounded-md">
        <span className="text-sm my-2">HOURLY FORECAST</span>
        <hr className="border-t-2 border-gray-500 rounded-lg my-2" />
        <div className="flex overflow-x-auto">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 duration-700 cursor-pointer hover:bg-gray-900 inline-block px-5 py-2 m-3 text-center rounded-md"
            >
              <h2 className="text-sm">
                {new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h2>
              <div className="text-xl font-bold">
                {Math.round(hour.main.temp)}°C
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt={hour.weather[0].description}
                className="w-10 h-10 mx-auto"
              />
            </div>
          ))}
        </div>
        <hr className="border-t-4 border-gray-500 rounded-lg my-2" />
      </div>

      {/* Daily Forecast */}
      <div className="bg-slate-800 bg-opacity-70 backdrop-blur-lg backdrop-filter p-5 rounded-md mt-5">
        <span className="text-sm my-2">WEEKLY FORECAST</span>
        <hr className="border-t-2 border-gray-500 rounded-lg my-2" />
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {dailyData.slice(0, 10).map((day, index) => (
            <div
              key={index}
              className="bg-opacity-30 backdrop-blur-lg backdrop-filter bg-gray-950 duration-700 cursor-pointer hover:bg-gray-900 inline-block px-6 py-2 m-3 text-center rounded-md"
            >
              <h2 className="text-sm">
                {new Date(day.dt * 1000).toLocaleDateString([], {
                  weekday: "long",
                })}
              </h2>
              <div className="text-[12px]">
                {Math.round(day.main.temp_min)}°C /{" "}
                {Math.round(day.main.temp_max)}°C
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="w-10 h-10 mx-auto"
              />
              <div className="text-[12px]">{day?.weather[0]?.description}</div>
            </div>
          ))}
        </div>
        <hr className="border-t-4 border-gray-500 rounded-lg my-2" />
      </div>
    </div>
  );
};

export default ForeCast;
