import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const state = JSON.parse(
        decodeURIComponent(req.nextUrl.searchParams.get('state') || '')
    );

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Base 🔵',
                    action: 'post',
                    target: `${
                        process.env.NEXT_PUBLIC_SITE_URL
                    }/api/tokenAddress?chain=base&from=chain&state=${encodeURIComponent(
                        JSON.stringify(state)
                    )}`,
                },
            ],
            image: {
                src: `${process.env.NEXT_PUBLIC_SITE_URL}/frames/images/chainSelect?gradientStart=${state.gradientStart}&gradientEnd=${state.gradientEnd}`,
            },
        })
    );
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = 'force-dynamic';
