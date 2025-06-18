import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ParticlesBG from "../Components/ParticlesBg/ParticlesBg";
import History from "../Components/History/History";
import ImageUpload from "../Components/ImageUpload/ImageUpload";
import { useState } from "react";

function Predict() {
  const [predictions, setPredictions] = useState([]);

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-br from-green-950 via-green-900 to-green-800">
      {/* Particle Background */}
      <ParticlesBG />

      {/* Navbar */}
      <div className="sticky top-0 z-50 shadow-md bg-green-950/70 backdrop-blur-md">
        <Navbar />
      </div>

      {/* Page Body */}
      <main className="flex flex-col-reverse gap-8 px-4 py-10 mx-auto md:flex-row max-w-7xl md:px-10 md:py-16">
        {/* Sidebar History */}
        <aside className="w-full md:w-1/3">
          <div className="sticky top-24">
            <History predictions={predictions} setPredictions={setPredictions} />
          </div>
        </aside>

        {/* Main Upload Section */}
        <section className="w-full md:w-2/3">
          <ImageUpload predictions={predictions} setPredictions={setPredictions} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Predict;
