"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Mail,
  Phone,
  Loader2,
  Lock,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentInitPage({ due_id, studentInfo, amount }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const router = useRouter();
  const [dueinfo, setDueInfo] = useState(null);
  const [invoice_data, setInvoiceData] = useState(null);

  useEffect(() => {
    const getDueInfo = async () => {
      try {
        const res = await fetch(`/api/view/view-dues?roll=${studentInfo.roll}`);
        const data = await res.json();
        setDueInfo(data.data);
      } catch (error) {
        console.error("Error fetching due info:", error);
        toast.error("Failed to fetch dues");
      }
    };
    if (studentInfo?.roll) {
      getDueInfo();
    }
  }, [studentInfo]);

  const due = dueinfo?.dues?.find((due) => due._id === due_id);

  useEffect(() => {
    if (invoice_data) {
      localStorage.setItem("inv_data", JSON.stringify({ invoice_data }));
      router.push("/student/invoice");
    }
  }, [invoice_data, router]);

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Invalid payment amount");
      return;
    }

    if (!isScriptLoaded) {
      toast.error("Payment gateway is loading. Please wait.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Initializing payment...");

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (!data.orderId)
        throw new Error("Order ID is missing from API response");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "NDMS",
        description: "Due Payment Transaction",
        order_id: data.orderId,
        handler: async (response) => {
          console.log("Payment successful:", response);

          if (!response.razorpay_payment_id) {
            toast.error("Payment ID missing");
            return;
          }

          toast.success(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );

          const res = await fetch("/api/payment-success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              roll: studentInfo.roll,
              due_id: due_id,
              newPayment: amount,
              payment_Id: response.razorpay_payment_id,
            }),
          });

          const pay_data = await res.json();
          if (!pay_data.data) {
            toast.error("Error processing payment details.");
            return;
          }

          setInvoiceData({
            ...pay_data.data,
            total_amount: due?.amount || 0,
            new_amount_pending: due?.amount_pending - pay_data.data.amountPaid,
            due_date: due?.due_date,
          });
        },
        prefill: {
          name: studentInfo?.name || "Student",
          email: studentInfo?.email || "example@example.com",
          contact: studentInfo?.mobile_no || "9999999999",
        },
        theme: { color: "#3B82F6" },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const rz1 = new window.Razorpay(options);
      rz1.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
        onError={() => {
          toast.error("Failed to load payment gateway");
          setIsScriptLoaded(false);
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Secure Payment
            </CardTitle>
            <p className="text-gray-600">Complete your payment securely</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Payment Amount */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Amount to Pay</p>
              <p className="text-4xl font-bold text-gray-900">
                ₹{amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">INR</p>
            </div>

            {/* Student Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4" />
                Payment Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Student Roll</span>
                  <span className="font-medium">
                    {studentInfo.roll.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </span>
                  <span className="font-medium text-xs">
                    {studentInfo.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Mobile
                  </span>
                  <span className="font-medium">{studentInfo.mobile_no}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Security Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Security Features
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  256-bit SSL encryption
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  PCI DSS compliant
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Secure payment gateway
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Methods */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                Accepted Payment Methods
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <CreditCard className="w-3 h-3" />
                  Cards
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  UPI
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Net Banking
                </Badge>
              </div>
            </div>

            {/* Payment Button */}
            <div className="space-y-4">
              <Button
                onClick={handlePayment}
                disabled={isProcessing || !isScriptLoaded}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : !isScriptLoaded ? (
                  <>
                    <Clock className="w-5 h-5 mr-2" />
                    Loading Gateway...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Pay Securely
                  </>
                )}
              </Button>

              {!isScriptLoaded && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading payment gateway...
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 pt-4 border-t">
              <p className="flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Your payment information is secure and encrypted
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export function ToasterProvider() {
  return <Toaster position="top-center" richColors />;
}
