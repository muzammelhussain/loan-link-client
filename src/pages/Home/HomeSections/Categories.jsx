import React from "react";
import { motion } from "framer-motion";

const categories = [
  { title: "Personal Loan", icon: "💰", lightBg: "bg-yellow-100", darkBg: "bg-yellow-900" },
  { title: "Business Loan", icon: "🏢", lightBg: "bg-green-100", darkBg: "bg-green-900" },
  { title: "Education Loan", icon: "🎓", lightBg: "bg-blue-100", darkBg: "bg-blue-900" },
  { title: "Home Loan", icon: "🏠", lightBg: "bg-purple-100", darkBg: "bg-purple-900" },
  { title: "Car Loan", icon: "🚗", lightBg: "bg-red-100", darkBg: "bg-red-900" },
  { title: "Travel Loan", icon: "✈️", lightBg: "bg-pink-100", darkBg: "bg-pink-900" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const Categories = ({ theme = "light" }) => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-16 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-base-content">
          Loan Categories
        </h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {categories.map((cat, index) => {
            const bgClass = theme === "dark" ? cat.darkBg : cat.lightBg;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`${bgClass} rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform duration-300`}
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-lg sm:text-base md:text-lg font-semibold text-base-content">
                  {cat.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
