import connectToDB from "@/lib/db/mongodb";
import { URL } from "url";
import Invoice from "@/app/models/invoices";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const payid = searchParams.get("payid");

  const invoice_data = await Invoice.findOne({ paymentId: payid });
  // console.log(invoice_data);

  if (invoice_data) {
    return NextResponse.json({
      message: "Successfully get the payment invoice info",
      success: true,
      data: invoice_data,
    });
  } else {
    return NextResponse.json({
      message: "Failed to get invoice info",
      success: false,
    });
  }
}
