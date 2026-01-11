import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Main blog content
const blog = {
  title: "How to Apply for a Personal Loan",
  author: "John Doe",
  date: "Jan 10, 2026",
  image: "https://i.ibb.co/5XhzhTfC/images7.jpg",
  content: [
    {
      heading: "Introduction",
      text: `Applying for a personal loan can seem complicated, but with LoanLink, the process is simple and secure.`
    },
    {
      heading: "Application Process",
      text: `First, fill out the online loan application form with your personal and financial information. Make sure all details are accurate to avoid delays.`
    },
    {
      heading: "Review & Approval",
      text: `After submission, our managers will review your application within 24-48 hours. Once approved, funds will be transferred directly to your account.`
    },
    {
      heading: "Terms & Support",
      text: `Always read the terms and conditions carefully, and reach out to our 24/7 support if you have any questions. LoanLink ensures a fast, safe, and transparent loan process for all our customers.`
    },
  ],
};

// Related blogs
const blogs = [
  {
    title: "How to Apply for a Personal Loan",
    desc: "Step-by-step process for a quick personal loan approval.",
    author: "John Doe",
    date: "Jan 10, 2026",
    image: "https://i.ibb.co/qLhRcWmk/images1.jpg",
  },
  {
    title: "Top 5 Tips for Business Loan Approval",
    desc: "Increase your chances of getting your business loan approved.",
    author: "Jane Smith",
    date: "Jan 8, 2026",
    image: "https://i.ibb.co/DsfFcdy/imag6es.jpg",
  },
  {
    title: "Understanding Loan Interest Rates",
    desc: "A guide to understanding fixed and variable interest rates.",
    author: "Alex Lee",
    date: "Jan 5, 2026",
    image: "https://i.ibb.co/mrbqJHbP/images3.jpg",
  },
  {
    title: "Benefits of Early Loan Repayment",
    desc: "Learn why early repayment can save you money.",
    author: "Sara Khan",
    date: "Jan 2, 2026",
    image: "https://i.ibb.co/2kz5B1L/images4.jpg",
  },
  {
    title: "Business vs Personal Loans",
    desc: "Differences between business and personal loans explained.",
    author: "Mark Lee",
    date: "Dec 30, 2025",
    image: "https://i.ibb.co/7bJ0M2M/images5.jpg",
  },
];

const FullPageBlog = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-base-100 min-h-screen relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-50" style={{ width: `${scrollProgress}%` }} />

      {/* Blog Header */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 md:px-16 lg:px-20">
        <motion.img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] object-cover rounded-xl mb-8 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-base-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {blog.title}
        </motion.h1>

        <motion.div
          className="flex flex-col sm:flex-row sm:justify-between mb-6 sm:mb-8 text-sm sm:text-base text-gray-500 gap-2 sm:gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span>By {blog.author}</span>
          <span>{blog.date}</span>
        </motion.div>

        {/* Sticky TOC for desktop */}
        <div className="hidden lg:block fixed top-32 left-8 w-48">
          <h2 className="font-semibold mb-4 text-lg text-base-content">Contents</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            {blog.content.map((section, idx) => (
              <li key={idx}>
                <a href={`#section-${idx}`} className="hover:text-primary transition-colors">
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Sections */}
        <div className="space-y-12">
          {blog.content.map((section, idx) => (
            <motion.div
              key={idx}
              id={`section-${idx}`}
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-base-content">
                {section.heading}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Related Blogs */}
        <motion.div className="mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-base-content">
            Related Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((relatedBlog, index) => (
              <motion.div
                key={index}
                className="bg-base-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={relatedBlog.image}
                  alt={relatedBlog.title}
                  className="w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-base sm:text-lg">{relatedBlog.title}</h3>
                  <p className="text-sm sm:text-base opacity-80">{relatedBlog.desc}</p>
                  <div className="mt-2 text-xs sm:text-sm text-gray-500 flex justify-between">
                    <span>{relatedBlog.author}</span>
                    <span>{relatedBlog.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FullPageBlog;
