import WagerMaker from '@/app/components/WagerMaker';
import { initialize } from '@/app/utilities/initialize-id';
import { hexToString } from '@/app/utilities/encryption';

import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { code: string; question: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const questionParams = params.question;
  const decryptedQuestion = hexToString(questionParams);

  if (questionParams) {
    // console.log('date', date);
    console.log('question', decryptedQuestion);
    await initialize(questionParams);
    // console.log('added new (encrypted) Question to db');

    const voteParams = new URLSearchParams({
      title: decryptedQuestion,
    });

    return {
      title: `Today's Poll`,
      description: `${decryptedQuestion}`,
      openGraph: {
        title: `Today's Poll`,
        description: `${decryptedQuestion}`,
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og?${voteParams}`],
      },
      other: {
        'fc:frame': 'vNext',
        'fc:frame:image': `${process.env.NEXT_PUBLIC_SITE_URL}/og?${voteParams}`,
        // 'fc:frame:input:text': 'FiD',
        'fc:frame:button:1': 'Yes',
        'fc:frame:button:1:post_url': `${process.env.NEXT_PUBLIC_SITE_URL}/api/new-vote?question=${questionParams}&choice=yes`,
        'fc:frame:button:2': 'No',
        'fc:frame:button:2:post_url': `${process.env.NEXT_PUBLIC_SITE_URL}/api/new-vote?question=${questionParams}&choice=no`,
      },
    };
  }

  return {
    title: `Today's Poll`,
    description: `None Found`,
    openGraph: {
      title: `Today's Poll`,
      description: `None Found`,
    },
  };
}

export default function Page({ params }: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-100 p-5 bg-slate-800">
      <WagerMaker />
    </div>
  );
}
