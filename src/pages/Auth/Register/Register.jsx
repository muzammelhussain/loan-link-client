import { useForm } from "react-hook-form";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const { name, email, password, photoURL, role } = data;

    // Password Validation
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (!uppercase.test(password)) {
      toast.error("Password must include at least one uppercase letter");
      return;
    }
    if (!lowercase.test(password)) {
      toast.error("Password must include at least one lowercase letter");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    // 👉 Example Register (use your own API/Auth method)
    // Fake timeout for demonstration
    setTimeout(() => {
      toast.success("Registration Successful!");
      reset();
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          LoanLink Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-semibold">Photo URL</label>
            <input
              type="text"
              {...register("photoURL", { required: true })}
              className="input input-bordered w-full mt-1"
              placeholder="Photo URL"
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm">Photo URL is required</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="font-semibold">Role</label>
            <select
              {...register("role", { required: true })}
              className="select select-bordered w-full mt-1"
            >
              <option value="">Select Role</option>
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">Role is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-4"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
