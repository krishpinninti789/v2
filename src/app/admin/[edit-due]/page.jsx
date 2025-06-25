"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CreditCard,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Receipt,
  Building,
  GraduationCap,
  Mail,
  Phone,
  Calculator,
  Banknote,
  FileText,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { getCldImageUrl } from "next-cloudinary";

export default function EditDuePage() {
  const router = useRouter();
  const search = useSearchParams();
  const roll = search.get("roll");
  const due_id = search.get("id");

  const [dueinfo, setDueInfo] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [newPayment, setNewPayment] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!roll || !due_id) return;

      try {
        setLoading(true);

        // Fetch due information
        const dueRes = await fetch(`/api/view/view-dues?roll=${roll}`);
        const dueData = await dueRes.json();
        setDueInfo(dueData.data);

        // Fetch student information
        const studentRes = await fetch(`/api/view/view-students?roll=${roll}`);
        const studentData = await studentRes.json();
        setStudentInfo(studentData.data);
      } catch (error) {
        toast.error("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roll, due_id]);

  const due = dueinfo?.dues?.find((due) => due._id === due_id);

  const profileImageUrl = roll
    ? getCldImageUrl({
        width: 200,
        height: 200,
        src: `students/${roll}`,
      })
    : null;

  const handlePayment = async () => {
    setProcessing(true);
    setDialogOpen(false);

    const paymentAmount = Number(newPayment);
    if (paymentAmount <= 0 || paymentAmount > due.amount_pending) {
      toast.error("Invalid Payment Amount");
      setProcessing(false);
      return;
    }

    try {
      const result = await fetch("/api/update-dues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll, due_id, newPayment: paymentAmount }),
      });

      const pay_data = await result.json();

      if (result.ok) {
        const { amount, amount_pending, due_date } = { ...due };
        const new_amount_pending = amount_pending - pay_data.data.amountPaid;

        const invoice_data = {
          ...pay_data.data,
          amount,
          new_amount_pending,
          due_date,
        };

        toast.success("Payment Updated Successfully");
        setTimeout(() => {
          localStorage.setItem("inv_data", JSON.stringify({ invoice_data }));
          router.push("/admin/invoice");
        }, 1000);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleQuickAmount = (percentage) => {
    const amount = Math.round((due.amount_pending * percentage) / 100);
    setNewPayment(amount.toString());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!due || !studentInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Due Information Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The requested due information could not be found.
            </p>
            <Button onClick={() => router.back()} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Edit Due Payment
              </h1>
              <p className="text-gray-600">Update payment for {due.duetype}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column - Student & Due Information */}
          <div className="space-y-6">
            {/* Student Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-16 h-16 border-2 border-gray-200">
                    <AvatarImage
                      src={profileImageUrl || "/placeholder.svg"}
                      alt={studentInfo.name}
                    />
                    <AvatarFallback className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {studentInfo.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || roll?.slice(-2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {studentInfo.name}
                    </h3>
                    <p className="text-gray-600">
                      {studentInfo.roll.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-gray-500">Year</p>
                      <p className="font-semibold text-gray-900">
                        {studentInfo.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-gray-500">Branch</p>
                      <p className="font-semibold text-gray-900">
                        {studentInfo.branch}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900 text-xs">
                        {studentInfo.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-gray-500">Mobile</p>
                      <p className="font-semibold text-gray-900">
                        {studentInfo.mobile_no}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Due Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-blue-600" />
                    Due Details
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700 hover:bg-red-100"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {due.duetype}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Due Date:{" "}
                        {new Date(due.due_date).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{due.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600">Amount Paid</p>
                      <p className="text-2xl font-bold text-green-700">
                        ₹{due.amount_paid.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600">Amount Pending</p>
                      <p className="text-2xl font-bold text-red-700">
                        ₹{due.amount_pending.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Form */}
          <div className="space-y-6">
            {/* Payment Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="payment-amount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Enter Payment Amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <Input
                      id="payment-amount"
                      type="number"
                      value={newPayment}
                      onChange={(e) => setNewPayment(e.target.value)}
                      placeholder="0.00"
                      min="1"
                      max={due.amount_pending}
                      className="pl-8 h-12 text-lg border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Maximum amount: ₹{due.amount_pending.toLocaleString()}
                  </p>
                </div>

                {/* Quick Amount Buttons */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Quick Amount Selection
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(25)}
                      className="flex items-center gap-1"
                    >
                      <Banknote className="w-3 h-3" />
                      25%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(50)}
                      className="flex items-center gap-1"
                    >
                      <Banknote className="w-3 h-3" />
                      50%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(75)}
                      className="flex items-center gap-1"
                    >
                      <Banknote className="w-3 h-3" />
                      75%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(100)}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Full
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Payment Summary */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Payment Amount</span>
                    <span className="font-semibold">
                      ₹{Number(newPayment || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Remaining After Payment
                    </span>
                    <span className="font-semibold text-red-600">
                      ₹
                      {Math.max(
                        0,
                        due.amount_pending - Number(newPayment || 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total Payment</span>
                    <span className="text-blue-600">
                      ₹{Number(newPayment || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setDialogOpen(true)}
                  disabled={
                    !newPayment ||
                    Number(newPayment) <= 0 ||
                    Number(newPayment) > due.amount_pending ||
                    processing
                  }
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg"
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Update Payment
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-900">
                      Payment Required
                    </h3>
                    <p className="text-sm text-orange-700">
                      This due has a pending amount of ₹
                      {due.amount_pending.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Payment Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Confirm Payment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-blue-600 mb-1">Payment Amount</p>
                <p className="text-3xl font-bold text-blue-900">
                  ₹{Number(newPayment).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Due Type:</span>
                <span className="font-semibold">{due.duetype}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Student:</span>
                <span className="font-semibold">
                  {studentInfo.roll.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining After Payment:</span>
                <span className="font-semibold text-red-600">
                  ₹
                  {Math.max(
                    0,
                    due.amount_pending - Number(newPayment)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={processing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Payment
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
