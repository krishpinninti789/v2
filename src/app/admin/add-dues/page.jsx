"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

const AddDuesPage = () => {
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
      const dues = jsonData.map((row) => {
        const dueTypes = row.duetype.split(",");
        const amounts = row.amount.split(";");
        // const status = row.status.split(';');
        // const amount_paid = row.amount_paid.split(';');
        // const amount_pending = row.amount_pending.split(';');
        // const dueDates = row.date.split(";");

        const semdues = dueTypes.map((type, index) => ({
          duetype: type.trim(),
          amount: parseInt(amounts[index]),
          // status:status[index]
          // due_date: new Date(Number(dueDates[index]) * 24 * 60 * 60 * 1000), // Convert Excel date
        }));

        return {
          roll: row.roll,
          sem: parseInt(row.sem),
          semdues,
        };
      });

      // console.log("Processed Data:", students); // Debugging

      // Send data to API
      const response = await fetch("/api/upload/add-students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dues),
      });

      const result = await response.json();
      setMessage(result.message);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddDuesPage;
