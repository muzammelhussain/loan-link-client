import { useForm, useFieldArray } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const AddLoan = () => {
  const axiosInstance = useAxios();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      emiPlans: [{ duration: "", rate: "" }],
      showOnHome: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emiPlans",
  });

  const onSubmit = async (data) => {
    const documentsArray = Array.isArray(data.requiredDocuments)
      ? data.requiredDocuments
      : data.requiredDocuments
      ? data.requiredDocuments
          .split(",")
          .map((doc) => doc.trim())
          .filter((doc) => doc.length > 0)
      : [];

    const loanData = {
      title: data.title,
      description: data.description,
      category: data.category,
      interestRate: Number(data.interestRate),
      maxAmount: Number(data.maxAmount),
      requiredDocuments: documentsArray,
      images: data.image,
      emiPlans: data.emiPlans.map((plan) => ({
        duration: plan.duration,
        // Ensure rate is a number, handling empty/invalid input if possible in a real app
        rate: Number(plan.rate),
      })),
      showOnHome: data.showOnHome,
      createdAt: new Date(),
    };

    try {
      await axiosInstance.post("/manager/loans", loanData);
      toast.success("Loan added successfully 🎉");
      reset();
    } catch (error) {
      toast.error("Failed to add loan");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Add Loan
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {" "}
        {/* Loan Title */}
        <Input
          label="Loan Title"
          register={register("title", { required: true })}
        />
        {/* Description */}
        <Textarea
          label="Description"
          register={register("description", { required: true })}
        />
        {/* Category */}
        <Input
          label="Category"
          register={register("category", { required: true })}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Interest Rate (%)"
            type="text"
            register={register("interestRate", { required: true })}
          />
          <Input
            label="Max Loan Limit"
            type="number"
            register={register("maxAmount", { required: true })}
          />
        </div>
        {/* Required Documents */}
        <Textarea
          label="Required Documents (Separate by comma, e.g., NID, Bank Statement)"
          placeholder="NID, Bank Statement, Salary Slip"
          register={register("requiredDocuments")}
        />
        {/* Image */}
        <Input label="Image URL" register={register("image")} />
        {/* EMI Plans */}
        <div>
          <h3 className="font-bold mb-3 text-lg">EMI Plans</h3>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3 border rounded-lg bg-base-200"
            >
              <input
                className="input input-bordered w-full"
                placeholder="Duration (e.g., 12 Months)"
                {...register(`emiPlans.${index}.duration`, { required: true })}
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Rate (%)"
                {...register(`emiPlans.${index}.rate`, { required: true })}
              />
              <button
                type="button"
                className="btn btn-error btn-sm col-span-full" // full width button
                onClick={() => remove(index)}
              >
                Remove Plan
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline btn-sm mt-2"
            onClick={() => append({ duration: "", rate: "" })}
          >
            + Add New EMI Plan
          </button>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            {...register("showOnHome")}
          />
          <span className="label-text font-medium">Show on Home Page</span>
        </label>
        {/* Submit */}
        <button className="btn btn-primary w-full mt-6">Add Loan</button>
      </form>
    </div>
  );
};

export default AddLoan;

const Input = ({ label, register, type = "text", placeholder }) => (
  <div className="form-control w-full">
    {" "}
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <input
      type={type}
      placeholder={placeholder || `Enter ${label}`}
      {...register}
      className="input input-bordered w-full"
    />
  </div>
);

const Textarea = ({ label, register, placeholder }) => (
  <div className="form-control w-full">
    {" "}
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <textarea
      placeholder={placeholder || `Enter ${label}`}
      {...register}
      className="textarea textarea-bordered w-full h-24" // Added height
    />
  </div>
);
