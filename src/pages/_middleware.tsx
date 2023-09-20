import { NextRequest, NextResponse } from 'next/server';

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;

const headers = {
  Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function middleware(req: NextRequest) {
  if (req.url.includes('/api/webhooks/')) {
    return NextResponse.next(); // Bypass the middleware
  }

  if (req.url.includes('/app') || req.url.includes('/graphql')) {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);

    const query = Object.fromEntries(urlParams);

    console.log('REQ middleware:', req.url);

    const { shop } = query;

    const sessionId = req.cookies['shopify_app_session'];
    console.log('This is the session ID', sessionId);

    if (sessionId === undefined) {
      console.log('Session is undefined.');
      if (shop) {
        console.log(
          'Session undefined, shop true, redirecting to auth/offline?shop'
        );
        return NextResponse.redirect(
          `${process.env.HOST}/api/auth/offline?shop=${shop}`
        );
      }

      console.log('Shop and sessionID undefined.', shop, sessionId);
      console.log('Redirect to login');
      return NextResponse.redirect(`${process.env.HOST}/login`);
    } else {
      console.log('Session is found, fetching from upstash.');
      const { result } = await fetch(
        `${upstashRedisRestUrl}/get/${sessionId}`,
        {
          method: 'GET',
          headers,
        }
      ).then((res) => res.json());

      const session = JSON.parse(result);

      if (shop) {
        if (session && session.shop === shop) {
          return NextResponse.next();
        } else {
          if (shop) {
            return NextResponse.redirect(
              `${process.env.HOST}/api/auth/offline?shop=${shop}`
            );
          } else {
            console.log(req.method);
            return NextResponse.redirect(`${process.env.HOST}/login`, 303);
          }
        }
      }
    }
  }

  return NextResponse.next();
}
