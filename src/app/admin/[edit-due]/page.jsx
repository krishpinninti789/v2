"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EditDue() {
  const router = useRouter();
  const search = useSearchParams();
  const roll = search.get("roll");
  const due_id = search.get("id");

  const [dueinfo, setDueInfo] = useState(null);
  const [newPayment, setNewPayment] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getDueInfo = async () => {
      const res = await fetch(`/api/view/view-dues?roll=${roll}`);
      const data = await res.json();
      setDueInfo(data.data);
    };
    getDueInfo();
  }, [roll]);

  const due = dueinfo?.dues.find((due) => due._id === due_id);
  // console.log(due);

  const handlePayment = async () => {
    setDialogOpen(false);

    if (newPayment <= 0 || newPayment > due.amount_pending) {
      toast.error("Invalid Payment Amount");
      return;
    }

    const result = await fetch("/api/update-dues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roll, due_id, newPayment }),
    });

    const pay_data = await result.json();

    const { amount, amount_pending, due_date } = { ...due };

    const new_amount_pending = amount_pending - pay_data.data.amountPaid;

    const invoice_data = {
      ...pay_data.data,
      amount,
      new_amount_pending,
      due_date,
    };
    // console.log(invoice_data);

    if (result.ok) {
      toast.success("Payment Updated Successfully");
      setTimeout(() => {
        localStorage.setItem("inv_data", JSON.stringify({ invoice_data }));
        router.push("/admin/invoice");
      }, 500);
    }
  };

  if (!due) return <p>Loading...</p>;

  return (
    <div className="p-6 flex flex-col shadow-xl rounded-md justify-center self-center items-center w-fit ">
      <Toaster position="top-center" richColors />
      <h2 className="text-2xl font-bold">Edit Due for {due.duetype}</h2>
      <p className="mt-2">
        Total Due: <strong>{due.amount}</strong>
      </p>
      <p>
        Amount Paid: <strong>{due.amount_paid}</strong>
      </p>
      <p className="text-red-600">
        Pending Due: <strong>{due.amount_pending}</strong>
      </p>

      <label className="block mt-4 font-semibold">New Payment:</label>
      <input
        className="rounded-xl p-3 border w-full mt-2"
        type="number"
        value={newPayment}
        onChange={(e) => setNewPayment(Number(e.target.value))}
      />

      <button
        onClick={() => setDialogOpen(true)}
        className="button-grad  rounded-xl p-2 mt-4 w-full"
      >
        Pay
      </button>

      {/* Payment Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>Confirm Payment</DialogTitle>
          <p className="text-lg font-medium">
            Paying <strong>{newPayment}</strong> for {due.duetype}
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="button-grad" onClick={handlePayment}>
              Pay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
