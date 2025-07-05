import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const prisma = new PrismaClient();

export const runtime = "edge";

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userId = session.user.id;

  try {
    const { message } = await req.json();

    // 1. 사용자 메시지를 DB에 저장
    await prisma.message.create({
      data: { content: message, role: 'user', userId: userId }
    });

    // 2. Gemini API 호출 (이전 대화 기록 없이)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const stream = await model.generateContentStream(message);

    // 3. AI 응답을 스트리밍하고, 완료되면 DB에 저장
    const aiStream = GoogleGenerativeAIStream(stream, {
      async onCompletion(completion) {
        await prisma.message.create({
          data: { content: completion, role: 'assistant', userId: userId }
        });
      }
    });

    return new StreamingTextResponse(aiStream);

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
