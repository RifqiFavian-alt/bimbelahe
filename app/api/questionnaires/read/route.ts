import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("isFeatured") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Validate pagination inputs
    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return NextResponse.json({ success: false, message: "Invalid page or limit parameters" }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    const [questionnaires, totalQuestionnaires] = await Promise.all([
      prisma.questionnaire.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          review: true,
          isFeatured: true,
        },
        where: isFeatured ? { isFeatured: true } : undefined,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.questionnaire.count({
        where: isFeatured ? { isFeatured: true } : undefined,
      }),
    ]);
    const responseMessage = totalQuestionnaires === 0 ? "No data found" : "Payments retrieved successfully";

    return NextResponse.json({
      success: true,
      message: responseMessage,
      data: {
        questionnaires,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalQuestionnaires / limit),
          totalQuestionnaires,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching questionnaires:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch questionnaires" }, { status: 500 });
  }
}
