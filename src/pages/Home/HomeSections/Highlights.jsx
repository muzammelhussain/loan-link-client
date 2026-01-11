import React from "react";
import { motion } from "framer-motion";

const highlights = [
  { icon: "✅", label: "Fast Approval", desc: "Get loans approved quickly with minimal paperwork." },
  { icon: "🔒", label: "Secure Platform", desc: "Your data and transactions are fully protected." },
  { icon: "💻", label: "Easy Online Access", desc: "Apply and track loans from anywhere." },
  { icon: "🤝", label: "Reliable Support", desc: "24/7 assistance from our dedicated team." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Highlights = () => (
  <section className="py-20 px-6 bg-base-100">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-base-content">
        Why Choose LoanLink
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-base-200 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
            <p className="text-sm text-center opacity-80">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Highlights;
