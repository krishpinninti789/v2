"use client";
import React, { Suspense } from "react";
import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import StudentDetails from "../components/StudentDetails";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

const ViewStudents = () => {
  const [roll, setRoll] = useState(null);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(user);

  const getStudentInfo = async (roll) => {
    // console.log(roll);
    setLoading(true);

    const response = await fetch(`/api/view/view-students?roll=${roll}`, {
      method: "GET",
    });

    const res = await response.json();
    // console.log(res);
    if (res.success == false) {
      setLoading(false);
      setUser([]);
    }
    setTimeout(() => {
      if (res?.data) {
        setUser([res.data]);
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5fc1]">Student directory</p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-950"><Users className="h-6 w-6 text-[#6a5fc1]" />Find a student</h1>
        <p className="mt-1 text-sm text-slate-500">Search by roll number to review profile information.</p>
      </div>

      <Card className="surface-card">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
            type="text"
            onChange={(e) => setRoll(e.target.value)}
            className="h-11 pl-10"
            placeholder="Enter roll number"
            />
          </div>

        <Button
          onClick={() => getStudentInfo(roll)}
          className="h-11 rounded-xl button-grad text-white"
        >
          Search
        </Button>
        </CardContent>
      </Card>
      {loading ? <Spinner /> : <StudentDetails user={user} />}
    </div>
  );
};

export default ViewStudents;
