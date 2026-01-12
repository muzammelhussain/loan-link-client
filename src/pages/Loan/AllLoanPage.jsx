import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import LoanCard from "./LoanCard";
import LoanCardSkeleton from "./LoanCardSkeleton";

const AllLoansPage = () => {
  const axiosInstance = useAxios();

  const [page, setPage] = useState(1);
  const limit = 8;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["loans", page, search, category],
    queryFn: async () => {
      const res = await axiosInstance.get("/loans/page", {
        params: {
          page,
          limit,
          search,
          category,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const loans = data?.loans || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  if (isError) {
    return <p className="text-center text-red-500">Failed to load loans</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Explore All Available Loans
      </h2>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          className="input input-bordered"
          placeholder="Search by title"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
  className="select select-bordered"
  value={category}
  onChange={(e) => {
    setPage(1);
    setCategory(e.target.value);
  }}
>
  <option value="">All Categories</option>
  <option value="Agricultural Loan">Agricultural Loan</option>
  <option value="Personal Loan">Personal Loan</option>
  <option value="Business Loan">Business Loan</option>
  <option value="Education Loan">Education Loan</option>
</select>

      </div>

      {/* 📦 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: limit }).map((_, i) => (
              <LoanCardSkeleton key={i} />
            ))
          : loans.map((loan) => (
              <LoanCard key={loan._id} loan={loan} />
            ))}
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10">
          <button
            className="btn btn-outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllLoansPage;
