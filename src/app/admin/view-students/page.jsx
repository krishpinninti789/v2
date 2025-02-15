"use client";
import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import StudentDetails from "../components/StudentDetails";
import { useEffect } from "react";

const ViewStudents = () => {
  const [roll, setRoll] = useState(null);
  const [user, setUser] = useState([]);

  const getStudentInfo = async (roll) => {
    // console.log(roll);

    const response = await fetch(`/api/view/view-students?roll=${roll}`, {
      method: "GET",
    });

    const res = await response.json();
    console.log(res);
    if (res?.data) {
      setUser([res.data]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-violet-600">view students page</h1>

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
          onClick={() => getStudentInfo(roll)}
          className="rounded-md p-2 text-white bg-violet-600"
        >
          search
        </button>
      </div>
      <StudentDetails user={user} />
    </div>
  );
};

export default ViewStudents;
