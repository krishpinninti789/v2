"use client";
import { Toaster, toast } from "sonner";
import React from "react";
import * as XLSX from "xlsx";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileSpreadsheet, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddStudentsPage = () => {
  const [message, setMessage] = useState("");

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile == undefined) {
      // console.log("Error invalid file");
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
        // console.log(error);
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

      // console.log("Processed Data:", studentsData); // Debugging

      // Send data to API
      const response = await fetch("/api/upload/add-students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentsData),
      });

      const result = await response.json();
      setMessage(result.message);

      if (result.success) {
        toast.success("Students data has been inserted");
        setFile(null);
      } else {
        toast.error("Students data insertion problem");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-3xl flex-col justify-center">
      <Toaster position="top-center" richColors />
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5fc1]">Admin workspace</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Import students</h1>
        <p className="mt-1 text-sm text-slate-500">Upload an Excel sheet to add student records in bulk.</p>
      </div>
      <div className="surface-card p-6 sm:p-8">
        <div
          {...getRootProps()}
          className={`relative rounded-2xl border-2 border-dashed p-12 transition-colors
          ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-slate-200"
          } hover:border-[#6a5fc1] hover:bg-violet-50/40`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex justify-center">
              <FileSpreadsheet className="h-14 w-14 text-[#6a5fc1]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-950">
                Drop your Excel file here
              </h3>
              <p className="text-sm text-muted-foreground">
                or{" "}
                <span className="cursor-pointer font-medium text-[#6a5fc1] underline">
                  browse files
                </span>{" "}
                on your computer
              </p>
            </div>

            {file && (
              <div className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-slate-700">Selected file:</span> {file.name}
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
          className="mt-4 h-12 w-full rounded-xl button-grad text-base text-white"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  );
};

export default AddStudentsPage;
