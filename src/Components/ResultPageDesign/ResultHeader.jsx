import { motion } from "framer-motion";

function ResultHeader({ title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative mb-12 text-center"
    >
      {/* Heading with fluttering leaf */}
      <h1 className="flex items-center justify-center gap-2 text-4xl font-extrabold tracking-wide text-yellow-300 md:text-5xl drop-shadow-xl">
        <motion.span
          whileHover={{ rotate: [0, -20, 20, -10, 10, 0] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="inline-block"
        >
          🌿
        </motion.span>
        {title} <span className="text-white">Detected</span>
      </h1>

      {/* Animated Underline */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "60%" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        className="h-1 mx-auto mt-3 rounded-full shadow-lg bg-gradient-to-r from-yellow-400 via-green-400 to-pink-400 animate-pulse"
      />

      {/* Subtitle */}
      <p className="mt-3 text-lg text-white/80">
        Here's a detailed analysis of the affected leaf
      </p>
    </motion.div>
  );
}

export default ResultHeader;
