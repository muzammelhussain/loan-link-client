import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    setLoading(true);
    const { name, email, password, role } = data;
    const photoFile = data.photo[0];

    // Password Validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain 1 uppercase letter!");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain 1 lowercase letter!");
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser(email, password);

      // Upload Photo to imgbb
      const imgForm = new FormData();
      imgForm.append("image", photoFile);
      const imgUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgRes = await fetch(imgUploadURL, { method: "POST", body: imgForm });
      const imgData = await imgRes.json();
      const photoURL = imgData.data.url;

      await updateUserProfile({ displayName: name, photoURL });

      // Save user to backend
      const userInfo = { name, email, role, photoURL };
      await fetch("https://loan-link-server-eight.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      toast.success("Registration Successful!");
      reset();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Join LoanLink</h2>
        <p className="text-center text-white/70 mb-6">Create your account</p>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          {[
            { label: "Full Name", key: "name", type: "text", placeholder: "Enter your full name" },
            { label: "Email", key: "email", type: "email", placeholder: "Enter your email" },
            { label: "Password", key: "password", type: "password", placeholder: "Enter your password" },
          ].map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.key, { required: `${field.label} is required` })}
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-purple-400 transition-all"
              />
              {errors[field.key] && (
                <p className="text-red-300 text-sm mt-1">{errors[field.key]?.message}</p>
              )}
            </motion.div>
          ))}

          {/* Photo Upload */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="file"
              {...register("photo", { required: "Photo is required" })}
              className="file-input input-bordered w-full bg-white/20 text-white placeholder-white/60"
            />
            {errors.photo && <p className="text-red-300 text-sm mt-1">{errors.photo.message}</p>}
          </motion.div>

          {/* Role Selector */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <select
              {...register("role", { required: "Role is required" })}
              className="select select-bordered w-full bg-white/20 text-white focus:ring-2 focus:ring-purple-400 transition-all"
            >
              <option value="">Select Role</option>
              <option value="user">Borrower</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <p className="text-red-300 text-sm mt-1">{errors.role.message}</p>}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading || isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="btn w-full bg-indigo-600 hover:bg-indigo-700 border-none text-white"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* Social Login */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <SocialLogin />
        </motion.div>

        {/* Redirect */}
        <p className="text-center mt-4 text-white/70">
          Already have an account?
          <Link to="/login" className="text-white font-semibold ml-1 underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
