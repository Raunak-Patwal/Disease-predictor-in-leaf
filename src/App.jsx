import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PredictPage from "./Pages/PredictPage";
import Result from "./Pages/Result";


function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/result/:disease" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
