import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
const ManagerRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <h1>loading...............</h1>;
  }

  if (role !== "manager") {
    return <h1>this not admin</h1>;
  }
  return children;
};

export default ManagerRoute;
