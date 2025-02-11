"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "next-auth/jwt";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ redirect: false });

      router.push("/"); // Redirect to the sign-in page after signing out
    };

    handleSignOut();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Signing out...</h1>
    </div>
  );
}
