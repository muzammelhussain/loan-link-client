import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const LoanCard = ({ loan }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-base-200 rounded-lg shadow-md flex flex-col overflow-hidden h-full"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={loan.images}
          alt={loan.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">
          {loan.title}
        </h3>

        {/* Description */}
        <p className="text-sm opacity-80 mb-4 line-clamp-2">
          {loan.description || "No description available."}
        </p>

        {/* Meta Info */}
        <div className="text-sm space-y-1 opacity-85 mb-4">
          <p>
            <strong>Max Amount:</strong> ${loan.maxAmount}
          </p>
          <p>
            <strong>Interest:</strong> {loan.interestRate}%
          </p>
          <p>
            <strong>Category:</strong> {loan.category}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <button
            onClick={() => navigate(`/loans/${loan._id}`)}
            className="btn btn-primary w-full rounded-xl"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoanCard;
