import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { paymentId, status } = await req.json();

    if (!paymentId || typeof status !== "boolean") {
      return NextResponse.json({ success: false, message: "Data yang diberikan tidak valid." }, { status: 400 });
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { isPaid: status, paidAt: status ? new Date() : null },
    });

    return NextResponse.json({
      success: true,
      message: "Status pembayaran berhasil diperbarui.",
      data: updatedPayment,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal memperbarui status pembayaran.", error: error }, { status: 500 });
  }
}
