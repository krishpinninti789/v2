"use client";

import { useEffect } from "react";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Application route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section
        role="alert"
        className="surface-card relative w-full max-w-lg overflow-hidden p-8 text-center sm:p-10"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-[#c2ef4e]" />
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fa7faa]/15 text-[#422082]">
          <AlertTriangle className="h-8 w-8" aria-hidden="true" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5fc1]">
          Something went wrong
        </p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
          We couldn’t load this page
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          An unexpected error interrupted this view. Try again, or return to
          your dashboard and continue safely.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={() => reset()}
            className="bg-[#150f23] text-white hover:bg-[#422082]"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
          >
            <Home className="h-4 w-4" />
            Go to sign in
          </Button>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-[#422082]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Go back
        </button>
      </section>
    </main>
  );
}
