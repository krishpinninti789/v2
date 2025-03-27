"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
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
        // setStudentInfo(res.data.student);
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
    if (!newPayment || newPayment <= 0 || newPayment > due.amount_pending) {
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
      <p className="text-center text-gray-500">Loading payment details...</p>
    );
  }

  return (
    <div className={`relative ${pay ? "overflow-hidden h-screen" : ""}`}>
      <Toaster position="top-center" richColors />
      <div
        className={`max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg transition-all duration-300 ${
          pay ? "blur-md" : ""
        }`}
      >
        {due ? (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Payment for {due.duetype}
            </h2>
            <p className="text-gray-600 mb-2">Total Due: ₹{due.amount}</p>
            <p className="text-gray-600">Amount Paid: ₹{due.amount_paid}</p>
            <p className="text-red-500 font-bold mb-4">
              Pending Due: ₹{due.amount_pending}
            </p>

            <label className="block text-gray-700 font-medium mb-1">
              Enter Payment Amount:
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              value={newPayment}
              onChange={(e) => setNewPayment(Number(e.target.value))}
              placeholder="Enter amount"
              min="1"
              max={due.amount_pending}
            />

            <button
              className={`w-full mt-4 py-2 rounded-lg text-white font-semibold ${
                newPayment > 0
                  ? "button-grad"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handlePayment}
              disabled={!newPayment || newPayment <= 0}
            >
              Pay Now
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500">No due details found.</p>
        )}
      </div>

      {/* Payment Modal */}
      {pay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closePaymentModal}
            >
              ✖
            </button>
            <PaymentInitPage
              due_id={due_id}
              studentInfo={studentInfo}
              amount={newPayment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
