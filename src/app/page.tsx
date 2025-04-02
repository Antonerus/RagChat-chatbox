import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export default async function Home() {
  let sessionCookie = (await cookies()).get("sessionId")?.value;

  if (!sessionCookie) {
    sessionCookie = randomUUID();
  }

  const sessionId = `session-${sessionCookie.replace(/\//g, "")}`;

  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId })

  return (
    <>
      <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
    </>
  )
}
