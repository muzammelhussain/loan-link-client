import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { motion } from "framer-motion";
import { DollarSign, Clock, Tag, CreditCard, FileText } from "lucide-react";

const LoanDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user, loading } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();

  const { data: loan, isLoading: isLoanLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/loans/${id}`);
      return res.data;
    },
  });

  if (loading || isLoanLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg text-indigo-500"></span>
      </div>
    );
  }

  if (!loan) {
    return (
      <h2 className="text-center py-20 text-red-500 text-2xl">
        Loan details not found.
      </h2>
    );
  }

  const isBlockedRole = role === "manager" || role === "admin";
  const handleApply = () => navigate(`/apply-loan/${id}`, { state: loan });

  const PrimaryButton =
    "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 shadow-lg animate-pulse hover:animate-none";
  const DisabledButton = "bg-gray-300 cursor-not-allowed";

  const keyFeatures = [
    {
      icon: <CreditCard className="w-6 h-6 text-indigo-500" />,
      title: "Category",
      value: loan.category,
    },
    {
      icon: <DollarSign className="w-6 h-6 text-indigo-500" />,
      title: "Interest Rate",
      value: `${loan.interestRate}%`,
    },
    {
      icon: <Tag className="w-6 h-6 text-indigo-500" />,
      title: "Max Limit",
      value: `$${loan.maxAmount}`,
    },
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto min-h-screen bg-base-100">
      <motion.div
        className="bg-base-200 rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Loan Image */}
          <motion.div
            className="lg:col-span-1 p-4 rounded-xl shadow-inner overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={loan.images}
              className="w-full h-96 object-cover rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
              alt={loan.title}
            />
          </motion.div>

          {/* Loan Details */}
          <div className="lg:col-span-2 p-8 md:p-12 space-y-8">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-base-content opacity-90 mb-4 border-b pb-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {loan.title}
            </motion.h1>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {keyFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center p-5 rounded-xl bg-base-100 shadow hover:shadow-lg cursor-pointer transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  {feature.icon}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-base-content opacity-80">
                      {feature.title}
                    </p>
                    <p className="text-xl font-bold text-indigo-600">
                      {feature.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Loan Overview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-base-content opacity-90 mb-3">
                Loan Overview
              </h3>
              <p className="text-base-content opacity-80 leading-relaxed border-l-4 border-indigo-300 pl-4 py-3 bg-base-100 rounded-lg shadow-inner">
                {loan.description}
              </p>
            </motion.div>

            {/* Required Documents */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                Required Documents
              </h3>
              <ul className="space-y-3">
                {(Array.isArray(loan.requiredDocuments)
                  ? loan.requiredDocuments
                  : loan.requiredDocuments?.split(",") || []
                ).map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-start bg-base-100 p-3 rounded-lg shadow hover:shadow-md transition border border-gray-100"
                  >
                    <span className="text-indigo-500 mr-3 mt-1">•</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* EMI Plans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                Flexible EMI Plans & Rates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {loan.emiPlans?.map((plan, i) => (
                  <motion.div
                    key={i}
                    className="bg-base-100 border-indigo-200 rounded-xl p-5 shadow-md hover:shadow-lg transition transform hover:scale-[1.03]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <p className="text-base-content font-medium opacity-80 mb-1">Duration</p>
                    <p className="text-xl font-bold text-indigo-700">{plan.duration}</p>
                    <div className="h-px bg-base-200 my-2"></div>
                    <p className="text-sm font-medium opacity-80 mb-1">Interest Rate</p>
                    <p className="text-lg font-semibold opacity-90">{plan.rate}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Apply Button */}
        <motion.div
          className="p-6 bg-base-200 border-t flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleApply}
            disabled={!user || isBlockedRole}
            className={`px-10 py-4 rounded-2xl text-lg font-bold transition transform hover:scale-[1.02] shadow-lg ${
              !user || isBlockedRole ? DisabledButton : PrimaryButton
            } text-white`}
          >
            {user
              ? isBlockedRole
                ? "Managers/Admins Cannot Apply"
                : "Apply Now"
              : "Login to Apply"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoanDetails;
