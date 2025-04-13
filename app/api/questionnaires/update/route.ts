import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { id, isFeatured } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "ID kuesioner diperlukan." }, { status: 400 });
    }

    const updatedQuestionnaire = await prisma.questionnaire.update({
      where: { id },
      data: { isFeatured },
    });

    return NextResponse.json({
      success: true,
      data: updatedQuestionnaire,
      message: `Kuesioner berhasil ${isFeatured ? "ditampilkan" : "disembunyikan"} sebagai unggulan.`,
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui kuesioner:", error);
    return NextResponse.json({ success: false, message: "Gagal memperbarui kuesioner. Silakan coba lagi nanti." }, { status: 500 });
  }
}
