import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import LoanEditFormManager from "../Manager/LoanEditFormManager";

const ManageLoans = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [deleteLoan, setDeleteLoan] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Fetch loans
  const {
    data: loans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["managerLoans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/manager/loans");
      return res.data;
    },
  });

  // Delete loan
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/manager/loans/${id}`),
    onSuccess: () => {
      toast.success("Loan deleted");
      queryClient.invalidateQueries(["managerLoans"]);
      setDeleteLoan(null);
    },
  });

  // Search filter
  const filteredLoans = loans.filter(
    (loan) =>
      loan.title.toLowerCase().includes(search.toLowerCase()) ||
      loan.category.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  // Handle delete confirmation
  const handleDelete = () => {
    if (deleteLoan) {
      deleteMutation.mutate(deleteLoan._id);
    }
  };

  return (
    // Adjust padding for better mobile fit
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Manage Loans</h2>

      {/* Search - Centered on small screens, full width up to max-w-md */}
      <div className="flex justify-center sm:justify-start">
        <input
          className="input input-bordered mb-6 w-full max-w-md"
          placeholder="Search by title or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table - Crucial for mobile scrolling */}
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th className="py-3 text-sm">Image</th>
              <th className="py-3 text-sm">Title</th>
              <th className="py-3 text-sm">Interest</th>
              <th className="py-3 text-sm">Category</th>
              <th className="py-3 text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan._id}>
                <td className="py-2">
                  <img
                    src={loan.images}
                    alt={loan.title}
                    className="w-16 h-12 rounded object-cover"
                  />
                </td>

                <td className="font-semibold text-sm py-2">{loan.title}</td>
                <td className="text-sm py-2">{loan.interestRate}%</td>
                <td className="text-sm py-2">{loan.category}</td>

                <td className="space-x-1 py-2 whitespace-nowrap">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setSelectedLoan(loan)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => setDeleteLoan(loan)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLoans.length === 0 && (
          <div className="text-center p-6 text-gray-500 bg-base-200">
            No loans found matching your search.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedLoan && (
        <dialog open className="modal modal-middle sm:modal-bottom">
          {" "}
          {/* Adjusted modal position for mobile */}
          <div className="modal-box max-w-full sm:max-w-2xl">
            <h3 className="font-bold text-xl mb-4">
              Edit Loan: {selectedLoan.title}
            </h3>

            <LoanEditFormManager
              loan={selectedLoan}
              closeModal={() => setSelectedLoan(null)}
              refetch={refetch}
            />

            <div className="modal-action mt-4">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setSelectedLoan(null)}
              >
                ✕
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedLoan(null)}>close</button>
          </form>
        </dialog>
      )}

      {/* Delete Confirmation Modal */}
      {deleteLoan && (
        <dialog open className="modal modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>

            <p className="mt-4">
              Are you absolutely sure you want to delete the loan:{" "}
              <span className="font-semibold">{deleteLoan.title}</span>? This
              action cannot be undone.
            </p>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setDeleteLoan(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error"
                onClick={handleDelete}
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading
                  ? "Deleting..."
                  : "Delete Permanently"}
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setDeleteLoan(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManageLoans;
