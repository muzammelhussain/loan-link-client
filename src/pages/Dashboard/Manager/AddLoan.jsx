import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
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
    const documentsArray = data.requiredDocuments
      ? data.requiredDocuments
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean)
      : [];

    const loanData = {
      ...data,
      interestRate: Number(data.interestRate),
      maxAmount: Number(data.maxAmount),
      requiredDocuments: documentsArray,
      images: data.image,
      emiPlans: data.emiPlans.map((p) => ({
        duration: p.duration,
        rate: Number(p.rate),
      })),
      createdAt: new Date(),
    };

    try {
      await axiosInstance.post("/manager/loans", loanData);
      toast.success("Loan added successfully 🎉");
      reset();
    } catch {
      toast.error("Failed to add loan");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-6"
    >
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10 text-white">
        <h2 className="text-3xl font-extrabold mb-8 text-center">
          Add New Loan
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatedInput label="Loan Title" register={register("title")} />
          <AnimatedTextarea label="Description" register={register("description")} />
          <AnimatedInput label="Category" register={register("category")} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedInput
              label="Interest Rate (%)"
              register={register("interestRate")}
            />
            <AnimatedInput
              label="Max Loan Amount"
              type="number"
              register={register("maxAmount")}
            />
          </div>

          <AnimatedTextarea
            label="Required Documents"
            placeholder="NID, Bank Statement, Salary Slip"
            register={register("requiredDocuments")}
          />

          <AnimatedInput label="Image URL" register={register("image")} />

          {/* EMI PLANS */}
          <div>
            <h3 className="font-bold text-lg mb-3">EMI Plans</h3>

            <AnimatePresence>
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-4 rounded-xl bg-white/10 border border-white/20"
                >
                  <input
                    className="input input-bordered bg-transparent text-white"
                    placeholder="Duration (12 Months)"
                    {...register(`emiPlans.${index}.duration`)}
                  />
                  <input
                    className="input input-bordered bg-transparent text-white"
                    placeholder="Rate (%)"
                    {...register(`emiPlans.${index}.rate`)}
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn btn-error btn-sm col-span-full"
                  >
                    Remove Plan
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => append({ duration: "", rate: "" })}
              className="btn btn-outline btn-sm text-white border-white"
            >
              + Add EMI Plan
            </button>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-info"
              {...register("showOnHome")}
            />
            <span className="font-medium">Show on Home Page</span>
          </label>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xl"
          >
            Add Loan
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

const AnimatedInput = ({ label, register, type = "text", placeholder }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      placeholder={placeholder || label}
      {...register}
      className="input input-bordered w-full mt-1 bg-transparent text-white focus:ring-2 focus:ring-blue-400"
    />
  </motion.div>
);

const AnimatedTextarea = ({ label, register, placeholder }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <label className="text-sm font-medium">{label}</label>
    <textarea
      placeholder={placeholder || label}
      {...register}
      className="textarea textarea-bordered w-full mt-1 h-24 bg-transparent text-white focus:ring-2 focus:ring-blue-400"
    />
  </motion.div>
);


export default AddLoan;
