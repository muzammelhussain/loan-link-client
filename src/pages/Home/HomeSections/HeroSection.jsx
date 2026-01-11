import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-base-200 py-24 px-4 md:px-6 w-full">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl font-extrabold leading-tight"
          >
            Your Trusted{" "}
            <span className="text-primary relative">
              Microloan
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary opacity-40 rounded-full"></span>
            </span>{" "}
            Partner
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base md:text-lg opacity-80 max-w-xl mx-auto md:mx-0"
          >
            Secure fast, transparent, and flexible loans designed to empower
            individuals and small businesses with confidence and control.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link to="/all-loan-page">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-10 py-4 bg-primary text-primary-content rounded-full font-semibold shadow-lg"
              >
                Apply for Loan
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="flex justify-center relative"
        >
          <div className="absolute inset-0 bg-primary opacity-10 blur-2xl rounded-3xl"></div>
          <img
            src="https://i.ibb.co.com/C5JhMWfn/images11.jpg"
            alt="Loan illustration"
            className="relative rounded-2xl shadow-2xl w-full max-w-sm md:max-w-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
