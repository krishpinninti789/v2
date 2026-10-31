"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="surface-card flex w-full max-w-sm flex-col items-center gap-4 p-10 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" aria-label="Signing out" />
        <h1 className="text-xl font-semibold text-slate-950">Signing you out</h1>
        <p className="text-sm text-slate-500">Your session is being securely closed.</p>
      </div>
    </div>
  );
}
