import connectToDB from "@/lib/db/mongodb";
import Payment from "@/app/models/payments";
import { URL } from "url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    await connectToDB();
    const roll = searchParams.get("roll");
    const details = await Payment.find({ roll: roll });
    // console.log(details);

    if (details) {
      return NextResponse.json({
        message: "Succesfully got payment details",
        success: true,
        data: details,
      });
    } else {
      return NextResponse.json({
        message: "Failed to get payments",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Failed to connect to payments",
      success: false,
    });
  }
}
