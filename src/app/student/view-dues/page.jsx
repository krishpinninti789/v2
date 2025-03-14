"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DueDetails from "../components/DueDetails";
import { useSession } from "next-auth/react";
import axios from "axios";

const StudentViewDuePage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState();
  const [roll, setRoll] = useState();

  // console.log("session:", session);

  useEffect(() => {
    if (session?.user) {
      // console.log("uesrin", session.user);
      setRoll(session.user.email.split("@")[0]);
    }
  }, [session]);

  // useEffect(() => console.log("chenaged roll:", roll), [roll]);
  // const roll =
  // console.log("roll", roll);
  useEffect(() => {
    const fetchData = async () => {
      // console.log("calling the route");
      const response = await fetch(`/api/view/view-dues?roll=${roll}`, {
        method: "GET",
      });
      const res = await response.json();
      // console.log("response:", res);
      // console.log("check:", res.data.dues);
      if (res?.data) setData(res.data);
    };
    if (roll !== undefined) fetchData();
  }, [roll]);

  // console.log(roll);
  return (
    <div>
      Hello
      {/* <button onClick={handleClick}>Click</button> */}
      {data && <DueDetails data={data} />}
    </div>
  );
};

export default StudentViewDuePage;
