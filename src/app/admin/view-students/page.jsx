"use client";
import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";

const ViewStudents = () => {
  const [roll, setRoll] = useState(null);

  const handleSubmit = async (roll) => {
    console.log(roll);

    const response = await fetch(`/api/view/view-students?roll=${roll}`, {
      method: "GET",
    });

    const res = await response.json();

    console.log(res);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-violet-600">view students page</h1>

      <div className="flex gap-3">
        <Search />
        <input
          type="text"
          onChange={(e) => setRoll(e.target.value)}
          className="rounded-md p-2 search-input"
          placeholder="Enter roll number"
        />

        <button
          onClick={() => handleSubmit(roll)}
          className="rounded-md p-2 text-white bg-violet-600"
        >
          search
        </button>
      </div>
    </div>
  );
};

export default ViewStudents;
