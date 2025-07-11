import { motion } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "This platform has revolutionized how I manage my crops. The diagnoses are incredibly accurate and fast. A must-have for any farmer!",
    author: "Ramesh K., Farmer",
  },
  {
    quote:
      "As an agricultural consultant, I recommend this tool to all my clients. It's a game-changer for early disease detection and sustainable practices.",
    author: "Dr. Priya S., Agronomist",
  },
  {
    quote:
      "My yield improved significantly after using this model. The insights are timely and actionable. Truly brilliant.",
    author: "Sunita M., Organic Grower",
  },
  {
    quote:
      "Finally, a tool that empowers even small-scale farmers with AI! Clean UI, fast results, and reliable predictions.",
    author: "Jitendra V., Local Farmer",
  },
];

function TestimonialsSection() {
  return (
    <section
      className="relative z-10 py-24 overflow-hidden bg-gradient-to-br from-green-950 to-green-900"
      id="testimonials"
    >
      <div className="container relative z-10 max-w-screen-xl px-6 mx-auto md:px-10">
        <motion.h2
          className="mb-20 text-4xl font-extrabold text-center text-green-100 md:text-5xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          What Our Users Say
        </motion.h2>

        {/* Infinite Scrolling Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-10 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            }}
          >
            {[...testimonials, ...testimonials].map((t, index) => (
              <div
                key={index}
                className="min-w-[300px] max-w-[340px] p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <FaQuoteRight className="mb-4 text-3xl text-green-400" />
                <p className="mb-4 italic text-white/90">{`"${t.quote}"`}</p>
                <p className="font-semibold text-green-300">{t.author}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Soft Gradient Glow Background */}
      <div className="absolute w-[150vw] h-[150vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="w-full h-full bg-green-800 rounded-full blur-3xl opacity-10 animate-pulse" />
      </div>
    </section>
  );
}

export default TestimonialsSection;
