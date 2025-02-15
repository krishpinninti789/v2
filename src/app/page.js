"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // console.log("result", result);

    setUser(result);

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect to the home page or a protected page
      router.push("/admin/add-students");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden">
      {/* Decorative Circle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 translate-y-1/2 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="w-full max-w-[400px] mx-auto p-6 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
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
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Forgot password
            </Link>
          </div>

          {loading && user ? (
            <Button disabled className="w-full bg-purple-400 ">
              <Loader2 className="animate-spin" />
              Signing in
            </Button>
          ) : (
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
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

export default SignIn;
