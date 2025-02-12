import mongoose from "mongoose";
import connectToDB from "@/lib/db/mongodb";
import Students from "@/app/models/students";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const data = await req.json();

    console.log(data);

    const result = await Students.insertMany(data);

    if (result) {
      return NextResponse.json({
        message: "successfully inserted students data",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Error inserting students data",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
