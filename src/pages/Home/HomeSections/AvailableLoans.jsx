import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import LoanCardSkeleton from "./LoanCardSkeleton";

const AvailableLoans = ({ loans, isLoading }) => {
  return (
    <section className="py-20 px-4 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Available Loan Plans
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <LoanCardSkeleton key={i} />
              ))
            : loans.map((loan) => (
                <motion.div
                  key={loan._id}
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
                    <h3 className="text-lg font-semibold mb-1 text-amber-600">
                      {loan.title}
                    </h3>

                    <p className="text-sm opacity-80 mb-4 line-clamp-2">
                      {loan.description}
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

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link to={`/loans/${loan._id}`}>
                        <button className="btn bg-gradient-to-r from-blue-500 to-cyan-400
 w-full rounded-lg">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableLoans;
