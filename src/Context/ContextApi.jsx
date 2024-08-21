// Create Context

import { createContext, useState } from "react";

export const weatherContext = createContext();

// create a context provide component

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("karachi");
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);

  return (
    <weatherContext.Provider
      value={{
        city,
        setCity,
        lon,
        setLon,
        lat,
        setLat,
      }}
    >
      {children}
    </weatherContext.Provider>
  );
};
