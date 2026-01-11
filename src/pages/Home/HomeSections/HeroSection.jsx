import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="mt-10 bg-base-200 py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-base-content leading-tight">
            Your Trusted <span className="text-primary">Microloan</span> Partner
          </h1>

          <p className="mt-4 text-base md:text-lg opacity-80 max-w-xl mx-auto md:mx-0">
            Secure fast, transparent, and flexible loans designed to empower
            individuals and small businesses with confidence.
          </p>

          <Link to="/all-loan-page">
            <button className="mt-8 px-8 py-3 bg-primary text-primary-content rounded-full font-semibold shadow-md hover:scale-105 transition-transform duration-300">
              Apply for Loan
            </button>
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/C5JhMWfn/images11.jpg"
            alt="Loan illustration"
            className="rounded-xl shadow-xl w-full max-w-sm md:max-w-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
