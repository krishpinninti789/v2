"use client";
import React from "react";
import ProfileLogo from "../../../../public/images/student.jpg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const StudentProfilePage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState();
  const [roll, setRoll] = useState();
  // console.log(session?.user);
  // console.log(data);

  useEffect(() => {
    if (session?.user) {
      setRoll(session.user.email.split("@")[0]);
    }
  }, [session]);

  useEffect(() => {
    const getStudent = async () => {
      const response = await fetch(`/api/view/view-students?roll=${roll}`, {
        method: "GET",
      });
      const res = await response.json();
      // console.log(res);
      if (res?.data) setData(res.data);
    };
    if (roll !== undefined) getStudent();
  }, [roll]);

  return (
    <>
      {data && (
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-xl ">My Profile</h1>
          {/* Photo div */}
          <div className="border rounded-xl border-gray-200 flex space-6 gap-5 p-3 border-1">
            <div className="rounded-full w-[50px]">
              <Image src={ProfileLogo} alt="logo" width={500} height={500} />
            </div>
            <div>
              <h1>{data.roll}</h1>
              <h1>Student</h1>
              <h1>VVIT</h1>
            </div>
          </div>
          {/* PersonalInfo div */}
          <div className="flex flex-col border border-1 border-gray-200 rounded-xl space-6 p-5 gap-y-5">
            <h1 className="font-bold text-xl">Personal Information</h1>
            <div className="grid grid-cols-2 gap-3 ">
              <div className="flex flex-col space-2">
                <h1 className="text-gray-400 font-thin">First Name</h1>
                <h1>{data.name}</h1>
              </div>
              <div className="flex flex-col space-2">
                <h1 className="text-gray-400 font-thin">Branch</h1>
                <h1>{data.branch}</h1>
              </div>
              <div className="flex flex-col space-2">
                <h1 className="text-gray-400 font-thin">Email Address</h1>
                <h1>{data.email}</h1>
              </div>
              <div className="flex flex-col space-2">
                <h1 className="text-gray-400 font-thin">Mobile No</h1>
                <h1>{data.mobile_no}</h1>
              </div>
              <div className="flex flex-col space-2">
                <h1 className="text-gray-400 font-thin">Address</h1>
                <h1>{data.address}</h1>
              </div>
              <div className="flex flex-col space-2">
                <h1 className="text-gray-400 font-thin">Parent No</h1>
                <h1>{data.parent_mobile_no}</h1>
              </div>
              <div className="flex flex-col space-2">
                <h1 className="text-gray-400 font-thin">Type</h1>
                <h1>{data.type}</h1>
              </div>
              <div className="flex flex-col space-2">
                <h1 className="text-gray-400 font-thin">Year</h1>
                <h1>{data.year}</h1>
              </div>
            </div>
          </div>

          {/* Address div */}
          {/* <div className="flex flex-col border border-1 border-gray-200 rounded-xl space-6 p-5 gap-y-5">
        <h1 className="font-bold text-xl">Address</h1>
        <div className="grid grid-cols-2 gap-3 ">
          <div className="flex flex-col space-2">
            <h1 className="text-gray-400 font-thin">Country</h1>
            <h1>UK</h1>
          </div>
          <div className="flex flex-col space-2">
            <h1 className="text-gray-400 font-thin">City/State</h1>
            <h1>Leeds,East London</h1>
          </div>
          <div className="flex flex-col space-2">
            <h1 className="text-gray-400 font-thin">Postal Code</h1>
            <h1>ERT 2354</h1>
          </div>
          <div className="flex flex-col space-2">
            <h1 className="text-gray-400 font-thin">TAX ID</h1>
            <h1>AS464678</h1>
          </div>
        </div>
      </div> */}
        </div>
      )}
    </>
  );
};

export default StudentProfilePage;
