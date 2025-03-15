"use client";
import { useState } from "react";
import Script from "next/script";
import { toast, Toaster } from "sonner";

export default function PaymentInitPage({ due_id, studentInfo, amount }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Invalid payment amount");
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
      console.log(data);
      if (!data.orderId) {
        throw new Error("Order ID is missing from API response");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is set in .env.local
        amount: amount * 100, // Convert to paisa
        currency: "INR",
        name: "NDMS",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async function (response) {
          console.log("Payment successful:", response);

          const paymentId = response.razorpay_payment_id;
          // const orderId = response.razorpay_order_id;
          // const signature = response.razorpay_signature;

          if (!paymentId) {
            toast.error("Payment ID missing");
            return;
          }

          toast.success(`Payment successful! Payment ID: ${paymentId}`);

          // Send payment success details to the backend
          await fetch("/api/payment-success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              roll: studentInfo.roll,
              due_id: due_id,
              newPayment: amount,
              payment_Id: paymentId,
            }),
          });
        },
        prefill: {
          name: studentInfo?.name || "John Doe",
          email: studentInfo?.email || "example@example.com",
          contact: studentInfo?.mobile_no || "9999999999",
        },
        theme: { color: "#007DFE" },
      };

      const rz1 = new window.Razorpay(options);
      rz1.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col bg-gray-100">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
        <p className="mb-4">Amount to pay: {amount} INR</p>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

// Add Toaster outside your component
export function ToasterProvider() {
  return <Toaster position="top-center" richColors />;
}
