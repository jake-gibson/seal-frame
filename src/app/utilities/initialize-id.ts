import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest } from 'next/server';
import { kv } from '@vercel/kv';

interface voterInfo {
  voted: Boolean;
  myVote: string;
  total: number;
  yes: number;
  no: number;
}

interface counters {
  total: number;
  yes: number;
  no: number;
}

export async function initialize(id: string) {
  const keys = await kv.hkeys(`${id}:count`);
  console.log('my keys are:', keys);
  //if length doesnt exist then initiliaze (separate file) both hashes
  if (keys.length === 0) {
    const results = await kv.hset(`${id}:count`, { total: 0, yes: 0, no: 0 });
    console.log('length should now be 3:', results);
  }
}

export async function castVote(
  req: NextRequest,
  id: string,
  choice: string
): Promise<voterInfo> {
  const voterData: voterInfo = {
    voted: false,
    myVote: choice,
    total: 0,
    yes: 0,
    no: 0,
  };

  const body: FrameRequest = await req.json();

  const { untrustedData } = body;
  const user = untrustedData.fid || 0;

  //eventually test will be a specific date and poll number '06252024:0001:voters'

  const keys = await kv.hkeys(`${id}:voters`);
  if (keys.length === 0) {
    initialize(id);
  }
  console.log('my name is:', user);
  console.log('my vote is:', choice);

  const voted = (await kv.hget(`${id}:voters`, `${user}`)) as unknown as string;
  if (voted) {
    voterData.myVote = voted;
    voterData.voted = true;
  } else {
    //Record user as a voter
    await kv.hset(`${id}:voters`, { [user]: choice });

    //Increment user's vote type and the total, each by 1
    await kv.hincrby(`${id}:count`, 'total', 1);
    await kv.hincrby(`${id}:count`, `${choice}`, 1);
  }

  const voters = await kv.hgetall(`${id}:voters`);
  console.log(voters);
  const counts = (await kv.hgetall(`${id}:count`)) as unknown as counters;
  console.log(counts);

  voterData.total = counts.total || 0;
  voterData.yes = counts.yes || 0;
  voterData.no = counts.no || 0;

  return voterData;
}
