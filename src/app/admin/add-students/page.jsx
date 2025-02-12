"use client";
import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";

const AddStudentsPage = () => {
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

      // Process data
      const studentsData = jsonData.map((row) => {
        return {
          name: row.name,
          roll: row.roll,
          year: row.year,
          branch: row.branch,
          mobile_no: row.mobile_no,
          parent_mobile_no: row.parent_mobile_no,
          address: row.address,
          email: row.email,
          type: row.type,
        };
      });

      console.log("Processed Data:", studentsData); // Debugging

      // Send data to API
      const response = await fetch("/api/upload/add-students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentsData),
      });

      const result = await response.json();
      setMessage(result.message);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1 className="text-2xl text-violet-600">Add Students Details</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddStudentsPage;
