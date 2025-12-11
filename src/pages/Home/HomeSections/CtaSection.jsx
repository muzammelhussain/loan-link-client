import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="py-24 text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white relative overflow-hidden">
      {/* Decorative Blur Effects */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Ready to Get Your Loan?
        </h2>

        <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          Start your application now and get approval in less than 24 hours.
        </p>

        <Link to="/apply-loan">
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-10 py-4 bg-white text-blue-600 font-semibold rounded-full
            shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            Apply Now
          </motion.button>
        </Link>

        {/* Small subtitle */}
        <p className="mt-4 text-sm text-blue-200">
          No hidden fees. 100% secure and fast approval.
        </p>
      </motion.div>
    </section>
  );
};

export default CtaSection;
