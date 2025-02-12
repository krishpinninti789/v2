import React from "react";
import { ChevronRight } from "lucide-react";

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

// Updated navigation data
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
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="text-2xl font-bold px-4 py-2">NMDS</h1>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {navItems.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <Link href={subItem.url}>{subItem.title}</Link>
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
