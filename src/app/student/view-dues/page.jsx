"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DueDetails from "../components/DueDetails";
import { useSession } from "next-auth/react";
const StudentViewDuePage = () => {
  const { data: session, status } = useSession();
  console.log("session", session);

  const user_email = session?.token?.token?.token?.user?.email;
  const user_role = session?.token?.token?.token?.user?.role;
  console.log("user_role", user_role);
  // console.log("user_email", user_email);

  const roll_session = user_email?.split("@")[0];
  // console.log("roll", roll);

  const searchParams = useSearchParams();
  // const roll = searchParams.get("id");
  // const rollid = roll;
  const [dues, setDues] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/view/view-dues?roll=${roll_session}`);
      const data = await response.json();
      setDues([data.data]);
    };
    fetchData();
  }, []);

  console.log(dues);

  // console.log(roll);
  return (
    <div>
      Hello
      {/* <button onClick={handleClick}>Click</button> */}
      {roll_session && <DueDetails dues={dues} />}
    </div>
  );
};

export default StudentViewDuePage;
