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
} from "@/components/ui/dialog";
import {
  CreditCard,
  DollarSign,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Receipt,
  Building,
  GraduationCap,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import PaymentInitPage from "../../components/PaymentInit";

const PaymentPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const roll = params.get("roll");
  const due_id = params.get("id");

  const [due, setDue] = useState(null);
  const [dueinfo, setDueInfo] = useState(null);
  const [newPayment, setNewPayment] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [pay, setPay] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roll || !due_id) return;

    const getStudentAndDues = async () => {
      try {
        setLoading(true);
        const response1 = await fetch(`/api/view/view-students?roll=${roll}`);
        const res1 = await response1.json();
        setStudentInfo(res1.data);

        const response = await fetch(`/api/view/view-dues?roll=${roll}`);
        const res = await response.json();
        setDueInfo(res.data.dues);
        const foundDue = res.data.dues.find((d) => d._id === due_id);
        setDue(foundDue);
      } catch (error) {
        toast.error("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getStudentAndDues();
  }, [roll, due_id]);

  const handlePayment = () => {
    const paymentAmount = Number(newPayment);
    if (
      !newPayment ||
      paymentAmount <= 0 ||
      paymentAmount > (due?.amount_pending || 0)
    ) {
      toast.error("Enter a valid payment amount.");
      return;
    }
    setPay(true);
  };

  const closePaymentModal = () => {
    setPay(false);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-9 w-20" />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!due || !studentInfo) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Details Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The requested payment information could not be found.
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

      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5fc1]">
            Student payments
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            Pay your outstanding due
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review the details below and choose how much you want to pay.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.back()} className="self-start sm:self-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dues
        </Button>
      </div>

      {/* Main Content */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-5">
            {/* Student Information */}
            <Card className="surface-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-[#6a5fc1]" />
                  Student information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Roll number</p>
                    <p className="font-semibold text-slate-900">
                      {studentInfo.roll.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Academic year</p>
                    <p className="font-semibold text-slate-900">
                      {studentInfo.year}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Branch</p>
                    <p className="font-semibold text-slate-900">
                      {studentInfo.branch}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="break-all font-semibold text-slate-900">
                      {studentInfo.email}
                    </p>
                  </div>
                </div>
                </div>
              </CardContent>
            </Card>

            {/* Due Details */}
            <Card className="surface-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-[#6a5fc1]" />
                  Due details
                </div>
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-700 hover:bg-red-100"
                >
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Pending
                </Badge>
              </CardTitle>
              </CardHeader>
              <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {due.duetype}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Total amount</p>
                    <p className="text-xl font-bold text-slate-900">
                      ₹{due.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <p className="text-xs text-emerald-600">Amount paid</p>
                    <p className="text-xl font-bold text-green-700">
                      ₹{due.amount_paid.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                    <p className="text-xs text-rose-600">Amount pending</p>
                    <p className="text-xl font-bold text-red-700">
                      ₹{due.amount_pending.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <Card className="surface-card lg:sticky lg:top-24">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4 text-[#6a5fc1]" />
                Payment amount
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

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Payment Amount</span>
                  <span className="font-semibold">
                    ₹{Number(newPayment || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold">₹0.00</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-600">
                    ₹{Number(newPayment || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={
                  !newPayment ||
                  Number(newPayment) <= 0 ||
                  Number(newPayment) > due.amount_pending
                }
                className="w-full h-12 button-grad hover:button-grad text-white font-semibold text-lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Secure payment powered by industry-standard encryption
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <Dialog open={pay} onOpenChange={setPay}>
        <DialogContent className="max-w-lg overflow-hidden rounded-2xl border-slate-200 bg-slate-50 p-0 shadow-2xl">
          <DialogHeader className="border-b border-slate-200 bg-white px-6 py-5">
            <DialogTitle className="flex items-center gap-3 text-base text-slate-950">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#150f23] text-[#c2ef4e]">
                <CreditCard className="h-4 w-4" />
              </span>
              Confirm your payment
            </DialogTitle>
            <p className="pl-12 text-sm text-slate-500">
              You will be redirected to our secure payment gateway.
            </p>
          </DialogHeader>
          <PaymentInitPage
            due_id={due_id}
            studentInfo={studentInfo}
            amount={Number(newPayment)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentPage;
