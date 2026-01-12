import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const demoCredentials = {
  user: { email: "muzammel@loanlink.com", password: "Aa@123456" },
  admin: { email: "muzammeladmin@gmail.com", password: "Aa@123456" },
  manager: { email: "muzammelmanager@gmail.com", password: "Aa@123456" },
};

const Login = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await signInUser(data.email, data.password);
      toast.success("Login successful 🎉", { duration: 3000 });
      navigate(location?.state || "/");
    } catch {
      toast.error("Invalid email or password!");
    }
  };

  const fillDemo = async (role) => {
    const creds = demoCredentials[role];
    setValue("email", creds.email);
    setValue("password", creds.password);
    toast.success(`${role.toUpperCase()} credentials filled!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-white/70 mt-1">Login to your account</p>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/60"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/60"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="btn w-full bg-indigo-600 hover:bg-indigo-700 border-none"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowDemoModal(true)}
            className="btn btn-outline text-white border-white hover:bg-white/20"
          >
            Show Demo Credentials
          </button>
        </div>

        <div className="mt-6">
          <SocialLogin />
        </div>

        <p className="text-center mt-6 text-white/70">
          New here?
          <Link
            to="/register"
            state={location.state}
            className="text-white font-semibold underline ml-1"
          >
            Create account
          </Link>
        </p>
      </motion.div>

      {/* ================= DEMO MODAL ================= */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full text-black"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">Demo Credentials</h3>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                {Object.keys(demoCredentials).map((role, i) => (
                  <motion.div
                    key={role}
                    className="border p-4 rounded-xl mb-4 bg-gray-50 cursor-pointer hover:bg-indigo-100 transition-all shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <p className="font-semibold capitalize text-indigo-600">{role}</p>
                    <p>Email: {demoCredentials[role].email}</p>
                    <p>Password: {demoCredentials[role].password}</p>
                    <button
                      onClick={() => fillDemo(role)}
                      className="mt-2 btn btn-sm w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-all"
                    >
                      Auto-fill Login Form
                    </button>
                  </motion.div>
                ))}
              </motion.div>

              <button
                onClick={() => setShowDemoModal(false)}
                className="btn btn-outline w-full mt-4"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
