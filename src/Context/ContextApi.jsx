// Create Context

import { createContext, useState } from "react";

export const weatherContext = createContext();

// create a context provide component

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("karachi");
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [Loading, setLoading] = useState("");
  const [Error, setError] = useState("");
  return (
    <weatherContext.Provider
      value={{
        city,
        setCity,
        lon,
        setLon,
        lat,
        setLat,
        Loading,
        setLoading,
        Error,
        setError,
      }}
    >
      {children}
    </weatherContext.Provider>
  );
};
