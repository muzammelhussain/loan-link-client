import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoanCard from "./LoanCard";
import useAxios from "../../hooks/useAxios"; // your custom axios hook

const AllLoansPage = () => {
  const axiosInstance = useAxios();

  // Fetch loans with React Query
  const {
    data: loans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/loans");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading loans...</p>;
  if (isError) return <p>Failed to load loans. Please try again.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Loans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default AllLoansPage;
