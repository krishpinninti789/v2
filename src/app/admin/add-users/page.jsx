"use client";
import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import bcrypt from "bcryptjs";

const AddUsersPage = () => {
  const [message, setMessage] = useState("");
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      console.log(jsonData);

      const hashedPasswords = await Promise.all(
        jsonData.map(async (row) => {
          return await bcrypt.hash(row.password, 10);
        })
      );

      // console.log(hashedPasswords);

      // Process data
      const usersData = jsonData.map((row, i) => {
        return {
          email: row.email,
          password: hashedPasswords[i], //encode the password and send to db
          first_login: row.first_login,
          role: row.role,
          manages: row.manages,
        };
      });

      console.log("Processed Data:", usersData); // Debugging

      // Send data to API
      const response = await fetch("/api/upload/add-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usersData),
      });

      const result = await response.json();
      setMessage(result.message);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1 className="text-2xl text-violet-600">Add Users Details</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddUsersPage;
