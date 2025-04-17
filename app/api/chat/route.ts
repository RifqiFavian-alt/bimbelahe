import jsonData from "@/data/ahe-docs.json";
import { NextResponse } from "next/server";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  choices?: {
    message: Message;
    finish_reason: string;
    index: number;
  }[];
  error?: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log(messages);

    if (!messages) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
        "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content: `Anda adalah asisten web bimbingan belajar AHE yang membantu menjawab pertanyaan berdasarkan data berikut: ${JSON.stringify(
              jsonData
            )}. Jawablah hanya berdasarkan data tersebut. Jika tidak ada informasi yang relevan dan tidak ada pertanyaan yang tidak berkaitan dengan bimbingan belajar AHE, jawab "Maaf, saya tidak memiliki informasi selain bimbingan belajar AHE".`,
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.statusText}`);
    }

    const responseData: OpenRouterResponse = await response.json();

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
