"use client";

import { Suspense, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { StudentSidebar } from "./components/StudentSidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Cloud,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { getCldImageUrl } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Function to extract and format initials
const extractInitials = (email) => {
  if (!email.includes("@")) return "U";
  const namePart = email.split("@")[0];
  const lastTwoChars = namePart.slice(-2);
  return lastTwoChars.length === 2
    ? lastTwoChars.charAt(0).toUpperCase() + lastTwoChars.charAt(1)
    : "U";
};

export default function StudentDashboardLayout({ children }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const roll = userEmail.split("@")[0];
  const initials = extractInitials(userEmail);
  const router = useRouter();

  const profileImageUrl = roll
    ? getCldImageUrl({
        width: 100,
        height: 100,
        src: `students/${roll}`,
      })
    : null;

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <SidebarProvider>
      <StudentSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1 hover:bg-gray-100 rounded-lg p-2 transition-colors" />
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <Image
                    src={"/images/android-chrome-512x512.png"} // fixed path
                    alt="logo"
                    width={30}
                    height={30}
                  />
                </div>
                <div className=" md:block">
                  <h1 className="text-lg font-bold text-gray-900">NDMS</h1>
                  <p className="text-xs text-gray-500 -mt-1">
                    No Due Management System
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-gray-100 rounded-lg p-2"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="text-sm font-semibold text-gray-900">
                  {roll?.toUpperCase()}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2"
                  >
                    <div className="relative">
                      <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                        <AvatarImage
                          src={profileImageUrl || "/placeholder.svg"}
                          alt="Profile"
                        />
                        <AvatarFallback className="text-xs font-semibold button-grad text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 shadow-lg border-0"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Student Portal
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/student/profile")}
                    className="cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Suspense
              fallback={
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                  <Skeleton className="h-64 w-full" />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </main>

        <div className="border-t border-gray-200 bg-gray-50 px-6 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                <span>Academic Year 2024-25</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {currentTime && <span>Last updated: {currentTime}</span>}
              <Badge variant="outline" className="text-xs">
                Student Portal
              </Badge>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
