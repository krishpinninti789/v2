import connectToDB from "@/lib/db/mongodb";

import Dues from "@/app/models/dues";
import Payment from "@/app/models/payments";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();

  try {
    const { roll, due_id, newPayment } = await req.json();
    // console.log(roll, due_id, newPayment);

    const studentDues = await Dues.findOneAndUpdate(
      { roll: roll, "dues._id": due_id },
      {
        $inc: {
          "dues.$.amount_paid": newPayment,
          "dues.$.amount_pending": -newPayment,
        },
      },

      { new: true }
    );

    // console.log(studentDues);
    const updatedDue = studentDues.dues.find((due) => due._id == due_id);
    // const updatedDue = studentDues.dues;
    if (updatedDue.amount_pending == 0) {
      updatedDue.status = "paid";
    }
    // console.log(updatedDue);

    await studentDues.save();

    const generatePaymentId = () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let randomString = "";
      for (let i = 0; i < 14; i++) {
        randomString += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return `pay_${randomString}`;
    };

    const paymentId = generatePaymentId();
    const payment_mode = "cash";
    const due_name = updatedDue.duetype;

    const paymentData = new Payment({
      roll,
      due_id,
      due_name,
      amountPaid: newPayment,
      paymentId,
      payment_mode,
      createdAt: new Date(),
    });
    await paymentData.save();

    return NextResponse.json({
      message: "Due Updated successfully",
      success: true,
      data: paymentData,
    });
  } catch (err) {
    console.error("Error updating due:", err);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
