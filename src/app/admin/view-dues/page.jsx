"use client";
import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import DueDetails from "../components/DueDetails";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
const ViewDuesPage = () => {
  const [roll, setRoll] = useState(null);
  const [dues, setDues] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDuesInfo = async (roll) => {
    if (roll != null) {
      setRoll(null);
    }
    setLoading(true);
    // console.log(roll);

    const response = await fetch(`/api/view/view-dues?roll=${roll}`, {
      method: "GET",
    });

    const res = await response.json();
    // console.log(res);
    setTimeout(() => {
      if (res?.data) {
        setDues([res.data]);
        setLoading(false);
      }
    }, 2000);
    // if (res?.data) {
    //   setDues([res.data]);
    // }
  };
  return (
    <div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl text-vprimary">view Dues page</h1>

        <div className="lg:flex-row flex flex-col gap-2 items-center lg:w-1/2">
          <div className="flex items-center gap-2 border-gray-300 border rounded-xl p-2">
            <Search className="text-vprimary" />
            <input
              type="text"
              onChange={(e) => setRoll(e.target.value)}
              className="rounded-xl p-2 search-input w-[25rem] outline-none "
              placeholder="Enter roll number"
            />
          </div>

          <button
            onClick={() => getDuesInfo(roll)}
            className="rounded-xl p-3 text-white button-grad"
          >
            search
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div>
            <DueDetails dues={dues} />
          </div>
        )}

        {/* <DueDetails dues={dues} /> */}
      </div>
    </div>
  );
};

export default ViewDuesPage;
