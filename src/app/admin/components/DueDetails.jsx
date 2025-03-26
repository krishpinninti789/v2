"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import prof from "../../../../public/images/profile1.jpg";
import { getCldImageUrl } from "next-cloudinary";

const DueDetails = (dues) => {
  const studentDues = dues.dues;
  const router = useRouter();

  const url = getCldImageUrl({
    width: 960,
    height: 600,
    src: `students/${studentDues[0]?.roll}`,
  });

  return (
    <div>
      {studentDues.length > 0 ? (
        <div>
          {studentDues.map((item, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center flex-col">
                <Image
                  src={url}
                  alt="profile"
                  width="100"
                  height="100"
                  className="rounded-full border border-gray-200 text-center w-44 h-44"
                />

                <h3 className="text-lg font-semibold">Roll: {item.roll}</h3>
                <h1 className="text-xl font-bold mb-4">Year: {item.year}</h1>
              </div>

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
                  {item.dues.map((due) => (
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
                        {new Date(due.due_date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-2 border">
                        <Button
                          className="button-grad text-white rounded-lg px-4 py-2 disabled:bg-gray-400"
                          disabled={due.status === "paid"}
                          onClick={() =>
                            router.push(
                              `/admin/edit-due?roll=${item.roll}&id=${due._id}`
                            )
                          }
                        >
                          Update Due
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No Results...</p>
      )}
    </div>
  );
};

export default DueDetails;
