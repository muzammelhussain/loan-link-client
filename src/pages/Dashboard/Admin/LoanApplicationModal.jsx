import React from "react";
import { motion } from "framer-motion";

// Define Framer Motion variants for the backdrop and the modal itself
const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { delay: 0.1, type: "spring", stiffness: 120 },
  },
  exit: { y: "100vh", opacity: 0 }, // Animation for closing/exit
};

const LoanApplicationModal = ({ selectedLoan, onClose }) => {
  if (!selectedLoan) return null;

  // Function to determine badge style based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to determine fee status badge style
  const getFeeStatusBadge = (status) => {
    return status === "Paid"
      ? "bg-blue-100 text-blue-800"
      : "bg-red-100 text-red-800";
  };

  // Simplified way to access loan data
  const {
    firstName,
    userEmail,
    loanTitle, // Assuming this is the Category/Title of the loan applied for
    loanAmount,
    status,
    address,
    contactNumber,
    applicationFeeStatus,
    reason,
    monthlyIncome,
  } = selectedLoan;

  return (
    // Backdrop with Fade Animation
    <motion.div
      className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-75 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose} // Allows closing by clicking outside
    >
      {/* Modal Box with Spring Animation */}
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
            Application Details
          </h3>

          <div className="space-y-3 text-gray-700">
            {/* User and Email */}
            <DetailRow label="User" value={firstName} />
            <DetailRow label="Email" value={userEmail} />

            {/* Loan Title & Amount */}
            <DetailRow label="Loan Category" value={loanTitle} />
            <DetailRow label="Amount" value={`৳ ${loanAmount}`} isBold={true} />

            {/* Statuses (Badges) */}
            <div className="flex justify-between items-center pt-2 border-t mt-4">
              <strong className="text-sm font-medium">Status:</strong>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(
                  status
                )} transition duration-200`}
              >
                {status || "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <strong className="text-sm font-medium">Fee Status:</strong>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${getFeeStatusBadge(
                  applicationFeeStatus
                )} transition duration-200`}
              >
                {applicationFeeStatus || "N/A"}
              </span>
            </div>

            {/* Contact and Address */}
            <DetailRow label="Monthly Income" value={`৳ ${monthlyIncome}`} />
            <DetailRow label="Contact" value={contactNumber} />
            <DetailRow label="Address" value={address} />

            {/* Reason (Multi-line field) */}
            <div className="pt-2">
              <strong className="block text-sm font-medium mb-1">
                Reason:
              </strong>
              <p className="p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap border border-gray-200">
                {reason || "No reason provided."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper component for cleaner detail rows
const DetailRow = ({ label, value, isBold = false }) => (
  <p className="flex justify-between border-b border-gray-100 pb-2">
    <strong className="text-sm font-medium">{label}:</strong>
    <span className={isBold ? "font-bold" : "text-sm"}>{value || "N/A"}</span>
  </p>
);

export default LoanApplicationModal;
