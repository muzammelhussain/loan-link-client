import React from "react";
import { motion } from "framer-motion";

const FeedbackCarousel = () => {
  const feedbackData = [
    { name: "Rafi", feedback: "Very fast loan approval. Great service!" },
    { name: "Mitu", feedback: "Easy to apply and transparent process." },
    { name: "Siam", feedback: "Perfect for small emergencies." },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>

        <div className="carousel w-full space-x-4">
          {feedbackData.map((item, index) => (
            <motion.div
              key={index}
              className="carousel-item bg-gray-100 p-8 rounded-lg shadow-md w-80"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-700">{item.feedback}</p>
              <h4 className="mt-3 font-bold">{item.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
