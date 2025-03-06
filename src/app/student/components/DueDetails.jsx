// Note: DueDetails component to display dues of a student
//       - The component is used in the view-dues page
//       - The component receives dues as props
//       - The component displays the dues in a table format
//       - The component also provides an option to edit the dues
"use client";
import { useRouter } from "next/navigation";
import React from "react";
// import "../../../app/globals.css";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DueDetails = (dues) => {
  const studentDues = dues.dues;
  // const [studentDues, setStudentDues] = useState(dues.dues);
  const router = useRouter();

  return (
    <div>
      {studentDues.length > 0 ? (
        <div>
          {studentDues.map((item, index) => (
            <div key={index}>
              <h3>Roll: {item.roll}</h3>
              <h1>Year:{item.year}</h1>
              <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                style={{
                  width: "100%",
                  textAlign: "left",
                  borderCollapse: "collapse",
                }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Amount paid</th>
                    <th>Amount pending</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {item.dues.map((due) => (
                    <tr key={due._id} className="border-t border-gray-200">
                      <td>{due.duetype}</td>
                      <td>{due.amount}</td>
                      <td>{due.amount_paid}</td>
                      <td>{due.amount_pending}</td>
                      <td>
                        <div
                          className={`rounded-lg text-xl w-[120px] items-center flex gap-3 px-4   ${
                            due.status === "pending"
                              ? "bg-yellow-100 text-yellow-500 rounded-xl border border-yellow-300"
                              : "bg-green-100 text-green-500 rounded-xl border border-green-300"
                          }`}
                        >
                          <span className="text-4xl">•</span> {due.status}
                        </div>
                      </td>
                      <td>{new Date(due.due_date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>No Dues...</p>
      )}
    </div>
  );
};

export default DueDetails;
