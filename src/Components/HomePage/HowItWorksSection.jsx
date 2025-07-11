// src/Components/HomePage/HowItWorksSection.jsx

import { motion } from "framer-motion";
import { FaUpload, FaSearch, FaLightbulb } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { useEffect, useState } from "react";

// --- TypingText Component (Nested within this file) ---
/**
 * A component that displays text with a typing animation effect.
 *
 * @param {object} props - The component props.
 * @param {string} [props.text=""] - The text to be displayed with the typing animation.
 * @param {number} [props.speed=70] - The speed of the typing animation in milliseconds per character.
 */
function TypingText({ text = "", speed = 70 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Ensure text is valid before starting the typing animation
    if (!text || text.length === 0) {
      setDisplayedText(""); // Reset or keep empty if no text provided
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    // Cleanup function to clear the interval when the component unmounts
    // or if dependencies (text, speed) change
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.h2
      className="mb-4 text-4xl font-extrabold text-green-100 md:text-5xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {displayedText}
    </motion.h2>
  );
}

// --- HowItWorksStep Component (Nested within this file) ---
// Animation variants for individual step cards
const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // Consistent with your current animations
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }, // Consistent with your current animations
  },
};

/**
 * Renders an individual step card for the "How It Works" section.
 * Includes Tilt effect, step number, icon, title, and description.
 *
 * @param {object} props - The component props.
 * @param {React.ElementType} props.icon - The React Icon component to display (e.g., FaUpload).
 * @param {number} props.stepNumber - The number of the step (e.g., 1, 2, 3).
 * @param {string} props.title - The title of the step.
 * @param {string} props.description - The descriptive text for the step.
 * @param {number} [props.delay=0] - The animation delay for staggered appearance.
 */
function HowItWorksStep({ icon: Icon, stepNumber, title, description, delay = 0 }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }} // Apply the staggered delay here
    >
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true}>
        <div className="relative card-glow flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-lg shadow-xl hover:scale-[1.03] transition-transform duration-300">
          {/* Circular step number badge */}
          <div className="absolute flex items-center justify-center w-12 h-12 font-bold text-white transform -translate-x-1/2 bg-green-500 rounded-full shadow-lg -top-4 left-1/2">
            {stepNumber}
          </div>
          {/* Icon with glowing shadow */}
          <Icon className="mb-4 mt-8 text-5xl text-green-400 drop-shadow-[0_0_8px_#34D399]" />
          {/* Step title */}
          <h3 className="mb-2 text-2xl font-semibold text-white">
            {title}
          </h3>
          {/* Step description */}
          <p className="text-white/70">
            {description}
          </p>
        </div>
      </Tilt>
    </motion.div>
  );
}

// --- HowItWorksSection Component (Main Export) ---
/**
 * Renders the "How It Works" section, detailing the steps of the platform.
 * Includes a background vortex animation and dynamically rendered steps.
 */
function HowItWorksSection() {
  // Data for each step, making it easy to manage
  const stepsData = [
    {
      icon: FaUpload,
      title: "Upload Photo",
      description: "📸 Upload a well-lit leaf image to begin diagnosis.",
    },
    {
      icon: FaSearch,
      title: "AI Analysis",
      description: "🤖 Our CNN model scans leaf patterns for early signs.",
    },
    {
      icon: FaLightbulb,
      title: "Get Insights",
      description: "💡 Get instant diagnosis with recommended actions.",
    },
  ];

  return (
    <section
      className="relative z-10 py-24 overflow-hidden text-center bg-green-950"
      id="how-it-works"
    >
      {/* Background radial vortex animation */}
      {/* Ensure 'animate-spin-slow' and 'bg-radial-vortex' Tailwind classes are defined in your CSS */}
      <div className="absolute top-1/2 left-1/2 w-[140vw] h-[140vw] -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-full animate-spin-slow bg-radial-vortex" />
      </div>

      <div className="container relative z-10 max-w-screen-xl px-6 mx-auto md:px-10">
        {/* Main heading with typing animation */}
        <TypingText text="How It Works" />
        <p className="mb-16 text-lg text-green-300">
          Quickly detect plant diseases in just 3 cinematic steps.
        </p>

        {/* Grid for the step cards, dynamically rendered */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <HowItWorksStep
              key={index} // Using index as key is acceptable here as the list is static and not reordered
              icon={step.icon}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              delay={index * 0.2} // Stagger the animation (0s, 0.2s, 0.4s)
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;