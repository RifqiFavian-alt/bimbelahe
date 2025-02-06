import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { paymentId, status } = await req.json();

    if (!paymentId || typeof status !== "boolean") {
      return NextResponse.json({ success: false, message: "Invalid input" }, { status: 400 });
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { isPaid: status, paidAt: status ? new Date() : null },
    });

    return NextResponse.json({
      success: true,
      message: "Payment updated successfully",
      data: updatedPayment,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update payment", error: error }, { status: 500 });
  }
}
