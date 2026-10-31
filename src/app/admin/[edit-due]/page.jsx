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
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
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
      <div className="flex min-h-[55vh] items-center justify-center">
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
    <div className="mx-auto max-w-5xl">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5fc1]">
            Admin workspace
          </p>
          <div className="mt-1 flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                Update due payment
              </h1>
              <p className="text-sm text-slate-500">Record a payment for {due.duetype}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column - Student & Due Information */}
          <div className="space-y-6">
            {/* Student Information */}
            <Card className="surface-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-[#6a5fc1]" />
                  Student information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-16 h-16 border-2 border-gray-200">
                    <AvatarImage
                      src={profileImageUrl || "/placeholder.svg"}
                      alt={studentInfo.name}
                    />
                    <AvatarFallback className="bg-[#150f23] text-lg font-bold text-[#c2ef4e]">
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
            <Card className="surface-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-[#6a5fc1]" />
                    Due details
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-rose-50 text-rose-700 hover:bg-rose-50"
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
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Total amount</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{due.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                      <p className="text-xs text-emerald-600">Amount paid</p>
                      <p className="text-2xl font-bold text-green-700">
                        ₹{due.amount_paid.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                      <p className="text-xs text-rose-600">Amount pending</p>
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
            <Card className="surface-card lg:sticky lg:top-24">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calculator className="h-4 w-4 text-[#6a5fc1]" />
                  Payment details
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
                      className="h-12 border-slate-300 pl-8 text-lg focus:border-[#6a5fc1]"
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
                  className="h-12 w-full rounded-xl button-grad text-base font-semibold text-white"
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
        <DialogContent className="max-w-lg overflow-hidden rounded-2xl border-slate-200 bg-slate-50 p-0 shadow-2xl">
          <DialogHeader className="border-b border-slate-200 bg-white px-6 py-5">
            <DialogTitle className="flex items-center gap-3 text-base text-slate-950">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#150f23] text-[#c2ef4e]">
                <CreditCard className="h-4 w-4" />
              </span>
              Confirm payment update
            </DialogTitle>
            <p className="pl-12 text-sm text-slate-500">
              Review the payment details before updating this student record.
            </p>
          </DialogHeader>
          <div className="space-y-5 px-6 py-5">
            <div className="flex items-center justify-between rounded-xl bg-[#150f23] px-5 py-4 text-white">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#c2ef4e]">
                  Payment amount
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">
                  ₹{Number(newPayment).toLocaleString()}
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                INR
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-slate-900">
                Payment summary
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Due type</span>
                  <span className="text-right font-medium text-slate-900">{due.duetype}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Student</span>
                  <span className="font-medium text-slate-900">{studentInfo.roll.toUpperCase()}</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
                  <span className="text-slate-500">Remaining after payment</span>
                  <span className="font-semibold text-rose-600">
                    ₹
                    {Math.max(
                      0,
                      due.amount_pending - Number(newPayment)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="border-t border-slate-200 bg-white px-6 py-4">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={processing}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={processing}
              className="rounded-xl button-grad text-white hover:bg-[#422082]"
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
