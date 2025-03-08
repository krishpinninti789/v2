"use client";
import React, { useEffect } from "react";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import LoginImage from "../../public/images/login.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const { data: session, status } = useSession();
  console.log("session", session);

  const user_email = session?.token?.token?.user?.email;
  const user_role = session?.token?.token?.user?.role;
  console.log("user_role", user_role);
  // console.log("user_email", user_email);

  const roll = user_email?.split("@")[0];
  console.log("roll", roll);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // console.log(result);

    setUser(result);

    if (result.error) {
      setError(result.error);
    }
  };

  useEffect(() => {
    if (session) {
      if (user_role === "super_admin") {
        router.push("/admin/add-students");
      } else if (user_role === "student") {
        router.push(`/student/view-dues?id=${roll}`);
      } else {
        router.push("/demo");
      }
    }
  }, [session]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden">
      <div>
        <Image src={LoginImage} alt="" width={700} height={700} />
      </div>
      {/* Decorative Circle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 translate-y-1/2 rounded-full vprimary/20 blur-3xl" />
      </div>

      <div className="w-full max-w-[400px] mx-auto p-6 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-vprimary mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-gray-500 cursor-pointer"
              >
                Remember for 30 days
              </label>
            </div>
            <Link
              href="/reset-password"
              className="text-sm vprimary hover:text-vprimary"
            >
              Forgot password
            </Link>
          </div>

          {loading && user ? (
            <Button disabled className="w-full bg-vsecondary ">
              <Loader2 className="animate-spin" />
              Signing in
            </Button>
          ) : (
            <Button
              className="w-full bg-vsecondary hover:bg-vprimary"
              onClick={() => {
                setLoading(true);
              }}
            >
              Sign in
            </Button>
          )}
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">© NDMS</div>
      </div>
    </div>
  );
};

export default LoginPage;
