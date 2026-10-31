"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Eye, EyeOff, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user) return;
    router.replace(
      session.user.role === "super_admin"
        ? "/admin/view-dues"
        : session.user.role === "student"
          ? "/student/view-dues"
          : "/manager/view-dues"
    );
  }, [router, session]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Please accept the Terms & Privacy to continue.");
      return;
    }

    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: email.trim(),
      password,
    });

    if (result?.error) {
      setError("We couldn't sign you in with those credentials.");
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-blue-700" aria-label="Loading session" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="relative">
            <div className="mb-16 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c2ef4e] font-bold text-[#1f1633]">N</div>
              <span className="text-xl font-semibold tracking-tight">ClearanceFlow</span>
            </div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#c2ef4e]">Institution operations</p>
            <h1 className="max-w-lg text-4xl font-semibold leading-tight">
              Clarity for every due, payment, and student record.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
              A focused workspace for managing academic finances with confidence.
            </p>
          </div>
          <div className="relative flex items-center gap-3 text-sm text-slate-300">
            <ShieldCheck className="h-5 w-5 text-[#c2ef4e]" />
            Secure access for your institution
          </div>
        </section>

        <section className="flex items-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#150f23] font-bold text-[#c2ef4e]">N</div>
                <span className="text-xl font-semibold text-slate-950">ClearanceFlow</span>
              </div>
            </div>
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-[#422082]">Welcome back</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Sign in to your workspace</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">Use your institution credentials to continue.</p>
            </div>

            {error && (
              <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@institution.edu" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forget-password" className="text-xs font-medium text-[#422082] hover:text-[#6a5fc1]">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" className="pr-11" value={password} onChange={(event) => setPassword(event.target.value)} required />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-500">
                <Checkbox checked={acceptedTerms} onCheckedChange={setAcceptedTerms} aria-label="Accept Terms and Privacy" />
                <span>I agree to the Terms & Privacy.</span>
              </label>
              <Button type="submit" disabled={loading} className="h-11 w-full bg-[#150f23] text-white hover:bg-[#422082]">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : <><LockKeyhole className="h-4 w-4" /> Sign in</>}
              </Button>
            </form>
            <p className="mt-10 text-center text-xs text-slate-400">© {new Date().getFullYear()} ClearanceFlow · Secure institution access</p>
          </div>
        </section>
      </div>
    </main>
  );
}
