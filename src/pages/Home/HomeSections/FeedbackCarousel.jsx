import React from "react";
import { motion } from "framer-motion";

const FeedbackCarousel = () => {
  const feedbackData = [
    {
      name: "Rafi Hasan",
      feedback:
        "LoanLink made the entire loan process incredibly simple. I applied online, got approved quickly, and received the funds without any hassle. Highly recommended!",
    },
    {
      name: "Mitu Akter",
      feedback:
        "What I loved most is the transparency. No hidden charges, clear EMI plans, and helpful support throughout the application process.",
    },
    {
      name: "Siam Rahman",
      feedback:
        "This platform was a lifesaver during an emergency. Fast approval, fair interest rates, and a very smooth experience overall.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-base-content">
          What Our Customers Say
        </h2>

        {/* Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center ">
          {feedbackData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="min-w-[280px] md:min-w-[320px] bg-base-200 p-6 rounded-xl shadow-lg"
            >
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                “{item.feedback}”
              </p>

              <h4 className="mt-4 font-semibold text-primary">— {item.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
