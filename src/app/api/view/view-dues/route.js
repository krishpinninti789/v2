import Dues from "@/app/models/dues";
import connectToDB from "@/lib/db/mongodb";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function GET(req) {
  await connectToDB();
  const { searchParams } = new URL(req.url);

  const roll_no = searchParams.get("roll");
  const details = await Dues.findOne({ roll: roll_no });

  if (details) {
    return NextResponse.json({
      message: "Successfully got the student dues",
      success: true,
      data: details,
    });
  } else {
    return NextResponse.json({
      message: "Failed to get student dues data",
      success: false,
    });
  }
}
