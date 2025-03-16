"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const StudentViewPaymentPage = () => {
  const [roll, setRoll] = useState();
  const { data: session } = useSession();
  const [data, setData] = useState();

  useEffect(() => {
    if (session?.user) {
      setRoll(session.user.email.split("@")[0]);
    }
  }, [session]);

  useEffect(() => {
    const getPayments = async () => {
      const response = await fetch(`/api/view/view-payments?roll=${roll}`, {
        method: "GET",
      });
      const res = await response.json();
      if (res?.data) setData(res.data);
    };
    if (roll !== undefined) getPayments();
  }, [roll]);
  // console.log(data);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      {data && data.length != 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2"> Due Type</th>

              <th className="border px-4 py-2"> Payment ID</th>
              <th className="border px-4 py-2"> Due ID</th>
              <th className="border px-4 py-2"> Payment Mode</th>

              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{payment.due_name}</td>

                <td className="border px-4 py-2">{payment.paymentId}</td>
                <td className="border px-4 py-2">{payment.due_id}</td>

                <td className="border px-4 py-2">{payment.payment_mode}</td>

                <td className="border px-4 py-2">{payment.amountPaid}</td>
                <td className="border px-4 py-2">{payment.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payment records found.</p>
      )}
    </div>
  );
};

export default StudentViewPaymentPage;
