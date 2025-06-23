"use client";

import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  Home,
  Receipt,
  User,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  Building,
  Mail,
  Phone,
  GraduationCap,
  Cloud,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock format functions - replace with your actual implementations
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const InvoicePage = () => {
  const [data, setData] = useState(null);
  const [stud, setStud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("inv_data");

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
          console.error("Error fetching student data:", error);
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
        console.error("Error posting invoice:", error);
      }
    };

    postInvoice();
  }, [data, stud]);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current || !data) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `${data.invoice_data.roll}_invoice_${data.invoice_data.paymentId}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <Card>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!data || !stud) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Invoice Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The requested invoice could not be found or has been removed.
            </p>
            <Button
              onClick={() => (window.location.href = "/student/view-dues")}
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Payment Invoice
              </h1>
              <p className="text-gray-600">
                Invoice #{data.invoice_data.paymentId.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Invoice Content */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div ref={invoiceRef} className="bg-white">
              {/* Invoice Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                      <Cloud className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">NDMS</h2>
                      <p className="text-blue-100">No Due Management System</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="text-2xl font-bold mb-2">INVOICE</h3>
                    <div className="space-y-1 text-blue-100">
                      <p className="flex items-center gap-2 justify-end">
                        <Calendar className="w-4 h-4" />
                        {formatDate(data.invoice_data.createdAt)}
                      </p>
                      <p className="flex items-center gap-2 justify-end">
                        <Clock className="w-4 h-4" />
                        {formatTime(data.invoice_data.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                {/* Payment ID and Status */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Payment ID</p>
                      <p className="font-mono text-lg font-semibold text-gray-900">
                        {data.invoice_data.paymentId}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-4 py-2">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Payment Successful
                    </Badge>
                  </div>
                </div>

                {/* Student Details */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Student Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Roll Number</p>
                          <p className="font-semibold text-gray-900">
                            {data.invoice_data.roll.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Academic Year</p>
                          <p className="font-semibold text-gray-900">
                            {stud.year}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Branch</p>
                          <p className="font-semibold text-gray-900">
                            {stud.branch}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold text-gray-900">
                            {stud.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Mobile Number</p>
                          <p className="font-semibold text-gray-900">
                            {stud.mobile_no}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Receipt className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Due Type</p>
                          <p className="font-semibold text-gray-900">
                            {data.invoice_data.due_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Payment Details */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Payment Breakdown
                  </h3>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                            Description
                          </th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            Total Due Amount
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right font-mono">
                            ₹{data.invoice_data.total_amount.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="px-6 py-4 text-sm font-semibold text-green-900">
                            Amount Paid
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-green-900 text-right font-mono">
                            ₹{data.invoice_data.amountPaid.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            Remaining Balance
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right font-mono">
                            ₹{data.invoice_data.new_amount_pending.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            Due Date
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">
                            {formatDate(data.invoice_data.due_date)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Payment Method */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold text-gray-900 capitalize">
                        {data.invoice_data.payment_mode}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Transaction Status</p>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                  <p>
                    This is a computer-generated invoice and does not require a
                    signature.
                  </p>
                  <p className="mt-1">
                    For any queries, please contact the administration office.
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="button-grad text-white px-8 py-3 text-lg font-medium"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Invoice
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/student/view-dues")}
              className="px-8 py-3 text-lg font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvoicePage;
