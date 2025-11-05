import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: "ID pembayaran diperlukan." }, { status: 400 });
    }
    await prisma.payment.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Pembayaran berhasil dihapus.",
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus pembayaran:", error);

    return NextResponse.json({ success: false, message: "Gagal menghapus pembayaran. Silakan coba lagi nanti." }, { status: 500 });
  }
}
