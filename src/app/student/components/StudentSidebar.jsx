import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import logo from "../../../../public/images/android-chrome-512x512.png";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

// Navigation data
const navItems = [
  { title: "Dues", url: "/student/view-dues" },
  { title: "Payments", url: "/student/view-payments" },
  { title: "Profile", url: "/student/profile" },
];

export function StudentSidebar({ ...props }) {
  const pathname = usePathname(); // Get current route

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={50} height={40} />
          <h1 className="text-2xl font-bold px-4 py-2 text-grad">NDMS</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`block px-4 py-3 rounded-xl ml-3  mr-3 transition-colors ${
                isActive
                  ? "bg-blue-500 text-white" // Active state (clicked)
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
