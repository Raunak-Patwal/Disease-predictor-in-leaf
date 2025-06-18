import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PredictPage from "./Pages/PredictPage";


function App() {
  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<PredictPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
