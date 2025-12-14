import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyLoans = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: loans = [], refetch } = useQuery({
    queryKey: ["myLoans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/loanApplications/user/${user.email}`
      );
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this loan application?"
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/loanApplications/${id}`);
      toast.success("Loan application canceled");
      refetch();
    } catch (err) {
      toast.error("Cannot cancel this loan");
    }
  };

  const handlePay = (loan) => {
    // Redirect to Stripe page
    // Later replace with real Stripe session
    window.location.href = `/payment/${loan._id}`;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
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
                    to={`/loan-details/${loan.loanId}`}
                    className="btn btn-xs btn-info"
                  >
                    View
                  </Link>

                  {/* Cancel */}
                  {loan.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(loan._id)}
                      className="btn btn-xs btn-error"
                    >
                      Cancel
                    </button>
                  )}

                  {/* Pay / Paid */}
                  {loan.applicationFeeStatus === "Unpaid" ? (
                    <button
                      onClick={() => handlePay(loan)}
                      className="btn btn-xs btn-success"
                    >
                      Pay $10
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        alert(
                          `Payment Details:\nEmail: ${loan.userEmail}\nLoan ID: ${loan.loanId}`
                        )
                      }
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
    </div>
  );
};

export default MyLoans;
