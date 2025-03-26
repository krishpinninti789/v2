import connectToDB from "@/lib/db/mongodb";
import { NextResponse } from "next/server";
import Invoice from "@/app/models/invoices";

export async function POST(req) {
  try {
    connectToDB();

    const data = req.json();
    console.log(data);
    const invoice = new Invoice(data);
    const res = await invoice.save();
    if (res) {
      return NextResponse.json({
        message: "Invoice generated successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Failed to generate invoice",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Failed to generate invoice",
      success: false,
    });
  }
}
