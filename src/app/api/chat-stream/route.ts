// app/api/chat-stream/route.ts
import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { messages = [], sessionId } = await req.json();
        
        if (!Array.isArray(messages)) {
            throw new Error("Messages must be an array");
        }

        const processedMessages = messages.length > 0
            ? messages.filter(m => m?.role && m?.content)
            : [{ role: "user" as const, content: "Hello" }];
        
        const lastMessage = processedMessages[processedMessages.length - 1].content;
        
        const response = await ragChat.chat(lastMessage, { 
            streaming: true, 
            sessionId,
            messages: processedMessages
        });

        return aiUseChatAdapter(response);
    } catch (error: unknown) {
        console.error("API route error:", error);
        return new Response(JSON.stringify({
            error: "Chat processing failed",
            message: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}