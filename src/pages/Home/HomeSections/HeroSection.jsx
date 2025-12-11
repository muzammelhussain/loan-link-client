import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold">Your Trusted Microloan Partner</h1>
          <p className="mt-4 text-gray-600">
            Secure loans quickly with a seamless and transparent approval
            process.
          </p>

          <Link to="/apply-loan">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
              Apply for Loan
            </button>
          </Link>
        </motion.div>

        <motion.img
          src="https://i.ibb.co.com/C5JhMWfn/images11.jpg"
          className="rounded-lg"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
