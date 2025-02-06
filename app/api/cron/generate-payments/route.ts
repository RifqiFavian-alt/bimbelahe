import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const students = await prisma.student.findMany();

    if (students.length === 0) {
      return NextResponse.json({ success: false, message: "No active students found." }, { status: 404 });
    }

    const currentYear = new Date().getFullYear();

    const paymentsToCreate = students.flatMap((student) => {
      const startMonth = 1; // Januari
      const endMonth = 12; // Desember
      return Array.from({ length: endMonth - startMonth + 1 }, (_, i) => ({
        month: startMonth + i,
        year: currentYear,
        studentId: student.id,
      }));
    });

    await prisma.payment.createMany({ data: paymentsToCreate });

    return NextResponse.json({ success: true, message: "Payments generated successfully." }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, message: "Failed to generate payments", error: error }, { status: 500 });
  }
}
