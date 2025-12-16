import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AvailableLoans = ({ loans }) => {
  console.log(loans);
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Available Loan Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loans.map((loan) => (
            <motion.div
              key={loan._id}
              className="shadow-md p-6 rounded-lg bg-gray-50"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={loan.images}
                alt={loan.title}
                className="rounded-md mb-4 h-40 w-full object-cover"
              />

              <h3 className="text-xl font-semibold">{loan.title}</h3>

              {/* <p className="text-gray-600 mt-2">{loan.description}</p> */}

              <p className="mt-3 font-bold">Max Limit: ${loan.maxAmount}</p>

              <p className="text-sm text-gray-700 mt-1">
                Interest Rate: {loan.interestRate}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Category: {loan.category}
              </p>

              <Link to={`/loans/${loan._id}`}>
                <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Details
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableLoans;
