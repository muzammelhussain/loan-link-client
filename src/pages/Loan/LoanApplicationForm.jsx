import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const LoanApplicationForm = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  // Fetch loan details
  const { data: loan } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/loans/${id}`);
      return res.data;
    },
  });

  if (!user) {
    navigate("/login");
    return (
      <p className="text-center py-10 text-red-600">
        Please log in to apply for a loan.
      </p>
    );
  }

  if (loading) return <p className="text-center py-10">Loading Loan Details...</p>;
  if (!loan)
    return (
      <p className="text-center py-10 text-red-600">Loan details not found.</p>
    );

  const onSubmit = async (data) => {
    const application = {
      loanId: id,
      loanTitle: loan.title,
      interestRate: loan.interestRate,
      userEmail: user.email,
      ...data,
      status: "Pending",
      applicationFeeStatus: "Unpaid",
      appliedAt: new Date().toISOString(),
    };
    try {
      await axiosInstance.post("/loanApplications", application);
      toast.success("Loan Application Submitted successfully!");
      reset();
      navigate("/dashboard/my-loans");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-2xl p-8 md:p-12 rounded-3xl my-10 border border-indigo-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-4xl font-extrabold mb-8 text-center text-indigo-700 border-b pb-3"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loan Application Form
      </motion.h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Loan Details */}
        <motion.div
          className="bg-white p-5 rounded-xl shadow-md border border-indigo-200"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-3 text-indigo-800">
            Loan Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Email" name="email" register={() => {}} readOnly value={user.email} />
            <InputField label="Loan Title" name="loanTitle" register={() => {}} readOnly value={loan.title} />
          </div>
          <div className="mt-4">
            <InputField label="Interest Rate (%)" name="interestRate" register={() => {}} readOnly value={loan.interestRate} />
          </div>
        </motion.div>

        {/* Personal & Financial Info */}
        <motion.div
          className="bg-white p-5 rounded-xl shadow-md border border-indigo-200"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
            Personal & Financial Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="First Name *" name="firstName" register={register} rules={{ required: true }} />
            <InputField label="Last Name *" name="lastName" register={register} rules={{ required: true }} />
            <InputField label="Contact Number *" name="contactNumber" register={register} rules={{ required: true, pattern: /^\+?[0-9\s-]{7,15}$/ }} placeholder="e.g., +88017..." />
            <InputField label="National ID / Passport *" name="nationalId" register={register} rules={{ required: true }} />
            <InputField label="Income Source *" name="incomeSource" register={register} rules={{ required: true }} placeholder="e.g., Employment, Business, Rental" />
            <InputField label="Monthly Income ($) *" name="monthlyIncome" register={register} rules={{ required: true, min: 1 }} placeholder="e.g., 2500" />
            <InputField label="Requested Loan Amount ($) *" name="loanAmount" register={register} rules={{ required: true, min: 1 }} placeholder="e.g., 10000" />
          </div>

          <TextareaField label="Address *" name="address" register={register} />
          <TextareaField label="Reason for Loan *" name="reason" register={register} placeholder="Briefly explain why you need the loan" />
          <TextareaField label="Extra Notes (Optional)" name="notes" register={register} placeholder="Any additional information" />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn w-full py-3 text-lg font-bold text-white rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 shadow-lg transform hover:scale-105 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Application
        </motion.button>
      </form>
    </motion.div>
  );
};

// Reusable InputField Component
const InputField = ({ label, name, register, rules = {}, placeholder = "", readOnly = false, value }) => (
  <div>
    <label className="block text-sm font-medium text-base-content opacity-80">{label}</label>
    <input
      {...(!readOnly ? register(name, rules) : {})}
      readOnly={readOnly}
      value={readOnly ? value : undefined}
      placeholder={placeholder}
      className={`input input-bordered w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 transition duration-200 ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
    />
  </div>
);

// Reusable TextareaField Component
const TextareaField = ({ label, name, register, placeholder = "" }) => (
  <div className="mt-4">
    <label className="block text-sm font-medium text-base-content opacity-80">{label}</label>
    <textarea
      {...register(name)}
      placeholder={placeholder}
      className="textarea textarea-bordered w-full h-24 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 transition duration-200"
    />
  </div>
);

export default LoanApplicationForm;
