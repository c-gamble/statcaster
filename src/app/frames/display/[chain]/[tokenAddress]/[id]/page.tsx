import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { CHAINS } from '@/constants/chains';

export const dynamic = 'force-dynamic';

const generateFrameMetadata = (
    chain: string,
    tokenAddress: string,
    id: string
) => {
    const frameMetdata = getFrameMetadata({
        buttons: [
            {
                label: 'View On-chain',
                action: 'link',
                target: CHAINS[chain].tokenViewURL + tokenAddress, // handle polychain case
            },
            {
                label: 'Cast Your Stats',
                action: 'link',
                target: 'https://warpcast.com/thesoftdao/0xebd341f2',
            },
        ],
        image: {
            src: `${process.env.NEXT_PUBLIC_SITE_URL}/frames/images/display?chain=${chain}&tokenAddress=${tokenAddress}&id=${id}`,
        },
    });
    return frameMetdata;
};

type Props = {
    params: { chain: string; tokenAddress: string; id: string };
};

export const generateMetadata = ({ params }: Props): Metadata => {
    return {
        title: `stats page`,
        description: 'view your token stats here',
        openGraph: {
            title: `stats page`,
            description: 'view your token stats here',
            images: [
                `${process.env.NEXT_PUBLIC_SITE_URL}/frames/images/display?id=${params.id}`,
            ],
        },
        other: {
            ...generateFrameMetadata(
                params.chain,
                params.tokenAddress,
                params.id
            ),
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
