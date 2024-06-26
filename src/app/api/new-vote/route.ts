import { castVote } from '../../utilities/initialize-id';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const question = searchParams.get('question'); //hex representing the string
  const choice = searchParams.get('choice');

  const voterData = await castVote(req, question as string, choice as string);

  const voteParams = new URLSearchParams({
    title: voterData.voted
      ? `Sorry, you already voted ${voterData.myVote}.\n\nYou can't vote twice.`
      : `You voted ${choice?.toUpperCase()}!`,
    total: `${voterData.total}`,
    yes: `${voterData.yes}`,
    no: `${voterData.no}`,
  });

  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Please Vote</title>
    <meta property="og:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/og?${voteParams}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/og?${voteParams}" />
    <meta property="fc:frame:button:1" content="Vote on your own Frame" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="https://seal-frame-plum.vercel.app/" />
    </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
