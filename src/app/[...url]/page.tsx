import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
    params: {
        url?: string | string[];
    };
}

function reconstructUrl({ url }: { url: string[] }) {
    const decodedComponents = url.map((component) => decodeURIComponent(component));
    return decodedComponents.join("/");
}

const Page = async ({ params }: { params: { url?: string | string[] } }) => {
    console.log("Params received:", params);
    
    let url: string[];
    if (Array.isArray(params.url)) {
        url = params.url;
    } else if (params.url) {
        url = [params.url];
    } else {
        url = [];
    }

    const reconstructedUrl = reconstructUrl({ url });
    console.log("Reconstructed URL:", reconstructedUrl);

    const sessionCookie = (await cookies()).get("sessionId")?.value;
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
