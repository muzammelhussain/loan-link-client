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
  console.log(filteredLoans);
  if (isLoading) {
    return <p className="text-center mt-10">Loading loans...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Loans</h2>

      {/* Search */}
      <input
        className="input input-bordered mb-4 w-full max-w-md"
        placeholder="Search by title or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan._id}>
                <td>
                  <img
                    src={loan.images}
                    alt={loan.title}
                    className="w-16 h-12 rounded object-cover"
                  />
                </td>

                <td className="font-semibold">{loan.title}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.category}</td>

                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setSelectedLoan(loan)}
                  >
                    Update
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
      </div>

      {selectedLoan && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-4">Edit Loan</h3>

            <LoanEditFormManager
              loan={selectedLoan}
              closeModal={() => setSelectedLoan(null)}
              refetch={refetch}
            />
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedLoan(null)}>close</button>
          </form>
        </dialog>
      )}

      {/* Delete Confirmation Modal */}
      {deleteLoan && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Loan</h3>

            <p className="mt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteLoan.title}</span>?
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
                onClick={() => deleteMutation.mutate(deleteLoan._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageLoans;
