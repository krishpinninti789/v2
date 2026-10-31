import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

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
      title:"Notifications", url:"/student/notifications",icon:<FaBell/>}
  
];

export function StudentSidebar({ ...props }) {
  const pathname = usePathname(); // Get current route

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <Image src="/images/clearanceflow-icon.svg" alt="ClearanceFlow logo" width={40} height={40} />
          <div className=" md:block">
            <h1 className="text-lg font-semibold text-white">ClearanceFlow</h1>
            <p className="text-xs text-sidebar-foreground/60 -mt-1">
              Student clearance workspace
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-2 px-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`block px-3 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-[#c2ef4e] font-semibold text-[#1f1633]"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-[#1f1633]"
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
