"use client";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Login from "@/components/LoginPage";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge, Cloud, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import landingImage from "../../public/images/landing.jpg";

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
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setGetStarted(true);
                  }}
                  size="lg"
                  className="button-grad"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    setGetStarted(true);
                  }}
                  variant="outline"
                >
                  Login
                </Button>
              </div>

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

          <main className="container lg:flex w-full lg:flex-row  mx-auto px-4 py-20 min-h-[60vh] relative">
            <div className="relative max-w-4xl   mx-auto text-start">
              {/* Decorative elements */}
              {/* <div className="absolute left-0 top-1/2 w-48 h-px bg-gray-200 -translate-x-full">
                <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full border border-gray-200" />
                <div className="absolute -right-3 -bottom-1 w-2 h-2 rounded-full border border-gray-200" />
              </div>
              <div className="absolute right-0 top-1/2 w-48 h-px bg-gray-200 translate-x-full">
                <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full border border-gray-200" />
                <div className="absolute -left-3 -bottom-1 w-2 h-2 rounded-full border border-gray-200" />
              </div> */}

              {/* <Badge
                variant="secondary"
                className="mb-8 text-vprimary bg-purple-50 hover:bg-purple-50"
              >
                Introduce Cloud Platforms
              </Badge> */}

              <h1 className="text-5xl mt-32 md:text-6xl font-bold tracking-normal mb-4">
                No
                {/* No <br /> */}
                <span className="text-grad">Due </span>
                <br />
                Management System
              </h1>

              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                It is a platform where you can manage your dues and payments
                easily.
                <br />
                From anywhere and with any device.
              </p>

              <div className="flex flex-col lg:flex-row gap-4  self-start  relative">
                <Button
                  onClick={() => {
                    setGetStarted(true);
                  }}
                  size="lg"
                  className="text-white bg-gradient-to-r from-vstrong to-vprimary rounded-xl "
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
            <div>
              <Image src={landingImage} alt="" width={800} height={900} />
            </div>
          </main>

          {/* Search Functionality Div */}

          <div className="flex justify-center items-center min-h-[80vh] w-full">
            <div className="flex flex-col gap-3 w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                Easy <br />
                <span className="text-grad">Search</span> Functionality
              </h1>
              <p className="text-xl text-gray-500">
                Find what you need instantly with our powerful search system.
                <br />. Search the data effectively.
                <br /> . Get the data fastly.
                <br /> . Implented to easy access.
              </p>
              <div className="flex items-center gap-2 w-[25rem] bg-gray-300 border-gray-300 border rounded-full p-2">
                <Search className="text-vprimary" />
                <input
                  type="text"
                  className="rounded-full p-2 search-input w-[25rem] outline-none "
                  placeholder="Enter details......."
                />
              </div>
            </div>
            <div>
              <Image
                src={"/images/search.jpg"}
                width={600}
                height={600}
                alt="search-image"
              />
            </div>
          </div>

          {/* Payment Functionality Div */}

          <div className="flex justify-center gap-64 items-center min-h-[80vh] w-full">
            <div>
              <Image
                src={"/images/payment.jpg"}
                width={600}
                height={600}
                alt="search-image"
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                Hastle-Free <br />
                <span className="text-grad">Payment</span> System
              </h1>
              <p className="text-xl text-gray-500">
                Payment can be done through the system.
                <br />. Pay using cards.
                <br /> . Pay through any payment gateway.
                <br /> . Payments info.
              </p>
              <div className="flex items-center gap-2 w-[25rem] bg-gray-300 border-gray-300 border rounded-full p-2">
                <input
                  type="text"
                  className="rounded-full p-2 search-input w-[25rem] outline-none "
                  placeholder="Enter card details......."
                />
              </div>
            </div>
          </div>

          {/* Student Functionality Div */}

          <div className="flex justify-center items-center min-h-[80vh]">
            <div className="flex flex-col gap-3 w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                Manage <br />
                <span className="text-grad">Dues</span> and Users
              </h1>
              <p className="text-xl text-gray-500">
                Manage mutltiple students data.
                <br />. Manage multiple users and admins.
                <br /> . Dues can be view by students on any device.
                <br /> . Realtime updates through mails.
              </p>
              <div className="flex items-center gap-2 w-[25rem] bg-gray-300 border-gray-300 border rounded-full p-2">
                <input
                  type="text"
                  className="rounded-full p-2 search-input w-[25rem] outline-none "
                  placeholder="Enter student details......."
                />
              </div>
            </div>
            <Image
              src={"/images/student.jpg"}
              width={600}
              height={600}
              alt="search-image"
            />
          </div>
          <footer className="flex p-6 gap-96  button-grad pb-44 pt-16 ">
            <div className="flex gap-3 flex-col ">
              <div>
                {/* title */}
                <h1 className="text-3xl font-extrabold">NDMS</h1>
              </div>
              {/* logos */}

              <div className="flex gap-3">
                <FaFacebook size={25} />
                <FaInstagram size={25} />
                <FaLinkedin size={25} />
                <FaTwitter size={25} />
                <FaYoutube size={25} />
              </div>
            </div>
            {/* company */}
            <div className="flex  gap-44">
              <div className="flex gap-4  flex-col">
                <h1 className="text-2xl font-bold ">Company</h1>
                <Link href={"#"} className="text-gray-300 hover:text-white">
                  Business
                </Link>
                <Link href={"#"} className="text-gray-300 hover:text-white">
                  Partnership
                </Link>
                <Link href={"#"} className="text-gray-300 hover:text-white">
                  Network
                </Link>
              </div>

              {/* about us */}
              <div className="flex gap-4 flex-col">
                <h1 className="text-2xl font-bold ">About us</h1>
                <Link href={"#"} className="text-gray-300 hover:text-white">
                  Blogs
                </Link>
                <Link href={"#"} className="text-gray-300 hover:text-white">
                  Channels
                </Link>
                <Link href={"#"} className="text-gray-300 hover:text-white">
                  Sponsers
                </Link>
              </div>
              {/* contact */}
              <div className="flex gap-4 flex-col">
                <h1 className="text-2xl font-bold ">Contact</h1>
                <Link href={"#"} className="text-gray-300 hover:text-white">
                  Contact us
                </Link>
                <Link href={"#"} className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </Link>
                <Link href={"#"} className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </div>
            </div>
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
