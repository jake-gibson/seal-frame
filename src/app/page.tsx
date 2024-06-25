import type { Metadata } from 'next';

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
    'fc:frame:button:1': 'Yes',
    'fc:frame:button:1:post_url': `${process.env.NEXT_PUBLIC_SITE_URL}/api/vote?choice=Yes`,
    'fc:frame:button:2': 'No',
    'fc:frame:button:2:post_url': `${process.env.NEXT_PUBLIC_SITE_URL}/api/vote?choice=No`,
  },
};

export default function Page() {
  return (
    <div>
      <h1>Let's Wager!</h1>
    </div>
  );
}
