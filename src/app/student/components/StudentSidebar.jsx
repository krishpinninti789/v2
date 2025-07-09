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
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaFileAlt } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

// Navigation data

const navItems = [
  {
    title: "Dues",
    url: "/student/view-dues",
    icon: <RiMoneyRupeeCircleLine />,
  },
  {
    title: "Payments",
    url: "/student/view-payments",
    icon: <MdOutlinePayments />,
  },
  { title: "Profile", url: "/student/profile", icon: <CgProfile /> },
  {
    title:"NoDueForm", url:"/student/nodueform",icon:<FaFileAlt/>},
    {
      title:"Notification", url:"/student/notification",icon:<FaBell/>}
  
];

export function StudentSidebar({ ...props }) {
  const pathname = usePathname(); // Get current route

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={50} height={40} />
          <div className=" md:block">
            <h1 className="text-lg font-bold text-gray-900">NDMS</h1>
            <p className="text-xs text-gray-500 -mt-1">
              No Due Management System
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-3 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`block px-3 py-2  rounded-xl ml-3  mr-3 transition-colors ${
                isActive
                  ? "bg-blue-500 text-white" // Active state (clicked)
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="flex gap-2 items-center">
                {item.icon}

                {item.title}
              </div>
            </Link>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
