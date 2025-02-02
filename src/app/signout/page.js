"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Signing out...</h1>
    </div>
  );
}
