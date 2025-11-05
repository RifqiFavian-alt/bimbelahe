import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { id, name, email, phone, address, birthday, programIds } = await req.json();

    if (!id || !name || !email || !phone || !address || !birthday || !Array.isArray(programIds) || programIds.length === 0) {
      return NextResponse.json({ success: false, message: "Semua field wajib diisi." }, { status: 400 });
    }

    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return NextResponse.json({ success: false, message: "Siswa tidak ditemukan." }, { status: 404 });
    }

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        address,
        birthday,
        programs: {
          set: programIds.map((id: string) => ({ id })),
        },
      },
      include: {
        programs: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data siswa berhasil diperbarui.",
        data: updatedStudent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui data siswa:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui data siswa. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
