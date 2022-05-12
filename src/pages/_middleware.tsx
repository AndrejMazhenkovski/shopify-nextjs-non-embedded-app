import {NextRequest, NextResponse} from "next/server"

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;

const headers = {
    Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
};

export async function middleware(req: NextRequest) {
    if (req.url.includes('/app')) {
        const urlParams = new URLSearchParams(req.url.split("?")[1])

        const query = Object.fromEntries(urlParams)

        const {shop} = query;

        const sessionId = req.cookies['shopify_app_session'];

        if (sessionId === undefined) {
            console.log("Redirect to login")
            return NextResponse.redirect(`${process.env.HOST}/login`)
        } else {
            const {result} = await fetch(`${upstashRedisRestUrl}/get/${sessionId}`, {
                method: "GET",
                headers
            }).then(res => res.json());

            const session = JSON.parse(result)

            if (session) {
                return NextResponse.next()
            } else {
                if (shop) {
                    return NextResponse.redirect(`${process.env.HOST}/api/auth/offline?shop=${shop}`)
                } else {
                    return NextResponse.redirect(`${process.env.HOST}/login`)
                }
            }
        }
    }

    return NextResponse.next()
}