import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // opsional
    const limit = parseInt(searchParams.get("limit") || "10", 10); // opsional
    const name = searchParams.get("name") || ""; // opsional

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid page or limit parameters",
        },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    const [students, totalStudents] = await Promise.all([
      prisma.student.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        where: {
          name: {
            contains: name.trim(),
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "asc" },
      }),
      prisma.student.count({
        where: {
          name: {
            contains: name.trim(),
          },
        },
      }),
    ]);

    const responseMessage = totalStudents === 0 ? "No data found" : "Payments retrieved successfully";

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        data: {
          students,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalStudents / limit),
            totalStudents,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch students",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
