import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "ID siswa diperlukan untuk menghapus data." }, { status: 400 });
    }

    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return NextResponse.json({ success: false, message: "Siswa tidak ditemukan atau sudah dihapus." }, { status: 404 });
    }

    await prisma.student.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Siswa berhasil dihapus." }, { status: 200 });
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus siswa:", error);
    return NextResponse.json({ success: false, message: "Gagal menghapus siswa. Silakan coba lagi nanti." }, { status: 500 });
  }
}
