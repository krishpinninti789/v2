import React from "react";
import { CldImage } from "next-cloudinary";
import { getCldImageUrl } from "next-cloudinary";

const StudentDetails = (user) => {
  const studentData = user.user;
  // console.log(studentData[0].name);
  // console.log(studentData);
  const data = studentData[0];
  const url = getCldImageUrl({
    width: 960,
    height: 600,
    src: `students/${studentData[0]?.roll}`,
  });
  // console.log(data);

  return (
    <div>
      {data ? (
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-xl text-center ">Student Profile</h1>
          {/* Photo div */}
          <div className="flex items-center flex-col space-6 gap-5 p-3 ">
            <div className="">
              <CldImage
                src={url} // Use this sample image or upload your own via the Media Explorer
                width="200"
                alt="prof" // Transform the image: auto-crop to square aspect_ratio
                height="200"
                className="w-48 h-48 rounded-full"
              />
              {/* <Image src={ProfileLogo} alt="logo" width={500} height={500} /> */}
            </div>
            <div>
              <h1 className="font-bold">{data.roll}</h1>
              <h1 className="font-thin opacity-50">Student</h1>
              <h1 className="font-thin opacity-50">VVIT</h1>
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
      ) : (
        <p className="opacity-40">No results found ....</p>
      )}
    </div>
  );
};

export default StudentDetails;
