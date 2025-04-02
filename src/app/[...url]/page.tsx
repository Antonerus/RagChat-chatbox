import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{ url?: string | string[] }>; // params are a Promise here
  searchParams?: Record<string, string | string[] | undefined>;
}

const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params; // Await params to resolve the promise
  console.log("Params received:", resolvedParams);  // Debugging

  let url: string[] = [];
  if (Array.isArray(resolvedParams.url)) {
    url = resolvedParams.url;
  } else if (typeof resolvedParams.url === "string") {
    url = [resolvedParams.url];
  }

  const reconstructedUrl = url.map(decodeURIComponent).join("/");
  console.log("Reconstructed URL:", reconstructedUrl);

  const sessionCookie = (await cookies()).get("sessionId")?.value ?? "";
  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "");

  const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);
  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;
