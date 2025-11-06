import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, questions, review } = await req.json();
    if (!name || !email || !questions || questions.length === 0 || !review) {
      return NextResponse.json({ success: false, message: "Semua kolom wajib diisi, kecuali bagian ulasan (review)." }, { status: 400 });
    }

    const questionnaire = await prisma.questionnaire.create({
      data: { name, email, questions, review },
    });

    return NextResponse.json({
      success: true,
      message: "Kuesioner berhasil disimpan.",
      data: questionnaire,
    });
  } catch (error) {
    console.error("Error saat menyimpan kuesioner:", error);
    return NextResponse.json({ success: false, message: "Gagal menyimpan kuesioner. Silakan coba lagi nanti." }, { status: 500 });
  }
}
