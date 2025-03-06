import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      Demo page
      <Link href={"/signout"}>signout</Link>
    </div>
  );
};

export default page;
