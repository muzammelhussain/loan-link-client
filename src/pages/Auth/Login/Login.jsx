import { useForm } from "react-hook-form";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const { email, password } = data;

    setLoading(true);

    // 👇 Replace with your authentication logic (Firebase/JWT/API)
    setTimeout(() => {
      toast.success("Login Successful!");
      setLoading(false);
    }, 1200);
  };

  // GOOGLE LOGIN (Demo)
  const handleGoogleLogin = () => {
    toast.success("Logged in with Google!");
    // Add your real Google login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          LoanLink Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full mt-1"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input input-bordered w-full mt-1"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn w-full mt-4 bg-red-500 hover:bg-red-600 text-white"
        >
          Login with Google
        </button>

        {/* Redirect to Register */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
