// lib/rag-chat.ts
import { RAGChat } from "@upstash/rag-chat";
import { redis } from "./redis";
import { ChatGroq } from "@langchain/groq";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatResult, ChatGenerationChunk } from "@langchain/core/outputs";
import type { BaseMessage } from "@langchain/core/messages";

class GroqLangChainWrapper extends BaseChatModel {
  private groq: ChatGroq;

  constructor() {
    super({});
    this.groq = new ChatGroq({
      modelName: "llama-3.3-70b-versatile",
      apiKey: process.env.GROQ_API_KEY!,
      temperature: 0.7,
      streaming: true,
      maxRetries: 3,
    });
  }

  _llmType(): string {
    return "groq-chat-wrapper";
  }

  async _generate(
    messages: BaseMessage[],
  ): Promise<ChatResult> {
    const result = await this.groq.invoke(messages);
    return {
      generations: [{
        message: result,
        text: result.content as string, // Explicitly cast to string
      }]
    };
  }

  async *_streamResponseChunks(
    messages: BaseMessage[],
  ): AsyncGenerator<ChatGenerationChunk> {
    const stream = await this.groq.stream(messages);
    for await (const chunk of stream) {
      yield new ChatGenerationChunk({
        message: chunk,
        text: chunk.content as string, // Explicitly cast to string
      });
    }
  }

  // Add missing required properties
  get lc_secrets() {
    return { apiKey: "GROQ_API_KEY" };
  }

  get lc_aliases() {
    return {};
  }
}

export const ragChat = new RAGChat({
  model: new GroqLangChainWrapper() as any, // Temporary type assertion
  redis: redis,
});