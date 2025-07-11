import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

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

function FaqSection() {
  const faqs = [
    {
      question: "What types of plants does the model support?",
      answer:
        "Our AI model is continuously being trained on a wide variety of common crops and ornamental plants. Check our 'Supported Plants' page for the latest list.",
    },
    {
      question: "How accurate is the diagnosis?",
      answer:
        "The model boasts a high accuracy rate, continually improving with more data. However, for critical cases, always consult with a professional agronomist.",
    },
    {
      question: "Is my data private?",
      answer:
        "Absolutely. We prioritize your privacy. All uploaded images are processed securely and are not shared with third parties.",
    },
    {
      question: "Can I use this on my mobile device?",
      answer:
        "Yes, our platform is fully responsive and optimized for use on smartphones and tablets, allowing you to diagnose on the go.",
    },
  ];

  return (
    <section className="relative z-10 py-20 bg-green-950" id="faq">
      <div className="container max-w-screen-xl px-6 mx-auto md:px-10">
        <motion.h2
          className="mb-16 text-4xl font-bold text-center text-green-100 md:text-5xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="p-6 shadow-lg bg-white/5 rounded-xl backdrop-blur-sm"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <details className="cursor-pointer">
                <summary className="flex items-center justify-between py-2 text-lg font-semibold text-green-200">
                  {faq.question}
                  <FaQuestionCircle className="ml-2 text-green-400" />
                </summary>
                <p className="pl-4 mt-2 border-l border-green-700 text-white/80">
                  {faq.answer}
                </p>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;