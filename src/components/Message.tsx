import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface MessageProps {
    content: string;
    isUserMessage: boolean;
    isLoading?: boolean;
}

export const Message = ({ content, isUserMessage, isLoading }: MessageProps) => {
    return (
        <div
            className={cn({
                "bg-zinc-800": isUserMessage,
                "bg-zinc-900/25": !isUserMessage,
            })}
        >
            <div className="p-6">
                <div className="max-w-3xl mx-auto flex items-start gap-2.5">
                    <div
                        className={cn(
                            "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
                            {
                                "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
                            }
                        )}
                    >
                        {isUserMessage ? <User className="size-5" /> : <Bot className="size-5 text-white" />}
                    </div>
                    <div className="flex flex-col ml-6 w-full">
                        <div className="flex items-center space-x-2">
                            <span
                                className={cn("text-sm font-semibold", {
                                    "text-gray-200": isUserMessage,
                                    "text-gray-400": !isUserMessage,
                                })}
                            >
                                {isUserMessage ? "You" : "Website"}
                            </span>
                        </div>
                        <p
                            className={cn("text-sm font-normal py-2.5", {
                                "text-gray-200": isUserMessage,
                                "text-gray-400": !isUserMessage,
                            })}
                        >
                            {isLoading ? (
                                <span className="animate-pulse text-gray-500">Typing...</span>
                            ) : (
                                content
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
