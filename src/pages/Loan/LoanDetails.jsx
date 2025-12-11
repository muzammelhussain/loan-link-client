import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const LoanDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user, role } = useAuth();
  const navigate = useNavigate();

  // Fetch single loan
  const { data: loan, isLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/loans/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <h2 className="text-center py-20">Loading...</h2>;

  const {
    image,
    title,
    description,
    category,
    interestRate,
    maxAmount,
    emiPlans,
  } = loan;

  // Apply button logic
  const isBlockedRole = role === "manager" || role === "admin";

  const handleApply = () => {
    navigate(`/apply-loan/${id}`, { state: loan });
  };

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        className="grid md:grid-cols-2 gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Image */}
        <img src={image} className="rounded-lg shadow-md" alt={title} />

        {/* Info */}
        <div>
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text-gray-600 mt-4">{description}</p>

          <div className="mt-6 space-y-2">
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>Interest Rate:</strong> {interestRate}%
            </p>
            <p>
              <strong>Max Limit:</strong> ${maxAmount}
            </p>
          </div>

          {/* EMI Plans */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Available EMI Plans</h3>
            <ul className="mt-2 list-disc ml-6 text-gray-700">
              {emiPlans?.map((emi, i) => (
                <li key={i}>{emi} Months</li>
              ))}
            </ul>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            disabled={!user || isBlockedRole}
            className={`mt-8 px-6 py-3 rounded-md font-semibold text-white 
              ${
                !user || isBlockedRole
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {user
              ? isBlockedRole
                ? "Managers/Admins Cannot Apply"
                : "Apply Now"
              : "Login to Apply"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanDetails;
