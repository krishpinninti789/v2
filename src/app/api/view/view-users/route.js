import connectToDB from "@/lib/db/mongodb";
import { NextResponse } from "next/server";
import Users from "@/app/models/users";
import { URL } from "url";
export async function GET(req) {
  await connectToDB();

  const { searchParams } = new URL(req.url);

  //   console.log(req.url);

  const email = searchParams.get("email");

  // console.log(roll_no);
  //   console.log(typeof roll_no);

  if (email) {
    const details = await Users.findOne({ email: email });

    // console.log(details);

    if (details) {
      return NextResponse.json({
        message: "Successfully got the users data",
        data: details,
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Failed to get users data",
        success: false,
      });
    }
  } else {
    const allUsers = await Users.find();
    if (allUsers) {
      return NextResponse.json({
        message: "Successfully get all users data",
        data: allUsers,
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Failed to get all users data",
        success: false,
      });
    }
  }
}
