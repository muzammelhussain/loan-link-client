import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosInstance = useAxios();
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  const updateRole = async (id, role) => {
    await axiosInstance.patch(`/users/role/${id}`, { role });
    toast.success("Role updated");
    refetch();
  };

  const suspendUser = async () => {
    await axiosInstance.patch(`/users/suspend/${selectedUser._id}`, {
      reason,
      feedback,
    });

    toast.success("User suspended");
    setSelectedUser(null);
    setReason("");
    setFeedback("");
    refetch();
  };

  const activateUser = async (id) => {
    await axiosInstance.patch(`/users/activate/${id}`);
    toast.success("User activated");
    refetch();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  <span className="badge badge-outline">{user.role}</span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      user.status === "Suspended"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {user.status || "Active"}
                  </span>
                </td>

                <td className="space-x-2">
                  {/* Role Update */}
                  <select
                    className="select select-xs select-bordered"
                    value={user.role}
                    onChange={(e) => updateRole(user._id, e.target.value)}
                  >
                    <option value="user">Borrower</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>

                  {/* Suspend / Activate */}
                  {user.status === "Suspended" ? (
                    <button
                      onClick={() => activateUser(user._id)}
                      className="btn btn-xs btn-success"
                    >
                      Activate
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="btn btn-xs btn-error"
                    >
                      Suspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Suspend Modal */}
      {selectedUser && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error">
              Suspend {selectedUser.name}
            </h3>

            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Suspend Reason"
                className="input input-bordered w-full"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <textarea
                placeholder="Why are you suspending this user?"
                className="textarea textarea-bordered w-full"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedUser(null)}>
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={suspendUser}
                disabled={!reason || !feedback}
              >
                Confirm Suspend
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageUsers;
