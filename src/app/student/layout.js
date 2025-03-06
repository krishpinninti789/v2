import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
          <div>
            <Link href="/student/view-dues">View Dues</Link>
            <Link href="/student/pay-dues">Pay Dues</Link>
          </div>
        </nav>
        <Button className="bg-violet-600 hover:bg-violet-900 text-white">
          <Link href="/signout">Signout</Link>
        </Button>
      </header>
      {children}
    </div>
  );
};

export default layout;
