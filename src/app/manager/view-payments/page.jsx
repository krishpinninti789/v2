"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Search } from "lucide-react";
import Spinner from "@/components/Spinner";

const ManagerViewPaymentPage = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [roll, setRoll] = useState("");
  const [dataManages, setDataManages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manages, setManages] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user.email.split("@")[0]);
      setManages(session.user.manages);
    }
  }, [session]);

  const getPayments = async (roll) => {
    if (!roll) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/view/view-payments?roll=${roll}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch payments.");
      }

      const res = await response.json();
      if (res?.data) {
        setData(res.data);

        // Filter data only after setting state
        const filteredPayments = res.data.filter(
          (item) => item.due_name === manages
        );
        setDataManages(filteredPayments);
      }
    } catch (error) {
      // console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to format date and time
  const formatDateTime = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl text-vprimary">View Payments Page</h1>

        <div className="lg:flex-row flex flex-col gap-2 items-center lg:w-1/2">
          <div className="flex items-center gap-2 border-gray-300 border rounded-xl p-2">
            <Search className="text-vprimary" />
            <input
              type="text"
              onChange={(e) => setRoll(e.target.value)}
              className="rounded-xl p-2 search-input w-[25rem] outline-none"
              placeholder="Enter roll number"
            />
          </div>

          <button
            onClick={() => getPayments(roll)}
            className="rounded-xl p-3 text-white button-grad"
          >
            Search
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="p-4 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            {dataManages.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-400 shadow-xl">
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
                  {dataManages.map((payment, index) => (
                    <tr
                      key={index}
                      className="text-center border-t border-gray-300"
                    >
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
                          <span className="text-xl">•</span>{" "}
                          {payment.payment_mode}
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
        )}
      </div>
    </div>
  );
};

export default ManagerViewPaymentPage;
