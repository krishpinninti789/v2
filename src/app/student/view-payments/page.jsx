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

  // Function to format date and time
  const formatDateTime = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    // Format time in 12-hour format
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12-hour format

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      {data && data.length !== 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-400 shadow-xl ">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border px-4 py-2">Due Type</th>
              <th className="border px-4 py-2">Payment ID</th>
              <th className="border px-4 py-2">Due ID</th>
              <th className="border px-4 py-2">Payment Mode</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment, index) => (
              <tr key={index} className="text-center border-t border-gray-300">
                <td className="border px-4 py-2">{payment.due_name}</td>
                <td className="border px-4 py-2">{payment.paymentId}</td>
                <td className="border px-4 py-2">{payment.due_id}</td>
                <td className="border px-4 py-2">
                  <div
                    className={`rounded-lg text-md w-[120px] flex justify-center gap-2 px-4 py-1 ${
                      payment.payment_mode === "cash"
                        ? "bg-yellow-100 text-yellow-500 border border-yellow-300"
                        : "bg-green-100 text-green-500 border border-green-300"
                    }`}
                  >
                    <span className="text-xl">•</span> {payment.payment_mode}
                  </div>
                </td>
                <td className="border px-4 py-2">{payment.amountPaid}</td>
                <td className="border px-4 py-2">
                  {formatDateTime(payment.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No payment records found.</p>
      )}
    </div>
  );
};

export default StudentViewPaymentPage;
