import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "ID pengguna wajib diisi." }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "Pengguna berhasil dihapus.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus pengguna:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ success: false, message: "Pengguna tidak ditemukan." }, { status: 404 });
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus pengguna. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
