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
    <section className="py-20 bg-gray-100 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">How LoanLink Works</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white shadow p-6 rounded-lg"
            >
              <div className="text-blue-600 text-4xl font-extrabold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
