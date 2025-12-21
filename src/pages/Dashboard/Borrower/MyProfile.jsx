import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const MyProfile = () => {
  const { user, loading, logOut } = useAuth();
  const axiosInstance = useAxios();

  // ✅ fetch role from DB
  const { data: roleData, isLoading: roleLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}/role`);
      return res.data;
    },
  });

  const handleLogOut = () => {
    logOut().catch(console.log);
  };

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">No user data found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          {/* Profile Header */}
          <div className="flex items-center gap-6">
            <img
              src={user.photoURL || "https://i.ibb.co/2kR5zq0/avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border"
            />

            <div>
              <h3 className="text-xl font-semibold">
                {user.displayName || "User"}
              </h3>
              <p className="text-gray-500">{user.email}</p>

              {/* ✅ role from DB */}
              <span className="badge badge-primary mt-2 capitalize">
                {roleData?.role}
              </span>
            </div>
          </div>

          <div className="divider"></div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="Full Name" value={user.displayName} />
            <Info label="Email" value={user.email} />
            <Info
              label="Account Created"
              value={
                user.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"
              }
            />
            <Info
              label="Last Login"
              value={
                user.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleString()
                  : "N/A"
              }
            />
          </div>
        </div>

        <button
          onClick={handleLogOut}
          className="btn btn-error btn-sm text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;

const Info = ({ label, value }) => (
  <div className="bg-base-200 p-4 rounded-lg">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold">{value || "N/A"}</p>
  </div>
);
