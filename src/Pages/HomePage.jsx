// src/pages/HomePage.jsx
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import WaveDivider from "../Components/WaveDivider/WaveDivider";
import ParticlesBG from "../Components/ParticlesBg/ParticlesBg";
import HeroSection from "../Components/HomePage/HeroSection";
import HowItWorksSection from "../Components/HomePage/HowItWorksSection";
import FeaturesSection from "../Components/HomePage/FeaturesSection";
import TestimonialsSection from "../Components/HomePage/TestimonialsSection";
import FaqSection from "../Components/HomePage/FaqSection";


function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gradient-to-br from-green-950 via-green-900 to-green-800">
      <ParticlesBG />
      <div className="sticky top-0 z-50 shadow-md bg-green-950/70 backdrop-blur-md">
        <Navbar />
      </div>   
      
      <HeroSection />
      <WaveDivider fill="#052c1e" />
      <HowItWorksSection />
      <WaveDivider fill="#063e27" flip />
      <FeaturesSection />
      <WaveDivider fill="#052c1e" />
      <TestimonialsSection />
      <WaveDivider fill="#063e27" flip />
      <FaqSection />         
      <Footer />
    </div>
  );
}

export default HomePage;
