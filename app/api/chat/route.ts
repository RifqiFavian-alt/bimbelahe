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

// interface Message {
//   role: "system" | "user" | "assistant";
//   content: string;
// }

// interface OpenRouterResponse {
//   choices?: {
//     message: Message;
//     finish_reason: string;
//     index: number;
//   }[];
//   error?: string;
// }

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!,
    });

    const modelMessages = convertToModelMessages([
      {
        role: "system",
        parts: [{ type: "text", text: systemPrompt }],
      },
      ...messages,
    ]);

    const result = streamText({
      model: openrouter("meta-llama/llama-4-maverick:free"),
      messages: modelMessages,
      temperature: 0.7,
      maxOutputTokens: 400,
      topP: 0.9,
      frequencyPenalty: 0.3,
      presencePenalty: 0.3,
    });
    console.log(result.toTextStreamResponse());
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//     "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
//     "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     model: "meta-llama/llama-4-maverick:free",
//     messages: [
//       {
//         role: "system",
//         content: systemPrompt,
//       },
//       ...lastMessages,
//     ],
//     temperature: 0.7,
//     max_tokens: 400,
//     top_p: 0.9,
//     frequency_penalty: 0.3,
//     presence_penalty: 0.3,
//   }),
// });

// if (!response.ok) {
//   throw new Error(`OpenRouter error: ${response.statusText}`);
// }

// const responseData: OpenRouterResponse = await response.json();

// return NextResponse.json(responseData);
