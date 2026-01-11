import React from "react";
import { motion } from "framer-motion";

const blogs = [
  {
    title: "How to Apply for a Personal Loan",
    desc: "Learn the step-by-step process for a quick personal loan approval.",
    author: "John Doe",
    date: "Jan 10, 2026",
    image: "https://i.ibb.co.com/qLhRcWmk/images1.jpg",
  },
  {
    title: "Top 5 Tips for Business Loan Approval",
    desc: "Increase your chances of getting your business loan approved.",
    author: "Jane Smith",
    date: "Jan 8, 2026",
    image: "https://i.ibb.co.com/DsfFcdy/imag6es.jpg",
  },
  {
    title: "Understanding Loan Interest Rates",
    desc: "A guide to understanding fixed and variable interest rates.",
    author: "Alex Lee",
    date: "Jan 5, 2026",
    image: "https://i.ibb.co.com/mrbqJHbP/images3.jpg",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Blogs = () => {
  return (
    <section className="py-20 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-base-content">
          Latest Blogs
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-base-200 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm mb-4 opacity-80">{blog.desc}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;
