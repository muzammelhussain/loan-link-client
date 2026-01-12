import React from "react";
import { motion } from "framer-motion";

const services = [
  { title: "Personal Loans", desc: "Quick approval for personal financial needs.", icon: "💰" },
  { title: "Business Loans", desc: "Flexible loans to help grow your business.", icon: "🏢" },
  { title: "Loan Tracking", desc: "Monitor your loan application and payments.", icon: "📊" },
  { title: "Secure Payments", desc: "Make safe and easy online repayments.", icon: "🔒" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const Services = () => {
  return (
    <section className="py-20 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-base-content">
          Our Services
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-base-200 shadow-lg rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-amber-600">{service.title}</h3>
              <p className="text-sm opacity-80">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
