"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
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

  const showPaymentFailure = (message) => {
    sessionStorage.setItem(
      "payment_feedback",
      JSON.stringify({ status: "failed", message })
    );
    toast.error(message);
    setIsProcessing(false);
    router.push("/student/invoice?status=failed");
  };

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
        name: "ClearanceFlow",
        description: "Due Payment Transaction",
        order_id: data.orderId,
        handler: async (response) => {
          try {
            if (!response.razorpay_payment_id) {
              showPaymentFailure("Payment could not be verified. Please try again.");
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
              showPaymentFailure("Payment received, but we could not prepare your invoice.");
              return;
            }

            const invoicePayload = {
              ...pay_data.data,
              total_amount: due.amount,
              new_amount_pending: due.amount_pending - pay_data.data.amountPaid,
              due_date: due.due_date,
            };

            localStorage.setItem("inv_data", JSON.stringify(invoicePayload));
            sessionStorage.setItem(
              "payment_feedback",
              JSON.stringify({
                status: "success",
                message: "Your payment was completed successfully.",
              })
            );

            setTimeout(() => {
              router.push("/student/invoice");
            }, 1000);
          } catch (err) {
            console.error("Handler error:", err);
            showPaymentFailure("We could not confirm your payment. Please try again.");
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
            sessionStorage.setItem(
              "payment_feedback",
              JSON.stringify({
                status: "failed",
                message: "Payment was cancelled before completion.",
              })
            );
            router.push("/student/invoice?status=failed");
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
          console.error("Payment failed:", response);
          showPaymentFailure("Payment failed. Please try again.");
        });
        rz1.open();
      }, 200); // Increased timeout to allow dialog to close
    } catch (error) {
      console.error("Payment error:", error);
      showPaymentFailure("Payment failed. Please try again.");
    }
  };

  return (
    <div className="w-full">
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
        <div className="space-y-5 px-6 py-5">
          <div className="flex items-center justify-between rounded-xl bg-[#150f23] px-5 py-4 text-white">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#c2ef4e]">
                Amount to pay
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-tight">
                ₹{amount.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              INR
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <Shield className="mb-2 h-4 w-4 text-[#6a5fc1]" />
              <p className="text-xs font-medium text-slate-900">Encrypted</p>
              <p className="mt-1 text-xs text-slate-500">SSL protected</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <CheckCircle className="mb-2 h-4 w-4 text-emerald-500" />
              <p className="text-xs font-medium text-slate-900">Trusted</p>
              <p className="mt-1 text-xs text-slate-500">PCI compliant</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <Zap className="mb-2 h-4 w-4 text-[#6a5fc1]" />
              <p className="text-xs font-medium text-slate-900">Flexible</p>
              <p className="mt-1 text-xs text-slate-500">Cards, UPI & bank</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Payment methods
              </h3>
              <span className="text-xs text-slate-500">Razorpay</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1.5 border-slate-200 text-slate-600">
                <CreditCard className="h-3 w-3" />
                Cards
              </Badge>
              <Badge variant="outline" className="gap-1.5 border-slate-200 text-slate-600">
                <Zap className="h-3 w-3" />
                UPI
              </Badge>
              <Badge variant="outline" className="gap-1.5 border-slate-200 text-slate-600">
                <DollarSign className="h-3 w-3" />
                Net banking
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handlePayment}
              disabled={isProcessing || !isScriptLoaded}
              className="h-12 w-full rounded-xl bg-[#150f23] text-base font-semibold text-white hover:bg-[#422082]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing payment...
                </>
              ) : !isScriptLoaded ? (
                <>
                  <Clock className="mr-2 h-5 w-5" />
                  Loading gateway...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Pay securely
                </>
              )}
            </Button>

            {!isScriptLoaded && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Preparing secure checkout...
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500">
            <Shield className="h-3.5 w-3.5 text-[#6a5fc1]" />
            Your payment details are encrypted and never stored here.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ToasterProvider() {
  return <Toaster position="top-center" richColors />;
}
