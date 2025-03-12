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

export default function AdminDashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 justify-between items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl text-grad font-semibold">Dashboard</h1>
          <Button className="button-grad">
            <Link href="/signout">Signout</Link>
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
