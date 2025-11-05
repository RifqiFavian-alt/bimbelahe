import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const studentName = searchParams.get("name");
    const isFeatured = searchParams.get("isFeatured") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return NextResponse.json({ success: false, message: "Parameter halaman atau batas tidak valid." }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    const filters: Prisma.QuestionnaireWhereInput = {};

    if (studentName) {
      filters.name = { contains: studentName, mode: "insensitive" };
    }

    if (isFeatured) {
      filters.isFeatured = isFeatured;
    }

    if (id) {
      filters.id = id;
    }

    const [questionnaires, totalQuestionnaires] = await Promise.all([
      prisma.questionnaire.findMany({
        select: {
          id: true,
          questions: true,
          name: true,
          email: true,
          review: true,
          isFeatured: true,
        },
        where: filters,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.questionnaire.count({
        where: filters,
      }),
    ]);

    const responseMessage = totalQuestionnaires === 0 ? "Tidak ada data kuesioner yang ditemukan." : "Data kuesioner berhasil diambil.";

    return NextResponse.json({
      success: true,
      message: responseMessage,
      data: {
        questionnaires,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalQuestionnaires / limit),
          totalQuestionnaires,
        },
      },
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data kuesioner:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data kuesioner. Silakan coba lagi nanti." }, { status: 500 });
  }
}
