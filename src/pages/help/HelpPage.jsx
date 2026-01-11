import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I apply for a loan?",
    answer: "You can apply online by filling out our quick loan form. Managers review your application within 24-48 hours.",
  },
  {
    question: "What types of loans are available?",
    answer: "We offer Personal Loans, Business Loans, Education Loans, Home Loans, Car Loans, and Travel Loans.",
  },
  {
    question: "How do I make payments?",
    answer: "Payments can be made securely online through your dashboard or using our supported payment gateways.",
  },
  {
    question: "How do I contact support?",
    answer: "You can fill out the contact form below or use the live chat button to reach our support team instantly.",
  },
];

const FAQItem = ({ faq, index, activeIndex, setActiveIndex }) => {
  const isOpen = index === activeIndex;
  return (
    <motion.div className="border-b border-base-300" layout>
      <button
        className="w-full text-left py-4 flex justify-between items-center font-medium text-base-content"
        onClick={() => setActiveIndex(isOpen ? null : index)}
      >
        {faq.question}
        <span className={`ml-4 text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden pb-4 text-sm opacity-80"
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    // Here you can connect your API to send the message
  };

  return (
    <motion.div
      className="bg-base-100 min-h-screen py-12 px-6 md:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">
          Help & Support
        </h1>
        <p className="text-gray-600">
          Find answers to common questions or contact our support team directly.
        </p>
      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-base-content">FAQs</h2>
        <div className="bg-base-200 shadow-lg rounded-xl divide-y divide-base-300">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-base-content">Contact Support</h2>
        {submitted ? (
          <motion.div
            className="bg-primary text-white rounded-xl p-6 font-semibold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Thank you! Your message has been sent.
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-base-200 rounded-xl shadow-lg p-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-3 rounded-xl border border-base-300 focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-3 rounded-xl border border-base-300 focus:outline-none"
              required
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="p-3 rounded-xl border border-base-300 focus:outline-none resize-none h-32"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary-focus transition-colors"
            >
              Send Message
            </button>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
};

export default HelpPage;
