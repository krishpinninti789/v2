"use client";
import React from "react";
import { Search, Users } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import UserDetails from "../components/UserDetails";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ViewUsers = () => {
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(users);
  // console.log(user);

  const getUserInfo = async (roll) => {
    // console.log(roll);

    const response = await fetch(`/api/view/view-users?email=${email}`, {
      method: "GET",
    });

    const res = await response.json();
    // console.log(res);
    if (res?.data) {
      setUser([res.data]);
    }
  };
  useEffect(() => {
    const getUsersInfo = async () => {
      const res = await fetch("/api/view/view-users", {
        method: "GET",
      });
      const data = await res.json();
      setUsers([data.data]);
    };
    getUsersInfo();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5fc1]">Access management</p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-950"><Users className="h-6 w-6 text-[#6a5fc1]" />Manage users</h1>
        <p className="mt-1 text-sm text-slate-500">Search credentials and review institution access.</p>
      </div>

      <Card className="surface-card">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 pl-10"
            placeholder="Enter email address..."
            />
          </div>

        <Button
          onClick={() => getUserInfo(email)}
          className="h-11 rounded-xl button-grad text-white"
        >
          Search
        </Button>
        </CardContent>
      </Card>
      {user && <UserDetails user={user} />}

      <div>
        <Card className="surface-card overflow-hidden">
        <CardHeader><CardTitle className="text-base">All users</CardTitle></CardHeader>
        <CardContent className="p-0">
        {users.length != 0 && (
          <table
            border="1"
            cellPadding="10"
            cellSpacing="0"
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
            }}
          >
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th>Email</th>
                <th>Manages</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users[0].map((item, i) => (
                <tr key={i} className="border-t border-slate-200">
                  <td className="px-4 py-4 text-sm text-slate-700">{item.email}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{item.manages}</td>
                  <td className="px-4 py-4">
                    <div
                      className={`flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                        item.role === "student"
                          ? "bg-blue-100 text-vprimary rounded-xl border border-blue-300"
                          : "bg-orange-100 text-orange-500 rounded-xl border border-orange-300"
                      }`}
                    >
                      {item.role}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Button size="sm" className="button-grad text-white">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewUsers;
