import React from "react";
import { useNavigate } from "react-router";

const LoanCard = ({ loan }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/loans/${loan._id}`);
  };

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col">
      <img
        src={loan.images}
        alt={loan.title}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="font-bold text-lg mt-2">{loan.title}</h3>
      <p className="text-gray-500">{loan.category}</p>
      <p className="mt-1">Interest: {loan.interestRate}</p>
      <p>Max Limit: ${loan.maxAmount}</p>
      <button
        onClick={handleViewDetails}
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        View Details
      </button>
    </div>
  );
};

export default LoanCard;
