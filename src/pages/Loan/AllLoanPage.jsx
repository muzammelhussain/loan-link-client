import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoanCard from "./LoanCard";
import LoanCardSkeleton from "./LoanCardSkeleton";
import useAxios from "../../hooks/useAxios";

const AllLoansPage = () => {
  const axiosInstance = useAxios();
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["available-loans", page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/loans?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const loans = data?.loans || [];
  const totalItems = data?.total ?? 0;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  if (isError) {
    return (
      <div className="text-center p-10 text-error">
        Failed to load loans.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Explore All Available Loans
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: limit }).map((_, i) => (
              <LoanCardSkeleton key={i} />
            ))
          : loans.map((loan) => (
              <LoanCard key={loan._id} loan={loan} />
            ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            className="btn btn-outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>

          <span className="font-semibold">
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
      )}
    </div>
  );
};

export default AllLoansPage;
