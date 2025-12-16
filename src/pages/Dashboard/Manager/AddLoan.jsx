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

  // {
  //     "Loan Title": "Property Renovation Loan",
  //     "Description": "Fund your home improvements and upgrades with flexible tenures.",
  //     "Category": "Home Loan",
  //     "Interest Rate": "8.0%",
  //     "Max Loan Limit": 60000,
  //     "Required Documents": [
  //       "Architect's Plan/Estimate",
  //       "Existing Property Documents",
  //       "KYC of Applicant"
  //     ],
  //     "EMI Plans": [
  //       { "duration": "5 Years", "rate": "8.0%" },
  //       { "duration": "7 Years", "rate": "8.25%" }
  //     ],
  //     "Images Upload": ["https://i.ibb.co.com/Z1Tk7NYZ/images9.jpg"],
  //     "Show on Home toggle": true
  //   },

  const onSubmit = async (data) => {
    const loanData = {
      title: data.title,
      description: data.description,
      category: data.category,
      interestRate: Number(data.interestRate),
      maxAmount: Number(data.maxAmount),
      requiredDocuments: data.requiredDocuments,
      images: data.image,
      emiPlans: data.emiPlans.map((plan) => ({
        duration: plan.duration,
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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Loan</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        {/* Interest Rate & Max Amount */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Interest Rate (%)"
            type="number"
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
          label="Required Documents"
          placeholder="NID, Bank Statement, Salary Slip"
          register={register("requiredDocuments")}
        />

        {/* Image */}
        <Input label="Image URL" register={register("image")} />

        {/* EMI Plans */}
        <div>
          <h3 className="font-bold mb-2">EMI Plans</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-2 mb-2">
              <input
                className="input input-bordered"
                placeholder="Duration (12 Months)"
                {...register(`emiPlans.${index}.duration`, { required: true })}
              />
              <input
                type=""
                className="input input-bordered"
                placeholder="Rate (%)"
                {...register(`emiPlans.${index}.rate`, { required: true })}
              />
              <button
                type="button"
                className="btn btn-error btn-sm col-span-2"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => append({ duration: "", rate: "" })}
          >
            + Add EMI Plan
          </button>
        </div>

        {/* Show on Home */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            {...register("showOnHome")}
          />
          <span>Show on Home</span>
        </label>

        {/* Submit */}
        <button className="btn btn-primary w-full">Add Loan</button>
      </form>
    </div>
  );
};

export default AddLoan;
/* Reusable Inputs */
const Input = ({ label, register, type = "text", placeholder }) => (
  <div className="form-control">
    <label className="label">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      {...register}
      className="input input-bordered"
    />
  </div>
);

const Textarea = ({ label, register, placeholder }) => (
  <div className="form-control">
    <label className="label">{label}</label>
    <textarea
      placeholder={placeholder}
      {...register}
      className="textarea textarea-bordered"
    />
  </div>
);
