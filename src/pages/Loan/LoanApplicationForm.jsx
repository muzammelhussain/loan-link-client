import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const LoanApplicationForm = () => {
  const { id } = useParams(); // loan id
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { register, handleSubmit, reset } = useForm();

  // Load loan details
  const { data: loan, isLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/loans/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const onSubmit = async (data) => {
    const application = {
      loanId: id,
      loanTitle: loan.title,
      interestRate: loan.interestRate,
      userEmail: user.email,

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

      status: "Pending",
      applicationFeeStatus: "Unpaid",
    };

    await axiosInstance.post("/loanApplications", application);

    toast.success("Loan Application Submitted!");
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Loan Application Form
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Auto-filled fields */}
        <div>
          <label>Email</label>
          <input
            readOnly
            value={user.email}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Loan Title</label>
          <input
            readOnly
            value={loan.title}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Interest Rate (%)</label>
          <input
            readOnly
            value={loan.interestRate}
            className="input input-bordered w-full"
          />
        </div>

        {/* User Input Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              {...register("firstName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              {...register("lastName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label>Contact Number</label>
          <input
            {...register("contactNumber", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>National ID / Passport</label>
          <input
            {...register("nationalId", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Income Source</label>
          <input
            {...register("incomeSource", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Monthly Income</label>
          <input
            type="number"
            {...register("monthlyIncome", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Loan Amount</label>
          <input
            type="number"
            {...register("loanAmount", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Reason for Loan</label>
          <textarea
            {...register("reason", { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label>Address</label>
          <textarea
            {...register("address", { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label>Extra Notes</label>
          <textarea
            {...register("notes")}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full mt-4">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
