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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
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
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Make Payment</h1>
              <p className="text-gray-600">
                Complete your due payment securely
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Student Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Roll Number</p>
                    <p className="font-semibold text-gray-900">
                      {studentInfo.roll.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Academic Year</p>
                    <p className="font-semibold text-gray-900">
                      {studentInfo.year}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Branch</p>
                    <p className="font-semibold text-gray-900">
                      {studentInfo.branch}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">
                      {studentInfo.email}
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
                  <AlertCircle className="w-3 h-3 mr-1" />
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{due.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Amount Paid</p>
                    <p className="text-xl font-bold text-green-700">
                      ₹{due.amount_paid.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600">Amount Pending</p>
                    <p className="text-xl font-bold text-red-700">
                      ₹{due.amount_pending.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Payment Amount
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
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg"
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Complete Payment
            </DialogTitle>
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
