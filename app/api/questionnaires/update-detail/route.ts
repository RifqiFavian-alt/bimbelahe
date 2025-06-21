import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const { id, name, email, review } = await req.json();

    if (!id || !name || !email || !review) {
      return NextResponse.json({ success: false, message: "Data kuesioner tidak lengkap." }, { status: 400 });
    }

    const updateData: Partial<Prisma.QuestionnaireUpdateInput> = { name, review, email };

    const updatedQuestionnaire = await prisma.questionnaire.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Data kuesioner berhasil diperbarui.",
      data: updatedQuestionnaire,
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui pengguna:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ success: false, message: "Pengguna tidak ditemukan." }, { status: 404 });
      }
    }

    return NextResponse.json({ success: false, message: "Gagal memperbarui data pengguna." }, { status: 500 });
  }
}
