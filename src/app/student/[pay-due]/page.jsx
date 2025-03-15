"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import PaymentInitPage from "../components/PaymentInit";

const PaymentPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const roll = params.get("roll");
  const due_id = params.get("id");

  const [dueinfo, setDueInfo] = useState(null);
  const [newPayment, setNewPayment] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [pay, setPay] = useState(false);

  useEffect(() => {
    if (!roll || !due_id) return;

    const getStudent = async () => {
      try {
        const response1 = await fetch(`/api/view/view-students?roll=${roll}`);
        const res1 = await response1.json();
        setStudentInfo(res1.data);

        const response2 = await fetch(`/api/view/view-dues?roll=${roll}`);
        const res2 = await response2.json();
        setDueInfo(res2.data.dues);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getStudent();
  }, [roll, due_id]);

  const due = dueinfo?.find((due) => due._id === due_id);

  // Fixed: Delay state update to avoid React rendering issues
  const handlePayment = () => {
    if (newPayment > 0) {
      setTimeout(() => setPay(true), 0); //  Ensures React updates state after render cycle
    } else {
      toast.error("Enter a valid payment amount.");
    }
  };

  return (
    <div>
      <Toaster position="top-center" richColors />
      {due ? (
        <div>
          <h2>Edit Due for {due.duetype}</h2>
          <p>Total Due: {due.amount}</p>
          <p>Amount Paid: {due.amount_paid}</p>
          <p>Pending Due: {due.amount_pending}</p>

          <label>New Payment:</label>
          <input
            className="rounded-xl p-3"
            type="number"
            value={newPayment}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : "";
              setNewPayment(value);
            }}
          />

          <button
            className="bg-vprimary rounded-xl text-white p-2"
            onClick={handlePayment}
          >
            Pay
          </button>

          {pay && (
            <PaymentInitPage
              due_id={due_id}
              studentInfo={studentInfo}
              amount={newPayment}
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentPage;
