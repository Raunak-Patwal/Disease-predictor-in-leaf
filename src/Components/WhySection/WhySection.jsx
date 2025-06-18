import { Sprout, ShieldCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

function WhySection() {
  return (
    <section className="w-full px-6 py-24 text-white md:px-16 bg-gradient-to-br from-green-950 via-green-900 to-green-800">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold tracking-tight text-green-300 md:text-5xl"
        >
          🌿 Why This Model Matters
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-6 text-lg md:text-xl text-white/80"
        >
          This model isn’t just about classification — it’s about{" "}
          <span className="font-semibold text-green-200">protecting crops</span>,
          boosting yield, and making agriculture smarter, greener, and more sustainable.
        </motion.p>
      </div>

      <div className="grid max-w-5xl gap-8 mx-auto mt-20 md:grid-cols-2">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex items-start gap-4 p-6 border border-green-700 shadow-md rounded-2xl bg-green-900/30 backdrop-blur-lg"
        >
          <Sprout size={40} className="text-green-400 shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-green-200">Early Disease Detection</h3>
            <p className="mt-2 text-white/70">
              Identify infections before they spread. Prevent widespread crop damage with AI-powered analysis.
            </p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex items-start gap-4 p-6 border border-green-700 shadow-md rounded-2xl bg-green-900/30 backdrop-blur-lg"
        >
          <ShieldCheck size={40} className="text-green-400 shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-green-200">Crop Protection & Yield Boost</h3>
            <p className="mt-2 text-white/70">
              Timely insights help farmers act fast, apply the right solution, and get better harvests.
            </p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex items-start gap-4 p-6 border border-green-700 shadow-md rounded-2xl bg-green-900/30 backdrop-blur-lg md:col-span-2"
        >
          <AlertTriangle size={40} className="text-green-400 shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-green-200">Supports Sustainable Farming</h3>
            <p className="mt-2 text-white/70">
              Reduces unnecessary pesticides, preserves soil health, and promotes eco-friendly agriculture.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhySection;
