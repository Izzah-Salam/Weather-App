import bg from "./assets/img/bg.avif";
import WeatherDashboard from "./Components/WeatherDashboard";

function App() {
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
