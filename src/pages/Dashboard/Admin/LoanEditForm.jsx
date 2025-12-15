import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const LoanEditForm = ({ loan, closeModal, refetch }) => {
  const axiosInstance = useAxios();

  const { register, handleSubmit, reset } = useForm();

  // 🔹 Auto fill when loan data arrives
  useEffect(() => {
    if (loan) {
      reset({
        title: loan["Loan Title"] || "",
        description: loan.Description || "",
        interestRate: loan["Interest Rate"]
          ? parseFloat(loan["Interest Rate"])
          : "",

        category: loan.Category || "",
        maxAmount: loan["Max Loan Limit"] ? Number(loan["Max Loan Limit"]) : "",
        image: loan["Images Upload"] || "",
        emiPlans: loan["EMI Plans"] || "",
      });
    }
  }, [loan, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    const updatedLoan = {
      title: data.title,
      description: data.description,
      interestRate: data.interestRate,
      category: data.category,
      maxAmount: Number(data.maxAmount),
      image: data.image,
      emiPlans: data.emiPlans.map((plan) => ({
        duration: plan.duration,
        rate: Number(plan.rate),
      })),
    };

    try {
      await axiosInstance.patch(`/admin/loans/${loan._id}`, updatedLoan);
      toast.success("Loan updated successfully");
      closeModal();
      refetch();
    } catch (error) {
      toast.error("Failed to update loan");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Loan Title */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Loan Title</span>
        </label>
        <input
          {...register("title", { required: true })}
          className="input input-bordered w-full"
          placeholder="Loan Title"
        />
      </div>

      {/* Description */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
          placeholder="Description"
        />
      </div>

      {/* Interest Rate & Max Amount */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Interest Rate (%)</span>
          </label>
          <input
            type=""
            {...register("interestRate", { required: true })}
            className="input input-bordered"
            placeholder="Interest Rate"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Max Amount</span>
          </label>
          <input
            type="number"
            {...register("maxAmount", { required: true })}
            className="input input-bordered"
            placeholder="Max Amount"
          />
        </div>
      </div>

      {/* Category */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <input
          {...register("category", { required: true })}
          className="input input-bordered w-full"
          placeholder="Category"
        />
      </div>

      {/* Image URL */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Image URL</span>
        </label>
        <input
          {...register("image", { required: true })}
          className="input input-bordered w-full"
          placeholder="Image URL"
        />
      </div>

      {/* EMI Plans */}
      <div>
        <h1 className="text-center font-extrabold">EMI Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loan["EMI Plans"].map((plan, i) => (
            <div key={i} className="space-y-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Duration</span>
                </label>
                <input
                  {...register(`emiPlans.${i}.duration`, { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Duration (e.g. 12 Months)"
                  defaultValue={plan.duration}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Interest Rate</span>
                </label>
                <input
                  {...register(`emiPlans.${i}.rate`, { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Interest Rate (e.g. 7.8%)"
                  defaultValue={plan.rate}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-action">
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        <button type="button" onClick={closeModal} className="btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LoanEditForm;
