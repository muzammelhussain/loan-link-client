import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <h1>payment is cancel</h1>
      <Link to="/dashboard/my-loans">go to dashboard</Link>
    </div>
  );
};

export default PaymentCancel;
