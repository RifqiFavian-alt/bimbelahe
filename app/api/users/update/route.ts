import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function PUT(req: Request) {
  try {
    const { id, name, email, currentEmail, password, role } = await req.json();

    if (!id || !name || !email || !currentEmail || !role) {
      return NextResponse.json({ success: false, message: "Data pengguna tidak lengkap." }, { status: 400 });
    }

    const updateData: Partial<Prisma.UserUpdateInput> = { name, role };

    if (email !== currentEmail) {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser && existingUser.id !== id) {
        return NextResponse.json({ success: false, message: "Email sudah terdaftar. Gunakan email lain." }, { status: 400 });
      }

      updateData.email = email;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Data pengguna berhasil diperbarui.",
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui pengguna:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ success: false, message: "Pengguna tidak ditemukan." }, { status: 404 });
      }
    }

    return NextResponse.json({ success: false, message: "Gagal memperbarui data pengguna." }, { status: 500 });
  }
}
