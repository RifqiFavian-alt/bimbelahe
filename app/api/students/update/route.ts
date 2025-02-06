import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { studentId, name, email, phone } = await req.json();
    if (!studentId || !name || !email || !phone) {
      return NextResponse.json({ success: false, message: "Invalid input" }, { status: 400 });
    }
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: {
        name,
        email,
        phone,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update student", error: error }, { status: 500 });
  }
}
