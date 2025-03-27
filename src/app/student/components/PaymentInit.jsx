"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

export default function PaymentInitPage({ due_id, studentInfo, amount }) {
  const [isProcessing, setIsProcessing] = useState(false);
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
        // console.error("Error fetching due info:", error);
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
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async function (response) {
          // console.log("Payment successful:", response);

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
          name: studentInfo?.name || "John Doe",
          email: studentInfo?.email || "example@example.com",
          contact: studentInfo?.mobile_no || "9999999999",
        },
        theme: { color: "#007DFE" },
      };

      const rz1 = new window.Razorpay(options);
      rz1.open();
    } catch (error) {
      // console.error("Payment error:", error);
      toast.error("Payment failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Opening Payment Gateway</h1>
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

export function ToasterProvider() {
  return <Toaster position="top-center" richColors />;
}
