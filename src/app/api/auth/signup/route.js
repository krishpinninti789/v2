import connectToDB from "@/lib/db/mongodb";
import Users from "@/app/models/users";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();

  const { email, password } = body;

  console.log(body);

  await connectToDB();

  // const users = await Users.collection();

  // console.log(users);

  const existingUser = await Users.findOne({ email });

  console.log(existingUser);

  if (existingUser) {
    return NextResponse.json({
      success: false,
      message: "Already user exist",
    });
  } else {
    const newUser = Users.create(body);
    if (newUser) {
      return NextResponse.json({
        success: true,
        message: "Successfully created a user",
      });
    }
  }
}
