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

  const loans = data?.loans || [];
  const totalItems = data?.total ?? 0;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg text-primary"></span>
        <p className="ml-4 text-lg text-gray-600">Loading loans...</p>
      </div>
    );

  if (isError)
    return (
      <div className="text-center p-10 bg-error/10 border border-error rounded-lg m-6">
        <p className="text-error font-semibold text-lg">
          Failed to load loans. Please check your network connection.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h2 className="text-3xl font-extrabold text-center mb-8">
        Explore All Available Loans
      </h2>

      {loans.length === 0 ? (
        <div className="p-10 text-center bg-base-200 rounded-lg shadow-inner">
          <p className="text-xl text-gray-500 font-medium">
            Currently, there are no loans available.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Please check back later for new offerings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
          <button
            className="btn btn-outline btn-primary btn-md"
            disabled={page === 1 || isLoading}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Previous
          </button>

          <span className="px-4 py-2 font-semibold text-lg bg-base-200 rounded-lg min-w-[100px] text-center">
            Page {page} of {totalPages}
          </span>

          <div className="join hidden sm:flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p >= page - 1 && p <= page + 1 && p !== page)
              .map((p) => (
                <button
                  key={p}
                  className={`join-item btn btn-md ${
                    p === page ? "btn-disabled bg-primary text-white" : ""
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
          </div>

          <button
            className="btn btn-outline btn-primary btn-md"
            disabled={page === totalPages || isLoading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default AllLoansPage;
