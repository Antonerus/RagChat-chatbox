"use client"

import { Message, useChat } from "ai/react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";

export const ChatWrapper = ({ sessionId, initialMessages }: { sessionId: string; initialMessages: Message[] }) => {
    const { messages, input, handleInputChange, handleSubmit, setInput, isLoading } = useChat({
        api: "/api/chat-stream",
        body: { sessionId },
        initialMessages,
    });

    return (
        <div className="relative min-h-screen flex flex-col bg-zinc-900">
            <div className="flex-1 overflow-y-auto bg-zinc-800">
                <Messages messages={messages} loading={isLoading} />
            </div>
            <div className="p-4 bg-zinc-900">
                <ChatInput 
                    input={input} 
                    handleInputChange={handleInputChange} 
                    handleSubmit={handleSubmit}
                    setInput={setInput}
                />
            </div>
        </div>
    );
};