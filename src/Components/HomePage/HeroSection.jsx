import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import leafImage from "../../assets/leaf.svg"; // Adjust path as needed

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function HeroSection() {
  return (
    <section className="relative z-10 py-24 md:py-28">
      <div className="container max-w-screen-xl px-6 mx-auto md:px-10">
        <div className="grid items-center grid-cols-1 gap-14 md:grid-cols-2">
          {/* Left side: Text content */}
          <div className="space-y-8 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-medium tracking-wide text-green-400 uppercase"
            >
              AI-Driven Innovation
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-5xl font-black leading-snug tracking-tight text-transparent text-green-200 md:text-7xl bg-clip-text bg-gradient-to-r from-green-200 to-white"
            >
              Diagnose Plant <br /> Diseases Effortlessly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl mx-auto text-base leading-relaxed text-white/80 md:text-lg md:mx-0"
            >
              Upload a leaf photo. Let our model detect the disease.{" "}
              <strong className="text-green-300">Take action in seconds</strong>{" "}
              — saving crops and increasing yield sustainably.
            </motion.p>

            {/* Call to Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mt-8 md:justify-start"
            >
              <Link to="/predict">
                <button className="flex items-center gap-4 px-10 py-5 text-xl font-bold text-white transition-all duration-300 border shadow-xl group rounded-2xl backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl">
                  Predict Now
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>

            {/* Key points with staggered animation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="mt-8 space-y-2 text-sm text-white/70 md:text-base"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 5 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                🌿{" "}
                <span className="font-medium text-white">
                  Upload leaf images
                </span>{" "}
                for instant diagnosis
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 5 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                🤖{" "}
                <span className="font-medium text-white">
                  AI-powered classification
                </span>{" "}
                and detection
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 5 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                📊{" "}
                <span className="font-medium text-white">
                  Get actionable results
                </span>{" "}
                in seconds
              </motion.p>
            </motion.div>
          </div>

          {/* Right side: Image content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative flex justify-center w-full"
          >
            {/* Background Glow behind the image */}
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
  );
}

export default HeroSection;