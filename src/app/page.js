"use client";
import React from "react";
import Login from "@/components/LoginPage";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge, Cloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [getStarted, setGetStarted] = useState(false);
  return (
    <>
      {!getStarted ? (
        <div className=" h-full  bg-white">
          <header className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-semibold text-vprimary"
              >
                <Cloud className="h-8 w-8" />
                NDMS
              </Link>

              {/* <div className="hidden md:flex items-center gap-8">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Solutions
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Developer
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Partner
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </div>

              <Button className="text-vprimary hover:bg-vprimary">
                <Link href={"./login"}>Login</Link>
              </Button> */}
            </nav>
          </header>

          <main className="container mx-auto px-4 py-20 h-[70vh] relative">
            <div className="relative max-w-4xl mx-auto text-center">
              {/* Decorative elements */}
              <div className="absolute left-0 top-1/2 w-48 h-px bg-gray-200 -translate-x-full">
                <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full border border-gray-200" />
                <div className="absolute -right-3 -bottom-1 w-2 h-2 rounded-full border border-gray-200" />
              </div>
              <div className="absolute right-0 top-1/2 w-48 h-px bg-gray-200 translate-x-full">
                <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full border border-gray-200" />
                <div className="absolute -left-3 -bottom-1 w-2 h-2 rounded-full border border-gray-200" />
              </div>

              {/* <Badge
                variant="secondary"
                className="mb-8 text-vprimary bg-purple-50 hover:bg-purple-50"
              >
                Introduce Cloud Platforms
              </Badge> */}

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                No <span className="text-vprimary">Due </span>
                <br />
                Management System
              </h1>

              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                It is a platform where you can manage your dues and payments
                easily.
                <br />
                From anywhere and with any device.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
                <Button
                  onClick={() => {
                    setGetStarted(true);
                  }}
                  size="lg"
                  className="text-white bg-vprimary hover:bg-vprimary"
                >
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
              {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none">
                <div className="absolute inset-0 translate-y-1/2 rounded-full text-vprimary/30 blur-3xl" />
              </div> */}
            </div>
          </main>
          <div className="flex justify-center items-center min-h-[100vh] w-full">
            <div className="flex flex-col w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                🔍 Advanced <span className="text-vprimary">Search</span>{" "}
                Functionality
              </h1>
              <p className="text-3xl text-gray-500">
                Find what you need instantly with our powerful search system.
                <br />✔ Search the data effectively.
                <br /> ✔ Get the data fastly.
                <br /> ✔ Implented to easy access.
              </p>
            </div>
            <div>
              <Image
                src={"/images/search.jpg"}
                width={500}
                height={600}
                alt="search-image"
              />
            </div>
          </div>
          <div className="flex justify-center items-center min-h-[100vh]">
            <div>Search Content</div>
            <div>Image</div>
          </div>
          <div className="flex justify-center items-center min-h-[100vh]">
            <div>Automation Content</div>
            <div>Image</div>
          </div>
          <footer className="flex justify-center items-center">
            <div>Footer content</div>
          </footer>
        </div>
      ) : (
        <div>
          <SessionProvider>
            <Login />
          </SessionProvider>
        </div>
      )}
    </>
  );
};

export default Home;
