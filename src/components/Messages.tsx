import { type Message as TMessage } from "ai/react";
import { Message } from "./Message";
import { MessageSquare } from "lucide-react";

interface MessagesProps {
    messages: TMessage[];
    loading: boolean;
}

export const Messages = ({ messages, loading }: MessagesProps) => {
    return (
        <div className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
            {messages.length ? (
                <>
                    {messages.map((message, i) => (
                        <Message key={i} content={message.content} isUserMessage={message.role === "user"} />
                    ))}
                    {loading && (
                        <Message key="loading" content="" isUserMessage={false} isLoading={true} />
                    )}
                </>
            ) : (
                <div className="flex-1 flex flex-col justify-center items-center gap-2">
                    <MessageSquare className="size-20 text-blue-500" />
                    <h3 className="font-semibold text-xl text-white">Welcome to Chatbox</h3>
                    <p className="text-zinc-500 text-sm">Ask Your First Question!</p>
                </div>
            )}
        </div>
    );
};
