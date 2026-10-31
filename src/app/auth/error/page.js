"use client";

import { Suspense } from "react";
import { AlertCircle, ArrowLeft, LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const errorMessages = {
  Configuration: "The sign-in service is temporarily unavailable.",
  AccessDenied: "You do not have permission to access this account.",
  Verification: "This verification link is invalid or has expired.",
  Default: "We couldn't complete sign in. Please try again.",
};

function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("error") || "Default";
  const message = errorMessages[code] || errorMessages.Default;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section
        role="alert"
        className="surface-card w-full max-w-md p-8 text-center sm:p-10"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertCircle className="h-8 w-8" aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5fc1]">
          Authentication error
        </p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">
          Sign in wasn’t completed
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">{message}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            onClick={() => router.replace("/")}
            className="bg-[#150f23] text-white hover:bg-[#422082]"
          >
            <LockKeyhole className="h-4 w-4" />
            Return to sign in
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </div>
      </section>
    </main>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#422082]" />
        </main>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
