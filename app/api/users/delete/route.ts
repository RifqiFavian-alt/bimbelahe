import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Validasi input
    if (!id) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    // Hapus user berdasarkan ID
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    // Tangani error Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // Error jika user tidak ditemukan
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }
    }

    // Tangani error lainnya
    return NextResponse.json({ success: false, message: "Failed to delete user" }, { status: 500 });
  }
}
