"use client";
import { Toaster, toast } from "sonner";
import React from "react";
import * as XLSX from "xlsx";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileSpreadsheet, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddDuesPage = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile == undefined) {
      console.log("Error invalid file");
      toast.error("Error invalid file");
    } else {
      // Check if file is Excel
      if (
        uploadedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        uploadedFile.type === "application/vnd.ms-excel"
      ) {
        setFile(uploadedFile);

        setError("");
      } else {
        setError("Please upload only Excel files (.xlsx or .xls)");
        setFile(null);
        console.log(error);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },

    multiple: false,
  });

  const handleFileUpload = async (event) => {
    // const file = event.target.files[0];
    // if (!file) return;

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
        const status = row.status.split(",");
        const amount_paid = row.paid.split(";");
        const amount_pending = row.pending.split(";");
        const dueDates = row.date.split(";");

        const yeardues = dueTypes.map((type, index) => ({
          duetype: type.trim(),
          amount: parseInt(amounts[index]),
          amount_paid: parseInt(amount_paid[index]),
          amount_pending: parseInt(amount_pending[index]),
          status: status[index],
          // due_date: dueDates[index],
          due_date: new Date(dueDates[index]), // Convert Excel date
        }));

        return {
          roll: row.roll,
          year: parseInt(row.year),
          dues: yeardues,
        };
      });

      console.log("Processed Data:", dues); // Debugging

      // Send data to API
      const response = await fetch("/api/upload/add-dues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dues),
      });

      const result = await response.json();
      setMessage(result.message);
      if (result.success) {
        toast.success("Due data has been inserted");
        setFile(null);
      } else {
        toast.error(" Due data insertion problem");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Toaster position="top-center" richColors />

      <h1 className="text-2xl text-violet-600">Add Dues Details</h1>
      <div className="max-w-xl mx-auto p-6">
        <div
          {...getRootProps()}
          className={`relative border-2  border-dashed rounded-2xl p-12 transition-colors
              ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 "
              }
              hover:border-primary hover:bg-primary/5 hover:border-violet-600`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex justify-center">
              <FileSpreadsheet className="w-16 h-16 text-violet-500" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Drag & drop your Excel file
              </h3>
              <p className="text-sm text-muted-foreground">
                or{" "}
                <span className="text-primary underline cursor-pointer">
                  browse files
                </span>{" "}
                on your computer
              </p>
            </div>

            {file && (
              <div className="mt-4 text-sm text-muted-foreground">
                Selected file: {file.name}
              </div>
            )}

            {error && (
              <div className="mt-4 text-sm text-destructive">{error}</div>
            )}
          </div>
        </div>

        <Button
          onClick={handleFileUpload}
          disabled={!file}
          className="w-full mt-4 py-6 text-lg bg-violet-600 hover:bg-violet-600/90 "
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  );
};

export default AddDuesPage;
