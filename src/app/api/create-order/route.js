import { NextResponse, NextRequest } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.json();
    // console.log(data);

    const order = await razorpay.orders.create({
      amount: data.amount * 100,
      currency: "INR",
      receipt: "Receipt" + Math.random().toString(36).substring(7),
    });
    return NextResponse.json({
      orderId: order.id,
      status: 200,
    });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      error: "Failed to payment",
      status: 500,
    });
  }
}
