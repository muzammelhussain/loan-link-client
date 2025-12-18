import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoanCard from "./LoanCard";
import useAxios from "../../hooks/useAxios";

const AllLoansPage = () => {
  const axiosInstance = useAxios();
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["available-loans", page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/loans?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading loans...</p>;
  if (isError) return <p>Failed to load loans</p>;

  const loans = data?.loans || [];
  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Loans</h2>

      {/* Loan Grid */}
      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No loans found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="btn btn-outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>

        <span className="px-4 py-2 font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllLoansPage;
