import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const deletedStudent = await prisma.student.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: deletedStudent }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete student", error }, { status: 500 });
  }
}
