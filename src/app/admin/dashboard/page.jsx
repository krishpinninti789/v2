import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 justify-between items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <Button>
            <Link href="/signout">Signout</Link>
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <p>
            Welcome to the NMDS dashboard. Select an option from the sidebar to
            get started.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
