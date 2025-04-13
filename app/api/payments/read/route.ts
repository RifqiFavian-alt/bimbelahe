import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    const year = searchParams.get("year");
    const studentName = searchParams.get("name");
    const orphaned = searchParams.get("orphaned") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return NextResponse.json({ success: false, message: "Nilai halaman atau batas tidak valid." }, { status: 400 });
    }

    const filters: Prisma.PaymentWhereInput = {};

    if (orphaned) {
      filters.studentId = null;
    } else {
      if (studentId) filters.studentId = studentId;
      if (year) filters.year = parseInt(year, 10);
      if (studentName) {
        filters.student = { name: { contains: studentName, mode: "insensitive" } };
      }
    }

    const [payments, totalPayments] = await Promise.all([
      prisma.payment.findMany({
        where: filters,
        orderBy: [{ year: "asc" }, { month: "asc" }],
        skip: (page - 1) * limit,
        take: limit,
        include: {
          student: { select: { name: true } },
        },
      }),
      prisma.payment.count({ where: filters }),
    ]);

    const formattedPayments = payments.map(({ id, studentId, month, year, isPaid, student }) => ({
      id,
      studentId,
      month,
      year,
      isPaid,
      studentName: student?.name || null, // Akan `null` jika student sudah dihapus
    }));

    const responseMessage = totalPayments === 0 ? "Tidak ada data pembayaran yang ditemukan." : "Data pembayaran berhasil diambil.";

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        data: {
          payments: formattedPayments,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalPayments / limit),
            totalPayments,
          },
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ success: false, message: "Terjadi kesalahan pada basis data." }, { status: 500 });
    }

    return NextResponse.json({ success: false, message: "Terjadi kesalahan yang tidak terduga." }, { status: 500 });
  }
}
