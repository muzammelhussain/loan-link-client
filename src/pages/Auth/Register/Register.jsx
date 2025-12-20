import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  // const handleRegistration = async (data) => {
  //   setLoading(true);

  //   const { name, email, password, role } = data;
  //   const photoFile = data.photo[0];

  //   // ⛔ Password validation
  //   if (password.length < 6) {
  //     toast.error("Password must be at least 6 characters!");
  //     setLoading(false);
  //     return;
  //   }
  //   if (!/[A-Z]/.test(password)) {
  //     toast.error("Password must contain at least 1 uppercase letter!");
  //     setLoading(false);
  //     return;
  //   }
  //   if (!/[a-z]/.test(password)) {
  //     toast.error("Password must contain at least 1 lowercase letter!");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     // 1️⃣ Register user in Firebase
  //     const result = await registerUser(email, password);
  //     const user = result.user;

  //     // 2️⃣ Upload image to imgbb
  //     const imgForm = new FormData();
  //     imgForm.append("image", photoFile);

  //     const imgUploadURL = `https://api.imgbb.com/1/upload?key=${
  //       import.meta.env.VITE_image_host_key
  //     }`;

  //     const imgRes = await axios.post(imgUploadURL, imgForm);
  //     const photoURL = imgRes.data.data.url;

  //     // 3️⃣ Update Firebase profile
  //     await updateUserProfile({
  //       displayName: name,
  //       photoURL: photoURL,
  //     });

  //     // 4️⃣ Save user to database
  //     const userInfo = {
  //       name,
  //       email,
  //       role,
  //       photoURL,
  //     };

  //     await axios.post("/users", userInfo);

  //     toast.success("Registration Successful!");
  //     reset();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }

  //   setLoading(false);
  // };
  const handleRegistration = async (data) => {
    setLoading(true);

    const { name, email, password, role } = data;
    const photoFile = data.photo[0];

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least 1 uppercase letter!");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least 1 lowercase letter!");
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser(email, password);
      const user = result.user;

      const imgForm = new FormData();
      imgForm.append("image", photoFile);

      const imgUploadURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await fetch(imgUploadURL, {
        method: "POST",
        body: imgForm,
      });

      const imgData = await imgRes.json();
      const photoURL = imgData.data.url;
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });

      const userInfo = {
        name,
        email,
        role,
        photoURL,
      };

      await fetch("https://loan-link-server-eight.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-200 shadow-2xl rounded-2xl p-8 w-full max-w-md border">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          LoanLink Register
        </h2>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
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

          {/* Photo Upload */}
          <div>
            <label className="font-semibold">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input input-bordered w-full mt-1"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">Photo is required</p>
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
              <option value="user">Borrower</option>
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

        {/* Redirect Link */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
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
