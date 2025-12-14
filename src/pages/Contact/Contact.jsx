import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 opacity-70"></div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white bg-opacity-50 backdrop-blur-xl shadow-lg p-8 rounded-2xl"
        >
          <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-3">
            Have questions or need help? We're always here to support you.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-600 text-2xl" />
              <span className="text-gray-800 text-lg">+880 1234 567 890</span>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-600 text-2xl" />
              <span className="text-gray-800 text-lg">
                support@loanlink.com
              </span>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-600 text-2xl" />
              <span className="text-gray-800 text-lg">Dhaka, Bangladesh</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white bg-opacity-50 backdrop-blur-xl shadow-lg p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
            ></textarea>

            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
