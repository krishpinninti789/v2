import Image from "next/image";
import React from "react";
import pagenotfound from "../../public/images/pagenotfound.jpg";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full relative bg-white border overflow-hidden ">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none ">
        <div className="absolute inset-0 translate-y-1/2 rounded-full vprimary/20 blur-3xl" />
        {/* <div className="absolute inset-0 translate-y-1/2 rounded-full vprimary" /> */}
      </div>
      <div className="w-[30rem]  h-[30rem] rounded-md ">
        <Image alt="not found" src={pagenotfound} className="rounded-md" />
      </div>
    </div>
  );
};

export default page;
