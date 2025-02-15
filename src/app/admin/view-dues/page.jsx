"use client";
import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import DueDetails from "../components/DueDetails";
const ViewDuesPage = () => {
  const [roll, setRoll] = useState(null);
  const [dues, setDues] = useState([]);

  const getDuesInfo = async (roll) => {
    // console.log(roll);

    const response = await fetch(`/api/view/view-dues?roll=${roll}`, {
      method: "GET",
    });

    const res = await response.json();
    // console.log(res);
    if (res?.data) {
      setDues([res.data]);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl text-violet-600">view Dues page</h1>

        <div className="flex gap-3 justify-between items-center w-1/2 p-2 border-gray-300 border rounded-md">
          <div className="flex items-center gap-2">
            <Search className="text-violet-600" />
            <input
              type="text"
              onChange={(e) => setRoll(e.target.value)}
              className="rounded-md p-2 search-input w-[25rem] outline-none "
              placeholder="Enter roll number"
            />
          </div>

          <button
            onClick={() => getDuesInfo(roll)}
            className="rounded-md p-2 text-white bg-violet-600"
          >
            search
          </button>
        </div>
        <DueDetails dues={dues} />
      </div>
    </div>
  );
};

export default ViewDuesPage;
