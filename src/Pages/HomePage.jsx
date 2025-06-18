import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import WhySection from "../Components/WhySection/WhySection";
import WaveDivider from "../Components/WaveDivider/WaveDivider";
import ParticlesBG from "../Components/ParticlesBg/ParticlesBg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import leafImage from "../assets/leaf.svg";

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gradient-to-br from-green-950 via-green-900 to-green-800">
      <ParticlesBG />

      {/* Navbar */}
      <div className="sticky top-0 z-50 shadow-md bg-green-950/70 backdrop-blur-md">
        <Navbar />
      </div>

      {/* WHY SECTION FIRST */}
      <WhySection />
      <WaveDivider fill="#063e27" flip />

      {/* HERO SECTION */}
      <section className="relative z-10 py-24 md:py-28">
        <div className="container max-w-screen-xl px-6 mx-auto md:px-10">
          <div className="grid items-center grid-cols-1 gap-14 md:grid-cols-2">
            {/* Left: Text */}
            <div className="space-y-8 text-center md:text-left">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-sm font-medium tracking-wider text-green-400 uppercase"
              >
                AI-Driven Innovation
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-serif text-5xl font-black leading-snug tracking-tight text-green-200 md:text-7xl"
              >
                Diagnose Plant <br /> Diseases Effortlessly
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-xl mx-auto text-base text-white/80 md:text-lg md:mx-0"
              >
                Upload a leaf photo. Let our model detect the disease. Take
                action in seconds — saving crops and increasing yield
                sustainably.
              </motion.p>

              {/* Enhanced CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mt-8 md:justify-start"
              >
                <Link to="/predict">
                  <button className="flex items-center gap-4 px-10 py-5 text-xl font-bold text-white transition-all duration-300 border shadow-xl group rounded-2xl backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105">
                    Predict Now
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </motion.div>

              {/* Key points */}
              <div className="mt-8 space-y-1 text-sm text-white/70">
                <p>🌿 Upload leaf images for instant diagnosis</p>
                <p>🤖 AI-powered classification and detection</p>
                <p>📊 Get actionable results in seconds</p>
              </div>
            </div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative flex justify-center w-full"
            >
              {/* Background Glow */}
              <div className="absolute w-72 h-72 md:w-[400px] md:h-[400px] bg-green-700/30 rounded-full blur-3xl -z-10 top-10 md:top-16"></div>

              {/* Foreground Image */}
              <img
                src={leafImage}
                alt="Leaf Diagnosis"
                className="w-64 md:w-[400px] drop-shadow-xl animate-float"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
