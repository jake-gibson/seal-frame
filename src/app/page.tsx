import type { Metadata } from 'next';
import WagerMaker from './components/WagerMaker';

//in here
//we present the frame with 'yes' and 'no' options
//for now just assume it has been made hardcoded here

//for the wager maker, i can have the basic html ask for wager info, then make one and return a new link with a frame to copy and paste

const searchParams = new URLSearchParams({
  title: `There will be over 10,000 Kramer predictions before 6/29 midnight`,
});

export const metadata: Metadata = {
  title: `Today's Poll`,
  description: `There will be over 10,000 Kramer predictions before 6/29 midnight`,
  openGraph: {
    title: `Today's Poll`,
    description: `There will be over 10,000 Kramer predictions before 6/29 midnight`,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
    // 'fc:frame:input:text': 'FiD',
    'fc:frame:button:1': 'Yes',
    'fc:frame:button:1:post_url': `${process.env.NEXT_PUBLIC_SITE_URL}/api/vote?choice=yes`,
    'fc:frame:button:2': 'No',
    'fc:frame:button:2:post_url': `${process.env.NEXT_PUBLIC_SITE_URL}/api/vote?choice=no`,
  },
};

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-100 p-5 bg-slate-800">
      <WagerMaker />
    </div>
  );
}
