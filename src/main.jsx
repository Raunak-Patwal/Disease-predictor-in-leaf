import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PredictionProvider } from "./Components/Fetch/PredictionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PredictionProvider>
      <App />
    </PredictionProvider>
  </BrowserRouter>
);
