import jsonData from "@/data/ahe-docs.json";
import { NextResponse } from "next/server";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText, UIMessage } from "ai";

const jsonDataString = JSON.stringify(jsonData);
const systemPrompt = `Anda adalah asisten professional yang membantu bimbingan belajar AHE. 
Gunakan informasi berikut untuk menjawab pertanyaan:
${jsonDataString}

Aturan jawaban:
1. Jawab secara ringkas dan langsung ke inti
2. Jika pertanyaan di luar topik, respond: "Maaf, saya hanya bisa membantu terkait bimbingan belajar AHE"
3. Gunakan format yang mudah dibaca dengan poin-poin bila perlu
4. Gunakan bahasa indonesia yang baik, sopan dan professional
`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!,
    });

    const modelMessages = convertToModelMessages([...messages]);

    const result = streamText({
      model: openrouter("arcee-ai/trinity-mini:free"),
      messages: modelMessages,
      system: systemPrompt,
      temperature: 0.7,
      maxOutputTokens: 400,
      topP: 0.9,
      frequencyPenalty: 0.3,
      presencePenalty: 0.3,
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
