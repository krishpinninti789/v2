import connectToDB from "@/lib/db/mongodb";

import Dues from "@/app/models/dues";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();

  try {
    const { roll, due_id, newPayment } = await req.json();
    console.log(roll, due_id, newPayment);

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
    console.log(updatedDue);

    await studentDues.save();

    return NextResponse.json({
      message: "Due Updated successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error updating due:", err);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
