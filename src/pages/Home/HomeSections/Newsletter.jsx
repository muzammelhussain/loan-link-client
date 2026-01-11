import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    // Here you can connect your API to save the email
  };

  return (
    <section className="py-20 px-6 bg-primary text-white">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Updated with LoanLink
        </h2>
        <p className="mb-8 opacity-90">
          Subscribe to our newsletter to get the latest updates, tips, and offers directly to your inbox.
        </p>

        {submitted ? (
          <motion.div
            className="bg-white text-primary rounded-xl p-6 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Thank you for subscribing!
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-3 rounded-xl text-primary focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary-focus transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default Newsletter;
