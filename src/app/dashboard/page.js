import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage
      <Link href={"/signout"}>Signout</Link>
    </div>
  );
};

export default DashboardPage;
