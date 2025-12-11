import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const result = await signInUser(email, password);
      toast.success("Login Successful!");

      // Redirect user to previous page OR home
      navigate(location?.state || "/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6 border rounded-2xl">
        <h3 className="text-3xl font-bold text-center text-blue-600">
          Welcome Back
        </h3>
        <p className="text-center mb-4">Please login to continue</p>

        {/* Login Form */}
        <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered"
              placeholder="Enter your password"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}

            <div>
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>

            <button className="btn btn-primary mt-4 w-full">Login</button>
          </fieldset>

          <p className="text-center mt-2">
            New to LoanLink?
            <Link
              state={location.state}
              className="text-blue-500 underline ml-1"
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>

        {/* Google Login */}
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
