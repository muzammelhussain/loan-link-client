import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Link, useNavigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const navigate = useNavigate();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  if (role !== "admin") {
    return (
      <div>
        <h1>This is not admin route</h1>
        <h1>
          Please go to <Link to={"/"}>home</Link>
        </h1>
      </div>
    );
  }
  return children;
};

export default AdminRoute;
