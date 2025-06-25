"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DueDetails from "../components/DueDetails";
import { useSession } from "next-auth/react";

const StudentViewDuePage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState();
  const [roll, setRoll] = useState();

  useEffect(() => {
    if (session?.user) {
      // console.log("uesrin", session.user);
      setRoll(session.user.email.split("@")[0]);
    }
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("calling the route");
      const response = await fetch(`/api/view/view-dues?roll=${roll}`, {
        method: "GET",
      });
      const res = await response.json();

      if (res?.data) setData(res.data);
    };
    if (roll !== undefined) fetchData();
  }, [roll]);

  // console.log(roll);
  return (
    <div>
      {/* <button onClick={handleClick}>Click</button> */}
      {data && <DueDetails data={data} />}
    </div>
  );
};

export default StudentViewDuePage;
