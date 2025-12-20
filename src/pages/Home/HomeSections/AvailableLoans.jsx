import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AvailableLoans = ({ loans }) => {
  return (
    <section className="py-20 px-4 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Available Loan Plans
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.map((loan) => (
            <motion.div
              key={loan._id}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="card bg-base-200 shadow-lg"
            >
              {/* Image */}
              <figure>
                <img
                  src={loan.images}
                  alt={loan.title}
                  className="h-48 w-full object-cover"
                />
              </figure>

              {/* Content */}
              <div className="card-body">
                <h3 className="card-title">{loan.title}</h3>

                <div className="space-y-1 text-sm opacity-80">
                  <p>
                    <strong>Max Limit:</strong> ${loan.maxAmount}
                  </p>
                  <p>
                    <strong>Interest:</strong> {loan.interestRate}%
                  </p>
                  <p>
                    <strong>Category:</strong> {loan.category}
                  </p>
                </div>

                <div className="card-actions mt-4">
                  <Link to={`/loans/${loan._id}`} className="w-full">
                    <button className="btn btn-primary w-full">
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
