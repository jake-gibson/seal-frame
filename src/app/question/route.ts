import { initialize } from '@/app/utilities/intialize';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get('title');

  //here i need to initialize with encrypted question:
  ///

  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Please Vote</title>
    <meta property="og:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}" />
    <meta property="fc:frame:button:1" content="Make your own Wager" />
    <meta property="fc:frame:button:1:post_url" content="${process.env.NEXT_PUBLIC_SITE_URL}/api/vote?choice=yes" />
    <meta property="fc:frame:button:2" content="Make your own Wager" />
    <meta property="fc:frame:button:2:post_url" content="${process.env.NEXT_PUBLIC_SITE_URL}/api/vote?choice=no" />
    </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
