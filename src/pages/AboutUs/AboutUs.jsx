import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="pt-24 pb-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.h2
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          LoanLink is a modern microloan management system designed to simplify
          the loan request and approval process. We aim to make financial
          support accessible, transparent, and efficient for everyone.
        </motion.p>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            className="p-6 bg-base-200 shadow-lg rounded-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To empower individuals by providing fast, fair, and reliable
              microloan services powered by innovative technology.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="p-6 bg-base-200 shadow-lg rounded-xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              We strive to make loan applications simple and transparent,
              ensuring quick approvals and easy management for borrowers and
              loan officers.
            </p>
          </motion.div>
        </div>

        {/* What We Provide */}
        <motion.div
          className="mt-12 p-6 bg-base-200 shadow-lg rounded-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">What We Provide</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Easy and quick online loan applications</li>
            <li>• Secure authentication and user management</li>
            <li>• Real-time tracking of loan status</li>
            <li>• Role-based dashboards — Borrower, Manager, Admin</li>
            <li>• Data-driven tools for faster decision-making</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
