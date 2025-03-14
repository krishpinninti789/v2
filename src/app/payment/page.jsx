"use client";
import { useState } from "react";
import Script from "next/script";

import React from "react";
import { toast, Toaster } from "sonner";

const PaymentPage = () => {
  const amount = 100;
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
      });
      const data = await response.json();

      if (data.status == 200) {
        toast.success("Payment successfull");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "NDMS",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: function () {
          // console.log("Payment successful", response);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@gmail.com",
          contact: "9876543212",
        },
        theme: {
          color: "007DFE",
        },
      };

      const rz1 = new window.Razorpay(options);
      rz1.open();
    } catch (err) {
      // console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col bg-gray-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Toaster position="top-center" richColors />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Payment page</h1>
        <p className="mb-4">Amount to pay: {amount} INR</p>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isProcessing ? "Processing...." : "Pay now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
