"use client";
import Spinner from "@/components/Spinner";
import { AdminSidebar } from "./components/admin-sidebar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Suspense } from "react";
import { useSession, signOut } from "next-auth/react";
import SignOut from "../signout/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const extractInitials = (email) => {
  if (!email.includes("@")) return "U";

  const namePart = email.split("@")[0];
  const lastTwoChars = namePart.slice(-2);

  if (lastTwoChars.length === 2) {
    return lastTwoChars.charAt(0).toUpperCase() + lastTwoChars.charAt(1); // Capitalize first letter
  }

  return "U"; // Default fallback
};

export default function AdminDashboardLayout({ children }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const roll = userEmail.split("@")[0];
  const initials = extractInitials(userEmail);
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 justify-between items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="text-center text-sm font-thin flex flex-col">
            <h6>NDMS</h6>
            <h6>--------</h6>
            <h6 className="text-blue-500">No Due Management System</h6>
          </div>

          {/* User Profile Dropdown */}
          <div className="flex items-center gap-3">
            <h1>Hey Welcome,{roll}</h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="">
                  <Button className="relative button-grad px-4 py-2 w-12 h-12  rounded-full">
                    {initials}
                  </Button>
                  <h1 className=" absolute text-4xl top-0 right-3  text-green-500">
                    •
                  </h1>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40  ">
                <DropdownMenuItem
                  onClick={() => {
                    window.location.assign("/student/profile");
                  }}
                >
                  Info
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    window.location.assign("/signout");
                  }}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
