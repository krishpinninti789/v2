"use client";
import React from "react";

import { SessionProvider } from "next-auth/react";

const Session = ({ children, session }) => {
  return <SessionProvider>{children}</SessionProvider>;
  // return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Session;
