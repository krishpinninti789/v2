"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import singoutImage from "../../../public/images/signoutImage.jpg";

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
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative gap-2 bg-white border overflow-hidden ">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none ">
        <div className="absolute inset-0 translate-y-1/2 rounded-full vprimary/20 blur-3xl" />
        {/* <div className="absolute inset-0 translate-y-1/2 rounded-full vprimary" /> */}
      </div>
      <h1 className="text-vprimary text-3xl font-extrabold sel-center">
        Signing Out
      </h1>
      <div className="w-[30rem]  h-[30rem] rounded-md ">
        <Image alt="not found" src={singoutImage} className="rounded-md" />
      </div>
    </div>
  );
}
