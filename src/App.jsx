import { useContext } from "react";
import bg from "./assets/img/bg.avif";
import WeatherDashboard from "./Components/WeatherDashboard";
import { weatherContext } from "./Context/ContextApi";

function App() {
  const { Loading, Error } = useContext(weatherContext);
  return (
    <>
      <div
        className="bg-cover bg-center h-full w-screen  text-white"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <WeatherDashboard />
      </div>
    </>
  );
}

export default App;
