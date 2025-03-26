"use client";
import React, { Suspense } from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import StudentDetails from "../components/StudentDetails";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

const ViewStudents = () => {
  const [roll, setRoll] = useState(null);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(user);

  const getStudentInfo = async (roll) => {
    // console.log(roll);
    setLoading(true);

    const response = await fetch(`/api/view/view-students?roll=${roll}`, {
      method: "GET",
    });

    const res = await response.json();
    // console.log(res);
    if (res.success == false) {
      setLoading(false);
      setUser([]);
    }
    setTimeout(() => {
      if (res?.data) {
        setUser([res.data]);
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-vprimary">view students page</h1>

      <div className="flex gap-3 justify-between items-center w-1/2 p-2 border-gray-300 border rounded-xl">
        <div className="flex items-center gap-2">
          <Search className="text-vprimary" />
          <input
            type="text"
            onChange={(e) => setRoll(e.target.value)}
            className="rounded-xl p-2 search-input w-[25rem] outline-none "
            placeholder="Enter roll number"
          />
        </div>

        <button
          onClick={() => getStudentInfo(roll)}
          className="rounded-xl p-2 text-white button-grad"
        >
          search
        </button>
      </div>
      {loading ? <Spinner /> : <StudentDetails user={user} />}
    </div>
  );
};

export default ViewStudents;
