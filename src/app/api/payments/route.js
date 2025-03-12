import { NextResponse } from "next/server";

export async function GET(req) {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  try {
    const response = await fetch("https://api.razorpay.com/v1/payments", {
      method: "GET",
      //   auth: {
      //     username: key_id,
      //     password: key_secret,
      //   },
      headers: {
        Authorization: `Basic ${Buffer.from(`${key_id}:${key_secret}`).toString(
          "base64"
        )}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return NextResponse.json({
      status: 200,
      message: "Payments successfully fetched",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Payments failed fetching",
    });
  }
}
