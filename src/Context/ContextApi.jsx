// Create Context

import { createContext, useState } from "react";

export const weatherContext = createContext();

// create a context provide component

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("karachi");
  return (
    <weatherContext.Provider value={{ city, setCity }}>
      {children}
    </weatherContext.Provider>
  );
};
