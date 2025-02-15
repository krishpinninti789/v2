import connectToDB from "@/lib/db/mongodb";
import Dues from "@/app/models/dues";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectToDB();

  try {
    const dues = await req.json();
    // console.log(students);
    await Dues.insertMany(dues);

    // console.log("ress", ress);

    return NextResponse.json({
      message: "Data uploaded successfully!",
      success: true,
    });
  } catch (error) {
    console.error("Error uploading data:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
