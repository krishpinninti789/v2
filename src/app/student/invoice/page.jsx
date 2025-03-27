"use client";
import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import formatDate from "@/lib/calc/formatDate";
import formatTime from "@/lib/calc/formatTime";
import Spinner from "@/components/Spinner";

const InvoicePage = () => {
  const [data, setData] = useState(null);
  const [stud, setStud] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("inv_data");
      // console.log(storedData);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);

        try {
          const res = await fetch(
            `/api/view/view-students?roll=${parsedData?.invoice_data?.roll}`
          );
          const result = await res.json();
          setStud(result.data);
        } catch (error) {
          // console.error("Error fetching student data:", error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data || !stud) return;

    const postInvoice = async () => {
      try {
        const invoice_data = {
          ...data.invoice_data,
          year: stud.year,
          branch: stud.branch,
          mobile_no: stud.mobile_no,
          email: stud.email,
        };

        const response = await fetch("/api/invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(invoice_data),
        });

        const res = await response.json();
        console.log(res.message);
      } catch (error) {
        // console.error("Error posting invoice:", error);
      }
    };

    postInvoice();
  }, [data, stud]);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data?.invoice_data?.roll}_invoice.pdf`);
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div
        ref={invoiceRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              Payment Invoice
            </h1>
            <p className="text-gray-600">
              Payment ID: {data?.invoice_data?.paymentId}
            </p>
            <p className="text-gray-600">
              Date: {formatDate(data?.invoice_data?.createdAt)}
            </p>
            <p className="text-gray-600">
              Time: {formatTime(data?.invoice_data?.createdAt)}
            </p>
          </div>
        </div>
        <hr className="my-4" />

        <h2 className="text-lg font-semibold">Student Details</h2>
        <p>Roll Number: {data?.invoice_data?.roll?.toUpperCase()}</p>
        <p>Due Name: {data?.invoice_data?.due_name}</p>
        <p>Year: {stud?.year}</p>
        <p>Branch: {stud?.branch}</p>
        <p>Mobile No: {stud?.mobile_no}</p>
        <p>Email: {stud?.email}</p>

        <hr className="my-4" />
        <h1 className="text-lg font-semibold mb-4">Payment Details</h1>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">New Payment</th>
              <th className="border p-2">Pending Amount</th>
              <th className="border p-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="border p-2 text-right">
                {data?.invoice_data?.total_amount?.toFixed(2)}
              </td>
              <td className="border p-2 text-right">
                {data?.invoice_data?.amountPaid?.toFixed(2)}
              </td>
              <td className="border p-2 text-right">
                {data?.invoice_data?.new_amount_pending?.toFixed(2)}
              </td>
              <td className="border p-2 text-right">
                {formatDate(data?.invoice_data?.due_date)}
              </td>
            </tr>
          </tbody>
        </table>

        <hr className="my-4" />
        <p className="text-right text-lg font-bold">
          Payment Mode: {data?.invoice_data?.payment_mode}
        </p>
      </div>

      <div className="mt-4 p-3 gap-4 flex ">
        <button
          onClick={handleDownloadPDF}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-xl hover:bg-blue-600"
        >
          Download Invoice
        </button>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-xl hover:bg-blue-600"
          onClick={() => (window.location.href = "/student/view-dues")}
        >
          Go home
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
