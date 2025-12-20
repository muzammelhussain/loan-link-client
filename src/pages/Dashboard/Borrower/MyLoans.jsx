import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyLoans = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure;

  const [cancelId, setCancelId] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [payingId, setPayingId] = useState(null);

  const {
    data: loans = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myLoans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/loanApplications/user/${user.email}`
      );
      return res.data;
    },
  });

  // Cancel Loan
  const confirmCancel = async () => {
    try {
      await axiosInstance.delete(`/loanApplications/${cancelId}`);
      toast.success("Loan application canceled");
      refetch();
    } catch {
      toast.error("Cannot cancel loan");
    } finally {
      setCancelId(null);
    }
  };

  //  Stripe Payment
  const handlePay = async (loan) => {
    setPayingId(loan._id);
    const paymentInfo = {
      loanId: loan._id,
      email: user.email,
      loanTitle: loan.title,
    };
    try {
      const res = await axiosInstance.post(
        "/payment-checkout-session",
        paymentInfo
      );
      console.log(res.data.url);
      window.location.assign(res.data.url);
    } catch {
      toast.error("Payment failed");
      setPayingId(null);
    }
  };

  if (isLoading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  return (
    <div className="bg-base-100 rounded-xl shadow p-6">
      <h2 className="text-3xl font-bold mb-6">My Loans</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Loan ID</th>
              <th>Loan Info</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td className="text-xs">{loan._id}</td>

                <td>
                  <p className="font-semibold">{loan.loanTitle}</p>
                  <p className="text-sm text-gray-500">
                    Interest: {loan.interestRate}%
                  </p>
                </td>

                <td>${loan.loanAmount}</td>

                <td>
                  <span
                    className={`badge ${
                      loan.status === "Pending"
                        ? "badge-warning"
                        : loan.status === "Approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>

                <td className="space-x-2">
                  {/* View */}
                  <Link
                    to={`/loans/${loan.loanId}`}
                    className="btn btn-xs btn-info"
                  >
                    View
                  </Link>

                  {/* Cancel */}
                  {loan.status === "Pending" && (
                    <button
                      onClick={() => setCancelId(loan._id)}
                      className="btn btn-xs btn-error"
                    >
                      Cancel
                    </button>
                  )}

                  {/* Pay / Paid */}
                  {loan.applicationFeeStatus === "Unpaid" ? (
                    <button
                      onClick={() => handlePay(loan)}
                      disabled={payingId === loan._id}
                      className="btn btn-xs btn-success"
                    >
                      {payingId === loan._id ? "Processing..." : "Pay $10"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setPaymentInfo(loan)}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {loans.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No loan applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*  Cancel Modal */}
      {cancelId && (
        <Modal
          title="Cancel Loan?"
          onClose={() => setCancelId(null)}
          onConfirm={confirmCancel}
        >
          Are you sure you want to cancel this loan application?
        </Modal>
      )}

      {/* 💳 Payment Details Modal */}
      {paymentInfo && (
        <Modal title="Payment Details" onClose={() => setPaymentInfo(null)}>
          <p>
            <strong>Email:</strong> {paymentInfo.userEmail}
          </p>
          <p>
            <strong>Loan ID:</strong> {paymentInfo.loanId}
          </p>
          <p>
            <strong>Transaction ID:</strong> {paymentInfo.transactionId}
          </p>
          <p>
            <strong>Amount:</strong> $10
          </p>
        </Modal>
      )}
      <button className="btn btn-primary mt-5">
        <NavLink to="/all-loan-page">Add Loans</NavLink>
      </button>
    </div>
  );
};

export default MyLoans;
const Modal = ({ title, children, onClose, onConfirm }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-base-200 rounded-xl p-6 w-96 space-y-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <div>{children}</div>

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="btn btn-sm">
          Close
        </button>
        {onConfirm && (
          <button onClick={onConfirm} className="btn btn-sm btn-error">
            Confirm
          </button>
        )}
      </div>
    </div>
  </div>
);
