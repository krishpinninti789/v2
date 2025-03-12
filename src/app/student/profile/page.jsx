import React from "react";
import ProfileLogo from "../../../../public/images/student.jpg";
import Image from "next/image";

const StudentProfilePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-xl ">My Profile</h1>
      {/* Photo div */}
      <div className="border rounded-xl border-gray-200 flex space-6 gap-5 p-3 border-1">
        <div className="rounded-full w-[50px]">
          <Image src={ProfileLogo} alt="logo" width={500} height={500} />
        </div>
        <div>
          <h1>Raquir Rahman</h1>
          <h1>Team Manager</h1>
          <h1>United Kingdom</h1>
        </div>
      </div>
      {/* PersonalInfo div */}
      <div className="flex flex-col border border-1 border-gray-200 rounded-xl space-6 p-5 gap-y-5">
        <h1 className="font-bold text-xl">Personal Information</h1>
        <div className="grid grid-cols-2 gap-3 ">
          <div className="flex flex-col space-2">
            <h1 className="text-gray-400 font-thin">First Name</h1>
            <h1>Raquir</h1>
          </div>
          <div className="flex flex-col space-2">
            <h1 className="text-gray-400 font-thin">First Name</h1>
            <h1>Raquir</h1>
          </div>
          <div className="flex flex-col space-2">
            <h1 className="text-gray-400 font-thin">First Name</h1>
            <h1>Raquir</h1>
          </div>
          <div className="flex flex-col space-2">
            <h1 className="text-gray-400 font-thin">First Name</h1>
            <h1>Raquir</h1>
          </div>
          <div className="flex flex-col space-2">
            <h1 className="text-gray-400 font-thin">First Name</h1>
            <h1>Raquir</h1>
          </div>
        </div>
      </div>

      {/* Address div */}
      <div className="flex flex-col border border-1 border-gray-200 rounded-xl space-6 p-5 gap-y-5">
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
      </div>
    </div>
  );
};

export default StudentProfilePage;
