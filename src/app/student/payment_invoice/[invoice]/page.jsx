"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import Spinner from "@/components/Spinner";
import formatDate from "@/lib/calc/formatDate";
import formatTime from "@/lib/calc/formatTime";

const PaymentInvoicePage = () => {
  const [invoice_data, setInvoiceData] = useState(null);
  const searchParams = useSearchParams();
  const payid = searchParams.get("payid");
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null);
  //   console.log(payid);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const result = await fetch(`/api/get-invoice?payid=${payid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const res = await result.json();
      // console.log(res);
      setInvoiceData(res?.data);
      setLoading(false);
    };
    fetchInvoiceData();
  }, [payid]);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${invoice_data?.roll}_invoice.pdf`);
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
              Payment ID: {invoice_data?.paymentId}
            </p>
            <p className="text-gray-600">
              Date: {formatDate(invoice_data?.createdAt)}
            </p>
            <p className="text-gray-600">
              Time: {formatTime(invoice_data?.createdAt)}
            </p>
          </div>
        </div>
        <hr className="my-4" />

        <h2 className="text-lg font-semibold">Student Details</h2>
        <p>Roll Number: {invoice_data?.roll?.toUpperCase()}</p>
        <p>Due Name: {invoice_data?.due_name}</p>
        <p>Year: {invoice_data?.year}</p>
        <p>Branch: {invoice_data?.branch}</p>
        <p>Mobile No: {invoice_data?.mobile_no}</p>
        <p>Email: {invoice_data?.email}</p>

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
                {invoice_data?.amount?.toFixed(2)}
              </td>
              <td className="border p-2 text-right">
                {invoice_data?.amountPaid?.toFixed(2)}
              </td>
              <td className="border p-2 text-right">
                {invoice_data?.new_amount_pending?.toFixed(2)}
              </td>
              <td className="border p-2 text-right">
                {formatDate(invoice_data?.due_date)}
              </td>
            </tr>
          </tbody>
        </table>

        <hr className="my-4" />
        <p className="text-right text-lg font-bold">
          Payment Mode: {invoice_data?.payment_mode}
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

export default PaymentInvoicePage;
