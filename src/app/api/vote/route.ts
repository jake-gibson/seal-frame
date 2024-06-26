import { castVote } from '@/app/utilities/intialize';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const choice = searchParams.get('choice');

  //here i need to initialize of figure out middleware
  castVote(req, choice as string);

  const voteParams = new URLSearchParams({
    title: `You voted ${choice?.toUpperCase()}!`,
  });

  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Please Vote</title>
    <meta property="og:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/og?${voteParams}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/og?${voteParams}" />
    <meta property="fc:frame:button:1" content="Make your own Wager" />
    </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
