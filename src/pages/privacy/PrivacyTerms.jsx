import React from "react";
import { motion } from "framer-motion";

const privacySections = [
  {
    title: "Introduction",
    content: "At LoanLink, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information.",
  },
  {
    title: "Information We Collect",
    content: "We collect information you provide when applying for a loan, including your name, contact details, financial information, and loan preferences. We also collect usage data to improve our services.",
  },
  {
    title: "How We Use Your Data",
    content: "Your information is used to process loan applications, manage accounts, provide customer support, and comply with legal obligations. We never sell your personal information.",
  },
  {
    title: "Cookies & Tracking",
    content: "We use cookies and similar technologies to enhance user experience, track usage patterns, and optimize our platform.",
  },
  {
    title: "Security",
    content: "We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or modification.",
  },
  {
    title: "Terms of Service",
    content: "By using LoanLink, you agree to comply with our terms, including responsible use of the platform, providing accurate information, and adhering to payment schedules.",
  },
];

const PrivacyTerms = () => {
  return (
    <motion.div
      className="bg-base-100 min-h-screen py-12 px-6 md:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">
            Privacy Policy & Terms
          </h1>
          <p className="text-gray-600">
            Learn about how LoanLink handles your data and the rules for using our platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {privacySections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-base-200 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-base-content">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyTerms;
