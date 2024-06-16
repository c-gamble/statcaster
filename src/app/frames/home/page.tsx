import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { DEFAULT_STATE } from '@/constants/defaultState';

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
        title: `home page`,
        description: 'first page of statcaster',
        openGraph: {
            title: 'home page',
            description: 'first page of statcaster',
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
