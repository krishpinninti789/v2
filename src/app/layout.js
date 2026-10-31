import { Geist } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import Session from "@/components/Session";
import { SpeedInsights } from "@vercel/speed-insights/next";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "ClearanceFlow | Student Clearance Management",
  description: "A clear, secure workspace for student clearance and fee management.",
  icons: {
    icon: "/images/clearanceflow-icon.svg",
  },
};

import { getServerSession } from "next-auth";

export default async function RootLayout({ children }) {
  // const session = await getServerSession();
  // console.log("sss:", session);
  return (
    <html lang="en">
      <body
        className={`${geist.variable} antialiased`}
      >
        <Suspense fallback={<Spinner />}>
          <Session>
            {children}
            <SpeedInsights />
          </Session>
        </Suspense>
      </body>
    </html>
  );
}
