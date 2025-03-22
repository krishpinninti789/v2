"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import DueDetails from "../components/DueDetails";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";

const ViewDuesPage = () => {
  const [roll, setRoll] = useState("");
  const [dues, setDues] = useState([]);
  const [manages, setManages] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setManages(session.user.manages);
    }
  }, [session, status]);

  //   console.log("Session Status:", status);
  //   console.log("Manages:", manages);

  const getDuesInfo = async (roll) => {
    if (!roll) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/view/view-dues?roll=${roll}`, {
        method: "GET",
      });

      if (!response) {
        throw new Error("Failed to fetch dues");
      }

      const res = await response.json();
      if (!res?.data?.dues) {
        setDues([]);
        setLoading(false);
        return;
      }

      const filteredData = res.data.dues.filter(
        (item) => item.duetype === manages
      );

      setDues([{ roll, year: res?.data?.year, dues: filteredData }]);
    } catch (error) {
      //   console.error("Error fetching dues:", error);
      setDues([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl text-vprimary">View Dues Page</h1>

        <div className="lg:flex-row flex flex-col gap-2 items-center lg:w-1/2">
          <div className="flex items-center gap-2 border-gray-300 border rounded-xl p-2">
            <Search className="text-vprimary" />
            <input
              type="text"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="rounded-xl p-2 search-input w-[25rem] outline-none"
              placeholder="Enter roll number"
            />
          </div>

          <button
            onClick={() => getDuesInfo(roll)}
            className="rounded-xl p-3 text-white button-grad"
          >
            Search
          </button>
        </div>

        {loading ? <Spinner /> : <DueDetails dues={dues} />}
      </div>
    </div>
  );
};

export default ViewDuesPage;
