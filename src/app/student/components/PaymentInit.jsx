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

export default function PaymentInitPage({
  due_id,
  studentInfo,
  amount,
  onDialogClose, // Add this prop to receive the close function from parent
}) {
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

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Invalid payment amount");
      return;
    }

    if (!isScriptLoaded || typeof window === "undefined" || !window.Razorpay) {
      toast.error("Payment gateway is loading or unavailable. Please wait.");
      return;
    }

    if (!due) {
      toast.error("Due details not found.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (!data.orderId) throw new Error("Order ID is missing");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "NDMS",
        description: "Due Payment Transaction",
        order_id: data.orderId,
        handler: async (response) => {
          try {
            if (!response.razorpay_payment_id) {
              toast.error("Payment ID missing");
              setIsProcessing(false);
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
                due_id,
                newPayment: amount,
                payment_Id: response.razorpay_payment_id,
              }),
            });

            const pay_data = await res.json();

            if (!pay_data.data) {
              toast.error("Error processing payment details.");
              return;
            }

            const invoicePayload = {
              ...pay_data.data,
              total_amount: due.amount,
              new_amount_pending: due.amount_pending - pay_data.data.amountPaid,
              due_date: due.due_date,
            };

            localStorage.setItem("inv_data", JSON.stringify(invoicePayload));

            setTimeout(() => {
              router.push("/student/invoice");
            }, 1000);
          } catch (err) {
            console.error("Handler error:", err);
            toast.error("Failed to process payment data");
          } finally {
            setIsProcessing(false);
          }
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
            // Optionally reopen parent dialog if payment was cancelled
            // onDialogClose?.(false); // false means don't close permanently
          },
        },
      };

      // ✅ Close parent dialog before opening Razorpay
      if (onDialogClose) {
        onDialogClose(true); // true means close the dialog
      }

      // Alternative method 1: Try to close any open dialogs programmatically
      // This targets common dialog implementations
      const closeButtons = document.querySelectorAll(
        '[data-dialog-close], [aria-label="Close"], button[aria-label="Close dialog"]'
      );
      closeButtons.forEach((button) => {
        if (button.closest('[role="dialog"]')) {
          button.click();
        }
      });

      // Alternative method 2: Dispatch escape key event to close dialogs
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          keyCode: 27,
          which: 27,
          bubbles: true,
        })
      );

      // ✅ Razorpay needs user gesture — slight timeout helps
      setTimeout(() => {
        const rz1 = new window.Razorpay(options);
        rz1.on("payment.failed", function (response) {
          toast.error("Payment failed. Please try again.");
          console.error("Payment failed:", response);
          setIsProcessing(false);
        });
        rz1.open();
      }, 200); // Increased timeout to allow dialog to close
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
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Amount to Pay</p>
              <p className="text-4xl font-bold text-gray-900">
                ₹{amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">INR</p>
            </div>

            <Separator orientation="vertical" />

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
