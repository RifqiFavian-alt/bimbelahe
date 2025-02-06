import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, question1, question2, question3, question4, review } = await req.json();

    if (!name || !email || !question1 || !question2 || !question3 || !question4) {
      return NextResponse.json({ success: false, message: "All fields except review are required" }, { status: 400 });
    }

    const questionnaire = await prisma.questionnaire.create({
      data: { name, email, question1, question2, question3, question4, review },
    });

    return NextResponse.json({ success: true, data: questionnaire });
  } catch (error) {
    console.error("Error saving questionnaire:", error);
    return NextResponse.json({ success: false, message: "Failed to save questionnaire" }, { status: 500 });
  }
}
