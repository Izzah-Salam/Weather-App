import { useQuery } from "@tanstack/react-query";

const ForeCast = ({ city }) => {
  const apiKey = "2dd7c3c9013bf22fed8a3979f7d95519";

  const { data, isLoading, error } = useQuery({
    queryKey: ["Weather Data", city],
    queryFn: async () => {
      const response = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city},{country code}&appid=${apiKey}`
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
      {/* hourly forecast */}
      <div className="bg-slate-800 bg-opacity-70 backdrop-blur-lg backdrop-filter p-5 rounded-md">
        <span className="text-sm my-2">HOURLY FORCAST</span>
        <hr className="border-t-2 border-gray-500 rounded-lg my-2" />
        <div className="bg-slate-900 inline-block px-5 py-2 m-3 text-center rounded-md">
          <h2 className="text-sm">Now</h2>
          <div className="text-xl font-bold">28</div>
          <span>icon</span>
        </div>
        <hr className="border-t-4 border-gray-500 rounded-lg my-2" />
      </div>
      {/* hourly forecast */}
      <div className="bg-slate-800 bg-opacity-70 backdrop-blur-lg backdrop-filter p-5 rounded-md mt-5">
        <span className="text-sm my-2">10 DAYS FORCAST</span>
        <hr className="border-t-2 border-gray-500 rounded-lg my-2" />
        <div className="bg-slate-900 inline-block px-6 py-2 m-3 text-center rounded-md">
          <h2 className="text-sm">Now</h2>
          <div className="text-[12px] ">16/20</div>
          <div className="text-xl font-bold">28</div>
          <span>icon</span>
        </div>
        <hr className="border-t-4 border-gray-500 rounded-lg my-2" />
      </div>
      {/* Uv Index Or Wind Index */}
      <div className="grid grid-cols-2 mt-4  gap-5">
        <div className="bg-slate-800 bg-opacity-70 backdrop-blur-lg backdrop-filter p-5 rounded-md">
          <div className="flex items-center">
            {/* <FaTemperatureHigh /> */}
            <h3>UV INDEX</h3>
          </div>
          <span>30</span>
          <p>moderate</p>
          <p>Use Sun protection until 8</p>
        </div>

        <div className="bg-slate-800 bg-opacity-70 backdrop-blur-lg backdrop-filter p-5 rounded-md">
          <div className="flex items-center">
            {/* <FaTemperatureHigh /> */}
            <h3>WIND</h3>
          </div>
          <span>3 MPH</span>
          <hr />
          <span>9 MPH</span>
        </div>
      </div>
    </div>
  );
};

export default ForeCast;
