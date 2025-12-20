import React from "react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      title: "Secure Platform",
      desc: "Your data and loan process are protected with enterprise-grade encryption and security.",
    },
    {
      title: "24/7 Support",
      desc: "Our dedicated support team is always available whenever you need assistance.",
    },
    {
      title: "Fast Approval",
      desc: "Get quick loan decisions and fast fund disbursement within 24 hours.",
    },
  ];

  return (
    <section className="py-20 bg-base-200 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-base-content">
          Why Choose LoanLink
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-100 shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary">
                {item.title}
              </h3>

              <p className="mt-4 text-base opacity-80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
