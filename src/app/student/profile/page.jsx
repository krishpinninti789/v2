"use client";
import React from "react";
import ProfileLogo from "../../../../public/images/student.jpg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { getCldImageUrl } from "next-cloudinary";

const StudentProfilePage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState();
  const [roll, setRoll] = useState();
  const [url, setUrl] = useState();
  // console.log(session?.user);
  // console.log(data);

  // useEffect(() => {
  //   if (session?.user) {
  //     setRoll(session.user.email.split("@")[0]);
  //   }
  // }, [session]);
  // const urlPath = getCldImageUrl(
  //   {
  //     width: 960,
  //     height: 600,
  //     src: `students/${roll}`,
  //   },
  //   [session?.user]
  // );
  // setUrl(urlPath);

  // useEffect(() => {
  //   const getStudent = async () => {
  //     const response = await fetch(`/api/view/view-students?roll=${roll}`, {
  //       method: "GET",
  //     });
  //     const res = await response.json();
  //     // console.log(res);
  //     if (res?.data) setData(res.data);
  //   };
  //   if (roll !== undefined) getStudent();
  // }, [roll]);

  return (
    <>
      {data?.user && (
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-xl ">My Profile</h1>
          {/* Photo div */}
          <div className=" flex flex-col items-center space-6 gap-5 p-3 border-1">
            <div className="">
              {/* <CldImage
                src={url}
                width="200"
                alt="prof"
                height="200"
                className="rounded-full text-center border shadow-xl  w-48 h-48"
                onError={() => setUrl("students/profile-fallback")}
              /> */}
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
        </div>
      )}
    </>
  );
};

export default StudentProfilePage;
