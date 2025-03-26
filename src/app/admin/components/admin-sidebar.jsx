"use client";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import logo from "../../../../public/images/android-chrome-512x512.png";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { PiStudent } from "react-icons/pi";
import { IoDocumentLockOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { IoIosCloudUpload } from "react-icons/io";
import { FaEye } from "react-icons/fa";

// Navigation Data
const navItems = [
  {
    title: "Student",
    icon: <PiStudent size={25} />,
    items: [
      {
        title: " StudentsUpload",
        url: "/admin/add-students",
        icon: <IoIosCloudUpload size={25} />,
      },
      {
        title: "StudentDetails",
        url: "/admin/view-students",
        icon: <FaEye size={25} />,
      },
    ],
  },
  {
    title: "Credentials",
    icon: <IoDocumentLockOutline size={25} />,
    items: [
      {
        title: "Add Credentials",
        url: "/admin/add-users",
        icon: <IoIosCloudUpload size={25} />,
      },
      {
        title: "View Credentials",
        url: "/admin/view-users",
        icon: <FaEye size={25} />,
      },
    ],
  },
  // {
  //   title: "Admin",
  //   items: [
  //     { title: "Add Admins", url: "/admin/add-admins" },
  //     { title: "View Admins", url: "/admin/view-admins" },
  //   ],
  // },
  {
    title: "Dues",
    icon: <RiMoneyRupeeCircleLine size={25} />,
    items: [
      {
        title: "DuesUpload",
        url: "/admin/add-dues",
        icon: <IoIosCloudUpload size={25} />,
      },
      {
        title: "DueDetails",
        url: "/admin/view-dues",
        icon: <FaEye size={25} />,
      },
    ],
  },
];

export function AdminSidebar({ ...props }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleMenuClick = (menuTitle) => {
    setActiveMenu(activeMenu === menuTitle ? null : menuTitle);
  };

  const handleSubmenuClick = (submenuTitle) => {
    setActiveSubmenu(submenuTitle);
  };

  return (
    <Sidebar {...props}>
      {/* Sidebar Header */}
      <SidebarHeader>
        <div className="flex items-center p-4 gap-2">
          <Image src={logo} alt="image" width={50} height={40} />
          <h1 className="text-2xl font-bold text-grad">Home</h1>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="gap-2  p-4">
        {navItems.map((item) => (
          <Collapsible
            key={item.title}
            open={activeMenu === item.title}
            className="group/collapsible"
          >
            <SidebarGroup>
              {/* Sidebar Menu Label */}
              <SidebarGroupLabel
                asChild
                className={`group/label p-2 text-md rounded-lg cursor-pointer flex items-center
                ${
                  activeMenu === item.title
                    ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => handleMenuClick(item.title)}
              >
                <CollapsibleTrigger className="w-full flex items-center">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </div>
                  <ChevronRight
                    className={`ml-auto transition-transform ${
                      activeMenu === item.title ? "rotate-90" : ""
                    }`}
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              {/* Sidebar Submenu */}
              <CollapsibleContent>
                <SidebarGroupContent className="pl-4">
                  <SidebarMenu className="flex flex-col gap-2">
                    {item.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={subItem.url}
                            className={`block p-2 mt-2 rounded-lg text-md font-medium 
                            ${
                              activeSubmenu === subItem.title
                                ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            }`}
                            onClick={() => handleSubmenuClick(subItem.title)}
                          >
                            {subItem.icon} {subItem.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
