import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { DollarSign, Clock, Tag, CreditCard, FileText } from "lucide-react";

const LoanDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  // Fetch loan details
  const { data: loan, isLoading: isLoanLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/loans/${id}`);
      return res.data;
    },
  });

  if (loading || isLoanLoading) {
    return (
      <h2 className="text-center py-20 text-2xl font-semibold text-gray-700">
        Loading Loan Details...
      </h2>
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
  const handleApply = () => {
    navigate(`/apply-loan/${id}`, { state: loan });
  };

  const PrimaryColor = "bg-indigo-600 hover:bg-indigo-700";
  const DisabledColor = "bg-gray-300 cursor-not-allowed";

  const keyFeatures = [
    {
      icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
      title: "Category",
      value: loan["Category"],
    },
    {
      icon: <DollarSign className="w-6 h-6 text-indigo-600" />,
      title: "Interest Rate",
      value: loan["Interest Rate"],
    },
    {
      icon: <Tag className="w-6 h-6 text-indigo-600" />,
      // Note: Accessing "Max Loan Limit" based on your provided JSON structure
      value: `$${loan["Max Loan Limit"]}`,
      title: "Max Limit",
    },
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto min-h-screen bg-gray-50">
      <motion.div
        className="bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid lg:grid-cols-3">
          <div className="lg:col-span-1 bg-gray-100 p-4">
            <img
              src={loan["Images Upload"]?.[0]}
              className="w-full h-96 object-cover rounded-lg shadow-xl transform hover:scale-[1.01] transition duration-300"
              alt={loan["Loan Title"]}
            />
          </div>

          <div className="lg:col-span-2 p-8 md:p-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 border-b pb-3">
              {loan["Loan Title"]}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {keyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg"
                >
                  {feature.icon}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {feature.title}
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {feature.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Loan Overview
              </h3>
              <p className="text-gray-600 leading-relaxed border-l-4 border-indigo-200 bg-indigo-50 pl-4 py-3">
                {loan["Description"]}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                <span>Required Documents</span>
              </h3>
              <ul className="list-none space-y-2">
                {loan["Required Documents"]?.map((doc, i) => (
                  <li
                    key={i}
                    className="flex items-start text-gray-700 bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
                  >
                    <span className="text-indigo-600 mr-3 mt-1">•</span> {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                <span>Flexible EMI Plans & Rates</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {loan["EMI Plans"]?.map((plan, i) => (
                  <div
                    key={i}
                    className="bg-white border border-indigo-200 rounded-lg p-4 shadow-md 
                   transition duration-300 hover:shadow-lg hover:border-indigo-400"
                  >
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Duration
                    </p>
                    <p className="text-xl font-bold text-indigo-700">
                      {plan.duration}
                    </p>

                    <div className="h-px bg-gray-200 my-2"></div>

                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Interest Rate
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {plan.rate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-100 border-t flex justify-end">
          <button
            onClick={handleApply}
            disabled={!user || isBlockedRole}
            className={`px-10 py-4 rounded-xl text-lg font-bold transition duration-300 transform hover:scale-[1.02] shadow-lg ${
              !user || isBlockedRole ? DisabledColor : PrimaryColor
            } text-white`}
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
