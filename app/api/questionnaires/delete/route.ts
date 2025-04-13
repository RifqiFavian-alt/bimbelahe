import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "ID kuesioner diperlukan." }, { status: 400 });
    }

    await prisma.questionnaire.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Kuesioner berhasil dihapus.",
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus kuesioner:", error);

    return NextResponse.json({ success: false, message: "Gagal menghapus kuesioner. Silakan coba lagi nanti." }, { status: 500 });
  }
}
