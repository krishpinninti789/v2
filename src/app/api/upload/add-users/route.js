import mongoose from "mongoose";
import connectToDB from "@/lib/db/mongodb";
import Users from "@/app/models/users";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const users = await req.json();

    // console.log(users);

    const result = await Users.insertMany(users);

    if (result) {
      return NextResponse.json({
        message: "successfully inserted users data",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Error inserting users data",
        success: false,
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "Error in data reading",
      success: false,
    });
  }
}
