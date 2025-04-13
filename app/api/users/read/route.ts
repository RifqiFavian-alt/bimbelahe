import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const userName = searchParams.get("name");
    const id = searchParams.get("id");

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Nilai page atau limit tidak valid.",
        },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    const filters: Prisma.UserWhereInput = {};
    if (userName) {
      filters.name = { contains: userName, mode: "insensitive" };
    }
    if (id) {
      filters.id = id;
    }

    // Fetch data dan total pengguna secara paralel
    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        where: filters,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "asc" },
      }),
      prisma.user.count({ where: filters }),
    ]);

    const responseMessage = totalUsers === 0 ? "Tidak ada data pengguna yang ditemukan." : "Data pengguna berhasil diambil.";

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        data: {
          users,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data pengguna. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
