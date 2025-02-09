import connectToDB from "@/lib/db/mongodb";
import Students from "@/app/models/students";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectToDB();

  try {
    const students = await req.json();
    // console.log(students);
    await Students.insertMany(students);

    // console.log("ress", ress);

    return NextResponse.json({ message: "Data uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading data:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
