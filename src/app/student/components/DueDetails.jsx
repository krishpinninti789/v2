"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/calc/formatDate";

const DueDetails = ({ data }) => {
  const router = useRouter();

  // Function to format the due date (DD-MM-YYYY)

  return (
    <div className="p-4">
      {data ? (
        <div>
          <h3 className="text-lg font-semibold">Roll: {data.roll}</h3>
          <h1 className="text-xl font-bold mb-4">Year: {data.year}</h1>
          <table className="w-full border-collapse border border-gray-300 shadow-xl">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Amount Paid</th>
                <th className="px-4 py-2 border">Amount Pending</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Due Date</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.dues.map((due) => (
                <tr
                  key={due._id}
                  className="border-t border-gray-300 text-center"
                >
                  <td className="px-4 py-2 border">{due.duetype}</td>
                  <td className="px-4 py-2 border">{due.amount}</td>
                  <td className="px-4 py-2 border">{due.amount_paid}</td>
                  <td className="px-4 py-2 border">{due.amount_pending}</td>
                  <td className="px-4 py-2 border">
                    <div
                      className={`rounded-lg text-md w-[120px] flex justify-center gap-2 px-4 py-1 ${
                        due.status === "pending"
                          ? "bg-yellow-100 text-yellow-500 border border-yellow-300"
                          : "bg-green-100 text-green-500 border border-green-300"
                      }`}
                    >
                      <span className="text-xl">•</span> {due.status}
                    </div>
                  </td>
                  <td className="px-4 py-2 border">
                    {formatDate(due.due_date)}
                  </td>
                  <td className="px-4 py-2 border">
                    <Button
                      className="px-4 py-2 button-grad text-white rounded-lg "
                      disabled={due.status === "paid"}
                      onClick={() =>
                        router.push(
                          `/student/pay-due?roll=${data.roll}&id=${due._id}`
                        )
                      }
                    >
                      Pay Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No Dues...</p>
      )}
    </div>
  );
};

export default DueDetails;
