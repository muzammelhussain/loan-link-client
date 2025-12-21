import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
const ManagerRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  if (role !== "manager") {
    return <h1>This not manager route</h1>;
  }
  return children;
};

export default ManagerRoute;
