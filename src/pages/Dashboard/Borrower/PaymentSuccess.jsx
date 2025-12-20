import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          return res.data;
        });
    }
  }, [sessionId, axiosInstance]);

  return (
    <div>
      <h1>payment is successfully paid</h1>
    </div>
  );
};

export default PaymentSuccess;
