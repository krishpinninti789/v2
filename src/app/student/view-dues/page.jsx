"use client";
import React, { useEffect, useState } from "react";
import DueDetails from "../components/DueDetails";
import { useSession } from "next-auth/react";

const StudentViewDuePage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;
      try {
        const roll = session.user.email.split("@")[0];
        const response = await fetch(`/api/view/view-dues?roll=${roll}`);
        const res = await response.json();
        if (res?.data) setData(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  if (loading || status === "loading") {
    return <div className="surface-card h-96 animate-pulse bg-slate-100" aria-label="Loading fee overview" />;
  }

  return <DueDetails data={data} />;
};

export default StudentViewDuePage;
