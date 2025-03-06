"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DueDetails from "../components/DueDetails";
const StudentViewDuePage = () => {
  const searchParams = useSearchParams();
  const roll = searchParams.get("id");
  const [dues, setDues] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/view/view-dues?roll=${roll}`);
      const data = await response.json();
      setDues([data.data]);
    };
    fetchData();
  }, [roll]);

  console.log(dues);

  // console.log(roll);
  return (
    <div>
      Hello
      {/* <button onClick={handleClick}>Click</button> */}
      <DueDetails dues={dues} />
    </div>
  );
};

export default StudentViewDuePage;
