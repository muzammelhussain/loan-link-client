import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const PendingLoans = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Fetch Pending Loans
  const { data: loans = [], refetch } = useQuery({
    queryKey: ["pendingLoans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/manager/loan-applications/pending");
      return res.data;
    },
  });
  //console.log(loans);
  // Approve
  const approveMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.patch(`/manager/loan-applications/${id}/approve`),
    onSuccess: () => {
      toast.success("Loan Approved");
      queryClient.invalidateQueries(["pendingLoans"]);
      refetch();
    },
  });

  // Reject
  const rejectMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.patch(`/manager/loan-applications/${id}/reject`),
    onSuccess: () => {
      toast.success("Loan Rejected");
      queryClient.invalidateQueries(["pendingLoans"]);
      refetch();
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Loan Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan._id}</td>

                <td>
                  <p className="font-semibold">{loan.firstName}</p>
                  <p className="text-sm text-gray-500">{loan.userEmail}</p>
                </td>

                <td>{loan.loanAmount}</td>
                <td>{loan.status}</td>
                <td>{new Date(loan.appliedAt).toLocaleDateString()}</td>

                <td className="space-x-1">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => approveMutation.mutate(loan._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => rejectMutation.mutate(loan._id)}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => setSelectedLoan(loan)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedLoan && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Loan Details</h3>

            <p>
              <strong>Name:</strong> {selectedLoan.firstName}
            </p>
            <p>
              <strong>Email:</strong> {selectedLoan.userEmail}
            </p>
            <p>
              <strong>Amount:</strong> ৳ {selectedLoan.loanAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedLoan.status}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedLoan.appliedAt).toLocaleString()}
            </p>
            <p>
              <strong>Income-Source:</strong> {selectedLoan.incomeSource}
            </p>
            <p>
              <strong>Address:</strong> {selectedLoan.address}
            </p>
            <p>
              <strong>Fee-Status:</strong> {selectedLoan.applicationFeeStatus}
            </p>
            <p>
              <strong>Contact-number:</strong> {selectedLoan.contactNumber}
            </p>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedLoan(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingLoans;
