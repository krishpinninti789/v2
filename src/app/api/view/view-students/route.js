import Students from "@/app/models/students";
import connectToDB from "@/lib/db/mongodb";
import { NextResponse } from "next/server";
import { URL } from "url";
export async function GET(req) {
  await connectToDB();

  const { searchParams } = new URL(req.url);

  //   console.log(req.url);

  const roll_no = searchParams.get("roll");

  console.log(roll_no);
  //   console.log(typeof roll_no);

  const details = await Students.findOne({ roll: roll_no });

  console.log(details);

  if (details) {
    return NextResponse.json({
      message: "Successfully got the student data",
      data: details,
      success: true,
    });
  } else {
    return NextResponse.json({
      message: "Failed to get student data",
      success: false,
    });
  }
}
