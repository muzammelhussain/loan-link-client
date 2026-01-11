import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { number: 1200, suffix: "+", label: "Loans Approved", icon: "✅" },
  { number: 550, suffix: "+", label: "Happy Customers", icon: "👥" },
  { number: 5000000, prefix: "$", label: "Funds Distributed", icon: "💵" },
  { number: 98, suffix: "%", label: "Approval Rate", icon: "📈" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Statistics = () => (
  <section className="py-20 px-6 bg-base-200">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-base-content">
        Platform Statistics
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-base-100 shadow-lg rounded-xl p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
          >
            <div className="text-5xl mb-4">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-extrabold mb-2 text-primary">
              <CountUp
                start={0}
                end={stat.number}
                duration={2}
                separator=","
                prefix={stat.prefix || ""}
                suffix={stat.suffix || ""}
              />
            </div>
            <p className="text-sm opacity-80">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Statistics;
