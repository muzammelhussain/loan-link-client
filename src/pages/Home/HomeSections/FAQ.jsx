import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I apply for a loan?",
    answer: "You can apply online by filling out our quick loan form. Once submitted, a manager will review your application.",
  },
  {
    question: "What types of loans are available?",
    answer: "We offer Personal Loans, Business Loans, Education Loans, Home Loans, Car Loans, and Travel Loans.",
  },
  {
    question: "How long does approval take?",
    answer: "Most loan applications are reviewed within 24-48 hours, depending on the type and completeness of your application.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely! All payments are encrypted and processed through secure payment gateways.",
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

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 px-6 bg-base-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-base-content">
          Frequently Asked Questions
        </h2>

        <div className="bg-base-100 px-10 shadow-lg rounded-xl divide-y divide-base-300">
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
    </section>
  );
};

export default FAQ;
