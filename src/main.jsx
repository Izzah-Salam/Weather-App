import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherProvider } from "./Context/ContextApi.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <WeatherProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WeatherProvider>
);
