"use client";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { EyeClosed } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Eye } from "lucide-react";
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
  const [toogleEye, setToogleEye] = useState(true);
  const router = useRouter();

  const { data: session, status } = useSession();
  // console.log("session", session);

  const user_email = session?.user?.email;
  const user_role = session?.user?.role;
  // console.log("user_role", user_role);
  // console.log("user_email", user_email);

  const roll = user_email?.split("@")[0];
  // console.log("roll", roll);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // console.log(result);
    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      setUser(result);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (session?.user) {
      if (user_role === "super_admin") {
        router.push("/admin/view-dues");
      } else if (user_role === "student") {
        // router.push(`/student/view-dues?`);
        window.location.assign("/student/view-dues");
      } else {
        router.push("/manager/view-dues");
      }
    }
  }, [session]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden">
      <div className="lg:block hidden sm:hidden">
        <Image src={LoginImage} alt="" width={700} height={700} />
      </div>
      {/* Decorative Circle */}
      {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 translate-y-1/2 rounded-full vprimary/20 blur-3xl" />
      </div> */}

      <div className="w-full max-w-[400px] mx-auto flex flex-col gap-4 p-6 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-grad mb-2">
            Get Started Now
          </h1>
          <p className="text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
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
            <div className="flex justify-end items-center  focus:ring-blue-500 border-input ring-blue-500 focus-visible:ring-2 focus-visible:outline-none  focus:ring-2  space-x-4  border border-1 rounded-xl">
              <Input
                id="password"
                placeholder="••••••••••••••••"
                type={!toogleEye ? "text" : "password"}
                name="password"
                required
                value={password}
                className="border-none focus:ring-transparent"
                onChange={(e) => setPassword(e.target.value)}
              />
              {!toogleEye ? (
                <Eye
                  className="px-2 text-gray-400"
                  size={35}
                  onClick={() => setToogleEye(true)}
                />
              ) : (
                <EyeClosed
                  className="px-2 text-gray-400"
                  size={35}
                  onClick={() => setToogleEye(false)}
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-gray-500 cursor-pointer"
              >
                I agree to the Terms & Privacy
              </label>
            </div>
            <Link href="/forget-password" className="text-sm text-grad">
              Forgot password?
            </Link>
          </div>

          {loading && user ? (
            <Button disabled className="w-full button-grad  ">
              <Loader2 className="animate-spin" />
              Signing in
            </Button>
          ) : (
            <>
              <Button
                className="w-full  button-grad"
                onClick={() => {
                  setLoading(true);
                }}
              >
                Sign in
              </Button>
            </>
          )}
        </form>
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6"
          onClick={() => (window.location.href = "/")}
        >
          Go Back
        </Button>

        <div className="mt-8 text-center text-sm text-gray-400">© NDMS</div>
      </div>
    </div>
  );
};

export default LoginPage;
