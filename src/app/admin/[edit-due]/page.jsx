// import React from "react";

// const EditDuePage = () => {
//   return <div>EditDuePage</div>;
// };
"use client";
// export default EditDuePage;
import use from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function EditDue() {
  const router = useRouter();

  const search = useSearchParams();
  const roll = search.get("roll");
  const due_id = search.get("id");
  const [dueinfo, setDueInfo] = useState(null);
  const [newPayment, setNewPayment] = useState("");

  // console.log(due_id);
  // console.log(roll);

  useEffect(() => {
    const get = async () => {
      const res = await fetch(`/api/view/view-dues?roll=${roll}`, {
        method: "GET",
      });
      const data = await res.json();
      setDueInfo(data.data);
    };
    get();
  }, [roll]);

  // console.log(dueinfo);

  const due = dueinfo?.dues.find((due) => due._id === due_id);
  // console.log(due);

  const handlePayment = async () => {
    const result = await fetch("/api/update-dues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roll, due_id, newPayment }),
    });

    // console.log(result.ok);

    if (result.ok) {
      toast.success("Payment Updated Successfully");
      setTimeout(() => {
        router.push("/admin/view-dues");
      }, 2000);
    }
  };

  if (!due) return <p>Loading...</p>;

  return (
    <div>
      <Toaster position="top-center" richColors />
      <h2>Edit Due for {due.duetype}</h2>
      <p>Total Due: {due.amount}</p>
      <p>Amount Paid: {due.amount_paid}</p>
      <p>Pending Due: {due.amount_pending}</p>
      {/* <h2>Edit Due for </h2> */}

      <label>New Payment:</label>
      <input
        className="rounded-xl p-3"
        type="number"
        value={newPayment}
        onChange={(e) => setNewPayment(Number(e.target.value))}
      />
      <button
        onClick={handlePayment}
        className="bg-vprimary rounded-xl text-white p-2"
      >
        Submit Payment
      </button>
    </div>
  );
}
