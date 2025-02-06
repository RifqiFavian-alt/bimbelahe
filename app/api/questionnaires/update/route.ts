import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { id, isFeatured } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Questionnaire ID is required" }, { status: 400 });
    }

    const updatedQuestionnaire = await prisma.questionnaire.update({
      where: { id },
      data: { isFeatured },
    });

    return NextResponse.json({
      success: true,
      data: updatedQuestionnaire,
      message: `Questionnaire ${isFeatured ? "featured" : "unfeatured"} successfully`,
    });
  } catch (error) {
    console.error("Error updating questionnaire:", error);
    return NextResponse.json({ success: false, message: "Failed to update questionnaire" }, { status: 500 });
  }
}
