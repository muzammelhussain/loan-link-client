import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    { step: "1", title: "Apply Online", desc: "Fill out our quick loan form." },
    {
      step: "2",
      title: "Manager Review",
      desc: "Managers review your request.",
    },
    { step: "3", title: "Receive Loan", desc: "Get approved & receive funds." },
  ];

  return (
    <section className="py-20 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-base-content">
          How LoanLink Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-100 shadow-lg rounded-xl p-6"
            >
              <div className="text-primary text-4xl font-extrabold">
                {item.step}
              </div>

              <h3 className="text-xl font-semibold mt-3 text-base-content">
                {item.title}
              </h3>

              <p className="mt-2 text-sm opacity-80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
