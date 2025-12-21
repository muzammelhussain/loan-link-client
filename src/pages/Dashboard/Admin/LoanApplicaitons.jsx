import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const LoanApplications = () => {
  const axiosInstance = useAxios();
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["loanApplications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/loan-applications");
      return res.data;
    },
  });
  console.log(applications);
  const filteredApplications =
    statusFilter === "All"
      ? applications
      : applications.filter((app) => app.status === statusFilter);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Loan Applications</h2>

      {/* Filter */}
      <select
        className="select select-bordered mb-4"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>User</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id}>
                <td>{app._id}</td>
                <td>
                  <p className="font-semibold">{app.firstName}</p>
                  <p className="text-sm text-gray-500">{app.userEmail}</p>
                </td>
                <td>{app.loanTitle}</td>
                <td>${app.loanAmount}</td>
                <td>
                  <span
                    className={`badge 
                    ${app.status === "Pending" && "badge-warning"}
                    ${app.status === "Approved" && "badge-success"}
                    ${app.status === "Rejected" && "badge-error"}
                  `}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedLoan(app)}
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
            <h3 className="font-bold text-lg mb-2">Loan Application Details</h3>

            <p>
              <strong>User:</strong> {selectedLoan.firstName}
            </p>
            <p>
              <strong>Email:</strong> {selectedLoan.userEmail}
            </p>
            <p>
              <strong>Category:</strong> {selectedLoan.loanTitle}
            </p>
            <p>
              <strong>Amount:</strong>
              {selectedLoan.loanAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedLoan.status}
            </p>
            <p>
              <strong>Address:</strong> {selectedLoan.address}
            </p>
            <p>
              <strong>Contact:</strong> {selectedLoan.contactNumber}
            </p>
            <p>
              <strong>Fee-Status:</strong> {selectedLoan.applicationFeeStatus}
            </p>
            <p>
              <strong>Reason:</strong> {selectedLoan.reason}
            </p>
            <p>
              <strong>Monthly-income:</strong> {selectedLoan.monthlyIncome}
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

export default LoanApplications;
