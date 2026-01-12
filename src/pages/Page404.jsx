import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const float = {
  animate: {
    y: [0, -20, 0],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const Page404 = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center text-white">

      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Floating Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 -top-32 -left-32"
        animate={{ x: [0, 40, 0], y: [0, 60, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30 -bottom-32 -right-32"
        animate={{ x: [0, -40, 0], y: [0, -60, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-3xl px-10 py-16 text-center shadow-2xl max-w-xl w-full mx-4"
      >
        {/* Animated 404 */}
        <motion.h1
          className="text-7xl sm:text-8xl font-extrabold tracking-widest"
          animate={{
            textShadow: [
              "0px 0px 10px rgba(255,255,255,0.4)",
              "0px 0px 30px rgba(255,255,255,0.9)",
              "0px 0px 10px rgba(255,255,255,0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.h1>

        {/* Floating Title */}
        <motion.h2
          {...float}
          className="mt-6 text-3xl sm:text-4xl font-bold"
        >
          Lost in Space 🚀
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-white/80 text-base sm:text-lg"
        >
          The page you’re looking for drifted into the unknown.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/"
            className="group relative px-6 py-3 rounded-xl bg-white text-black font-semibold overflow-hidden"
          >
            <span className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative group-hover:text-white transition-colors">
              ← Back Home
            </span>
          </Link>

          <Link
            to="/help"
            className="px-6 py-3 rounded-xl border border-white/40 hover:bg-white/10 transition"
          >
            Contact Support →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page404;
