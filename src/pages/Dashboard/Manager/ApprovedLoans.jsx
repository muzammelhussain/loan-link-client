import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const ApprovedLoans = () => {
  const axiosInstance = useAxios();
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["approvedLoans"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/manager/loan-applications/approved"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading approved loans...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Loan Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Approved Date</th>
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

                <td>৳ {loan.loanAmount}</td>

                <td>
                  {loan.approvedAt
                    ? new Date(loan.approvedAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
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
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-3">Approved Loan Details</h3>

            <div className="space-y-1 text-sm">
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
                <strong>Approved At:</strong>{" "}
                {new Date(selectedLoan.approvedAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedLoan.status}
              </p>
            </div>

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

export default ApprovedLoans;
