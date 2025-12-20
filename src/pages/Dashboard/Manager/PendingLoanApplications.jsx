import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PendingLoans = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["pendingLoans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/manager/loan-applications/pending");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.patch(`/manager/loan-applications/${id}/approve`),
    onSuccess: () => {
      toast.success("Loan Approved");
      queryClient.invalidateQueries(["pendingLoans"]);
    },
    onError: () => {
      toast.error("Failed to approve loan.");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.patch(`/manager/loan-applications/${id}/reject`),
    onSuccess: () => {
      toast.success("Loan Rejected");
      queryClient.invalidateQueries(["pendingLoans"]);
    },
    onError: () => {
      toast.error("Failed to reject loan.");
    },
  });

  const handleApprove = (loanId, loanTitle) => {
    Swal.fire({
      title: "Confirm Approval",
      html: `Are you sure you want to <strong>APPROVE</strong> the application for <strong>${loanTitle}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Approve it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(loanId);
      }
    });
  };

  const handleReject = (loanId, loanTitle) => {
    Swal.fire({
      title: "Confirm Rejection",
      html: `Are you sure you want to <strong>REJECT</strong> the application for <strong>${loanTitle}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Reject it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(loanId);
      }
    });
  };

  if (isLoading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Pending Loan Applications ({loans.length})
      </h2>

      {loans.length === 0 ? (
        <div className="text-center p-10 border rounded-lg bg-base-100">
          <p className="text-lg text-gray-500">
            🎉 No pending loan applications found!
          </p>
          <p className="text-sm mt-1 text-gray-400">
            All caught up. Check back later.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table w-full table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th className="py-3 text-sm">Loan ID</th>
                <th className="py-3 text-sm">Applicant</th>
                <th className="py-3 text-sm">Amount</th>
                <th className="py-3 text-sm">Status</th>
                <th className="py-3 text-sm">Date</th>
                <th className="py-3 text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td className="text-xs sm:text-sm py-2">
                    {loan._id.substring(0, 8)}...
                  </td>

                  <td className="py-2">
                    <p className="font-semibold text-sm">{loan.firstName}</p>
                    <p className="text-xs text-gray-500">{loan.userEmail}</p>
                  </td>

                  <td className="font-bold text-sm py-2">
                    ৳ {loan.loanAmount}
                  </td>
                  <td className="text-sm py-2">
                    <span className="badge badge-warning badge-sm text-xs font-semibold">
                      {loan.status}
                    </span>
                  </td>
                  <td className="text-xs sm:text-sm py-2">
                    {new Date(loan.appliedAt).toLocaleDateString()}
                  </td>

                  <td className="space-x-1 py-2 whitespace-nowrap">
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleApprove(loan._id, loan.firstName)}
                      disabled={approveMutation.isLoading}
                    >
                      {approveMutation.isLoading ? "..." : "Approve"}
                    </button>

                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleReject(loan._id, loan.firstName)}
                      disabled={rejectMutation.isLoading}
                    >
                      {rejectMutation.isLoading ? "..." : "Reject"}
                    </button>

                    <button
                      className="btn btn-xs btn-outline btn-primary"
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
      )}

      {selectedLoan && (
        <dialog open className="modal modal-middle sm:modal-bottom">
          <div className="modal-box w-11/12 max-w-lg">
            <h3 className="font-bold text-xl mb-4 text-primary">
              Loan Application Details
            </h3>

            <div className="space-y-2">
              <p>
                <strong>Loan ID:</strong>{" "}
                <span className="text-sm text-gray-600">
                  {selectedLoan._id}
                </span>
              </p>
              <p>
                <strong>Name:</strong> {selectedLoan.firstName}
              </p>
              <p>
                <strong>Email:</strong> {selectedLoan.userEmail}
              </p>
              <p>
                <strong>Contact:</strong> {selectedLoan.contactNumber}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                <span className="font-bold text-lg text-error">
                  ৳ {selectedLoan.loanAmount}
                </span>
              </p>
              <p>
                <strong>Applied At:</strong>{" "}
                {new Date(selectedLoan.appliedAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="badge badge-warning">
                  {selectedLoan.status}
                </span>
              </p>
              <p>
                <strong>Fee Status:</strong>{" "}
                <span
                  className={`badge ${
                    selectedLoan.applicationFeeStatus === "Paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {selectedLoan.applicationFeeStatus}
                </span>
              </p>
              <p>
                <strong>Income Source:</strong> {selectedLoan.incomeSource}
              </p>
              <p>
                <strong>Address:</strong> {selectedLoan.address}
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setSelectedLoan(null)}
              >
                ✕
              </button>
              <button
                className="btn btn-primary w-full sm:w-auto"
                onClick={() => setSelectedLoan(null)}
              >
                Close
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedLoan(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default PendingLoans;
