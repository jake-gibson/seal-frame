import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest } from 'next/server';
import { kv } from '@vercel/kv';
// const multi = kv.multi();
// multi.hset('test:count', { total: 0, yes: 0, no: 0 });
// multi.hset('test:voters', {});
// await multi.exec();

export async function initialize() {
  const keys = await kv.hkeys('test:count');
  console.log('my keys are:', keys);
  //if length doesnt exist then initiliaze (separate file) both hashes
  // if (keys.length === 0) {
  const results = await kv.hset('test:count', { total: 0, yes: 0, no: 0 });
  console.log('length should now be 3:', results);
  // }
}

export async function castVote(req: NextRequest, choice: string) {
  const body: FrameRequest = await req.json();

  //get the untrusted data
  const { untrustedData } = body;
  const user = untrustedData.inputText || 0;

  //eventually test will be a specific date and poll number '06252024:0001:votes'
  //check length
  const keys = await kv.hkeys('test:voters');
  if (keys.length === 0) {
    initialize();
  }
  console.log('my name is:', user);
  console.log('my vote is:', choice);

  const voted = await kv.hget('test:voters', `${user}`);

  if (!voted) {
    await kv.hset('test:voters', { [user]: choice });
    // const voted = await kv.hget('test:voters', `${user}`);
    // console.log(voted);

    await kv.hincrby('test:count', 'total', 1);
    await kv.hincrby('test:count', `${choice}`, 1);
  }

  const voters = await kv.hgetall('test:voters');
  console.log(voters);
  const counts = await kv.hgetall('test:count');
  console.log(counts);
}
