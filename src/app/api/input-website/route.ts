import { ragChat } from "@/lib/rag-chat"
import { redis } from "@/lib/redis"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const { url } = await req.json()

        const isAlreadyIndexed = await redis.sismember("indexed-urls", url)

        if (!isAlreadyIndexed) {
            await ragChat.context.add({
                type: "html",
                source: url,
                config: { chunkOverlap: 50, chunkSize: 200 },
            })
    
            await redis.sadd("indexed-urls", url)

            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ success: true })
    }
    catch {
        return NextResponse.json({ error: "Server Error" }, { status: 500 })
    }
}
