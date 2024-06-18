import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { DEFAULT_STATE } from '@/constants/defaultState';

export const dynamic = 'force-dynamic';

const frameMetdata = getFrameMetadata({
    buttons: [
        {
            label: 'Learn More',
            action: 'link',
            target: 'https://warpcast.com/thesoftdao',
        },
        {
            label: 'Begin →',
            action: 'post',
            target: `${
                process.env.NEXT_PUBLIC_SITE_URL
            }/api/chainSelect?state=${encodeURIComponent(
                JSON.stringify(DEFAULT_STATE)
            )}`,
        },
    ],
    image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/frames/images/home`,
    },
    state: DEFAULT_STATE,
});

export const generateMetadata = (): Metadata => {
    return {
        title: `Statcaster by Soft`,
        description: 'Statcaster by Soft',
        openGraph: {
            title: 'Statcaster by Soft',
            description: 'Statcaster by Soft',
            images: [`${process.env.NEXT_PUBLIC_SITE_URL}/frames/images/home`],
        },
        other: {
            ...frameMetdata,
        },
    };
};

export default function Page() {
    return (
        <>
            <h1>Frame</h1>
        </>
    );
}
