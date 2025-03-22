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

// Navigation Data
const navItems = [
  {
    title: "Student",
    items: [
      { title: "Add Students", url: "/admin/add-students" },
      { title: "View Students", url: "/admin/view-students" },
    ],
  },
  {
    title: "Users",
    items: [
      { title: "Add Users", url: "/admin/add-users" },
      { title: "View Users", url: "/admin/view-users" },
    ],
  },
  {
    title: "Admin",
    items: [
      { title: "Add Admins", url: "/admin/add-admins" },
      { title: "View Admins", url: "/admin/view-admins" },
    ],
  },
  {
    title: "Dues",
    items: [
      { title: "Add Dues", url: "/admin/add-dues" },
      { title: "View Dues", url: "/admin/view-dues" },
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
          <h1 className="text-2xl font-bold text-grad">NDMS</h1>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="gap-2 p-2">
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
                className={`group/label p-2 rounded-lg cursor-pointer flex items-center
                ${
                  activeMenu === item.title
                    ? "bg-blue-500 text-white"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => handleMenuClick(item.title)}
              >
                <CollapsibleTrigger className="w-full flex items-center">
                  {item.title}
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
                      <SidebarMenuItem key={subItem.title} className="">
                        <SidebarMenuButton asChild>
                          <Link
                            href={subItem.url}
                            className={`block p-2 mt-2 rounded-lg text-sm font-medium 
                            ${
                              activeSubmenu === subItem.title
                                ? "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            }`}
                            onClick={() => handleSubmenuClick(subItem.title)}
                          >
                            {subItem.title}
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
