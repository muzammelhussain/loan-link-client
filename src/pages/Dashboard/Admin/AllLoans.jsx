import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoanEditForm from "./LoanEditForm";

const AllLoans = () => {
  const axiosInstance = useAxios();
  const [deleteLoanId, setDeleteLoanId] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: loans = [], refetch } = useQuery({
    queryKey: ["admin-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/loans");
      return res.data;
    },
  });
  console.log(loans);
  const toggleHome = async (id, value) => {
    try {
      await axiosInstance.patch(`/admin/loans/home/${id}`, {
        showOnHome: value,
      });

      if (value) {
        toast.success("Loan added to Home page");
      } else {
        toast.success("Loan removed from Home page");
      }

      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Home visibility");
    }
  };

  const deleteLoan = async () => {
    if (!deleteLoanId) return;

    try {
      await axiosInstance.delete(`/admin/loans/${deleteLoanId}`);
      toast.success("Loan deleted successfully");
      setDeleteLoanId(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete loan");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Loans</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>
                  <img src={loan.images} className="w-14 rounded" />
                </td>
                <td>{loan.title}</td>
                <td>{loan.interestRate}</td>
                <td>{loan.category}</td>
                <td>{new Date(loan.date).toLocaleDateString()}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={loan.showOnHome === true}
                    onChange={(e) => toggleHome(loan._id, e.target.checked)}
                  />
                </td>

                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setSelectedLoan(loan)}
                  >
                    Update
                  </button>

                  <button
                    onClick={() => setDeleteLoanId(loan._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteLoanId && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">
              Confirm Loan Deletion
            </h3>
            <p className="py-4">
              Are you sure you want to delete this loan?
              <br />
              <span className="text-sm text-gray-500">
                This action cannot be undone.
              </span>
            </p>

            <div className="modal-action">
              <button
                onClick={() => setDeleteLoanId(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button onClick={deleteLoan} className="btn btn-error">
                Yes, Delete
              </button>
            </div>
          </div>
        </dialog>
      )}

      {selectedLoan && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-4">Edit Loan</h3>

            <LoanEditForm
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
    </div>
  );
};

export default AllLoans;
