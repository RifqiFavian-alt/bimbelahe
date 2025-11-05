import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const [programs, totalPrograms] = await Promise.all([prisma.program.findMany(), prisma.program.count()]);
    const responseMessage = totalPrograms === 0 ? "Tidak ada data siswa yang ditemukan." : "Data siswa berhasil diambil.";
    return NextResponse.json({ success: true, message: responseMessage, data: programs }, { status: 200 });
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data program:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data program. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
