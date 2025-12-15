import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const LoanApplicationForm = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

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

  if (loading)
    return <p className="text-center py-10">Loading Loan Details...</p>;
  if (!loan)
    return (
      <p className="text-center py-10 text-red-600">Loan details not found.</p>
    );

  const onSubmit = async (data) => {
    const application = {
      loanId: id,
      loanTitle: loan["Loan Title"], // FIXED
      interestRate: loan["Interest Rate"], // FIXED
      userEmail: user.email,

      // User Input fields
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      nationalId: data.nationalId,
      incomeSource: data.incomeSource,
      monthlyIncome: data.monthlyIncome,
      loanAmount: data.loanAmount,
      reason: data.reason,
      address: data.address,
      notes: data.notes,

      // Initial Status
      status: "pending",
      applicationFeeStatus: "unpaid",
      appliedAt: new Date().toISOString(),
    };
    console.log(application);
    try {
      await axiosInstance.post("/loanApplications", application);

      toast.success("Loan Application Submitted successfully!");
      reset();
      // navigate('/user-dashboard/my-applications');
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-2xl p-8 md:p-12 rounded-xl my-10 border border-indigo-100">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 border-b pb-3">
        Loan Application Form
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <h3 className="text-xl font-semibold mb-3 text-indigo-800">
            Loan Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                readOnly
                value={user.email}
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loan Title
              </label>
              <input
                readOnly
                value={loan["Loan Title"]}
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed font-semibold"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Interest Rate (%)
            </label>
            <input
              readOnly
              value={loan["Interest Rate"]}
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed font-semibold"
            />
          </div>
        </div>

        <h3 className="text-2xl font-semibold pt-4 border-t mt-6">
          Personal & Financial Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              {...register("firstName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              {...register("lastName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number *
            </label>
            <input
              {...register("contactNumber", {
                required: true,
                pattern: /^\+?[0-9\s-]{7,15}$/,
              })}
              className="input input-bordered w-full"
              placeholder="e.g., +88017..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              National ID / Passport *
            </label>
            <input
              {...register("nationalId", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Income Source *
            </label>
            <input
              {...register("incomeSource", { required: true })}
              className="input input-bordered w-full"
              placeholder="e.g., Employment, Business, Rental"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monthly Income ($) *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("monthlyIncome", { required: true, min: 1 })}
              className="input input-bordered w-full"
              placeholder="e.g., 2500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Requested Loan Amount ($) *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("loanAmount", { required: true, min: 1 })}
              className="input input-bordered w-full"
              placeholder="e.g., 10000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address *
          </label>
          <textarea
            {...register("address", { required: true })}
            className="textarea textarea-bordered w-full h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason for Loan *
          </label>
          <textarea
            {...register("reason", { required: true })}
            className="textarea textarea-bordered w-full h-24"
            placeholder="Briefly explain why you need the loan (e.g., 'To purchase new equipment for my business')."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Extra Notes (Optional)
          </label>
          <textarea
            {...register("notes")}
            className="textarea textarea-bordered w-full h-20"
            placeholder="Any additional information you want to provide."
          />
        </div>

        <button
          type="submit"
          className="btn btn-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-lg transition duration-200"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
