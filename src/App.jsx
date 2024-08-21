import bg from "./assets/img/bg.avif";
import WeatherDashboard from "./Components/WeatherDashboard";

function App() {
  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen w-screen bg-[rgba(45,45,45)] text-white"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <WeatherDashboard />
      </div>
    </>
  );
}

export default App;
