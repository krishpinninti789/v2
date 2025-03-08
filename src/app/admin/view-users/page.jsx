"use client";
import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import UserDetails from "../components/UserDetails";
import { Button } from "@/components/ui/button";

const ViewUsers = () => {
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(users);
  console.log(user);

  const getUserInfo = async (roll) => {
    // console.log(roll);

    const response = await fetch(`/api/view/view-users?email=${email}`, {
      method: "GET",
    });

    const res = await response.json();
    console.log(res);
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
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-vprimary">view users page</h1>

      <div className="flex gap-3 justify-between items-center w-1/2 p-2 border-gray-300 border rounded-md">
        <div className="flex items-center gap-2">
          <Search className="vprimary" />
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md p-2 search-input w-[25rem] outline-none "
            placeholder="Enter email address..."
          />
        </div>

        <button
          onClick={() => getUserInfo(email)}
          className="rounded-md p-2 text-white bg-vprimary"
        >
          search
        </button>
      </div>
      {user && <UserDetails user={user} />}

      <div>
        <h1 className="text-2xl text-vprimary">All Users</h1>
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
            <thead className="bg-gray-50">
              <tr>
                <th>Email</th>
                <th>Manages</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users[0].map((item, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td>{item.email}</td>
                  <td>{item.manages}</td>
                  <td>
                    <div
                      className={`rounded-lg text-xl  items-center w-fit flex gap-3 px-4   ${
                        item.role === "student"
                          ? "bg-blue-100 text-vprimary rounded-xl border border-blue-300"
                          : "bg-orange-100 text-orange-500 rounded-xl border border-orange-300"
                      }`}
                    >
                      <span className="text-4xl w-full ">•</span> {item.role}
                    </div>
                  </td>
                  <td>
                    <Button className="bg-vprimary text-white ">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
