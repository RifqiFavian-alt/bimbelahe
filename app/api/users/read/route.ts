import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

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

    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        select: {
          name: true,
          email: true,
          role: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "asc" },
      }),
      prisma.user.count(),
    ]);

    const responseMessage = totalUsers === 0 ? "No data found" : "Payments retrieved successfully";

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        data: {
          users,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: error,
      },
      { status: 500 }
    );
  }
}
