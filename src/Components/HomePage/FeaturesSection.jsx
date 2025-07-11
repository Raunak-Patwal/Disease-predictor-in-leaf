import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLeaf,
  FaRobot,
  FaChartBar,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

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

function FeaturesSection() {
  const features = [
    {
      icon: FaRobot,
      title: "AI-Powered Accuracy",
      description:
        "Leverage state-of-the-art machine learning for highly accurate disease detection.",
    },
    {
      icon: FaChartBar,
      title: "Instant Diagnosis",
      description: "Get results in seconds, allowing for quick decision-making and action.",
    },
    {
      icon: FaLeaf,
      title: "Sustainable Farming",
      description: "Promote eco-friendly practices by enabling targeted treatments.",
    },
    {
      icon: FaShieldAlt,
      title: "Crop Protection",
      description: "Safeguard your yields from devastating diseases with timely intervention.",
    },
    {
      icon: FaUsers,
      title: "User-Friendly Interface",
      description: "Designed for simplicity, making it accessible to farmers and enthusiasts alike.",
    },
    {
      icon: FaLightbulb,
      title: "Actionable Insights",
      description: "Receive clear, practical recommendations to combat identified diseases.",
    },
  ];

  return (
    <section className="relative z-10 py-20 bg-green-950" id="features">
      <div className="container max-w-screen-xl px-6 mx-auto md:px-10">
        <motion.h2
          className="mb-16 text-4xl font-bold text-center text-green-100 md:text-5xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Why Choose Our Platform?
        </motion.h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-8 text-center transition-transform duration-300 transform shadow-lg bg-white/5 rounded-xl backdrop-blur-sm hover:scale-105"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <feature.icon className="mb-6 text-6xl text-green-400" />
              <h3 className="mb-4 text-2xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-white/70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;