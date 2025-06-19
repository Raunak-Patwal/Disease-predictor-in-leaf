import { createContext, useEffect, useState } from "react";

export const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("predictions");
    if (stored) setPredictions(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("predictions", JSON.stringify(predictions));
  }, [predictions]);

  return (
    <PredictionContext.Provider value={{ predictions, setPredictions }}>
      {children}
    </PredictionContext.Provider>
  );
};
