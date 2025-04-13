import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Student = {
  name: string;
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  phone: string | null;
};

export async function POST() {
  try {
    const students = await prisma.student.findMany();

    if (students.length === 0) {
      return NextResponse.json({ success: false, message: "Tidak ada siswa aktif yang ditemukan." }, { status: 404 });
    }

    const currentYear = new Date().getFullYear();

    const paymentsToCreate = students.flatMap((student: Student) => {
      const startMonth = 1;
      const endMonth = 12;
      return Array.from({ length: endMonth - startMonth + 1 }, (_, i) => ({
        month: startMonth + i,
        year: currentYear,
        studentId: student.id,
      }));
    });

    await prisma.payment.createMany({ data: paymentsToCreate });

    return NextResponse.json({ success: true, message: "Tagihan berhasil dibuat untuk semua siswa." }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, message: "Gagal membuat tagihan siswa.", error: error }, { status: 500 });
  }
}
