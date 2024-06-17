import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { updateState } from '@/utils/updateState';

export const dynamic = 'force-dynamic';

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const from = req.nextUrl.searchParams.get('from') || '';
    const chain = req.nextUrl.searchParams.get('chain') || ''; // we have to use this because chainSelect is a button input
    let state = JSON.parse(
        decodeURIComponent(req.nextUrl.searchParams.get('state') || '')
    );

    let body;
    let inputText;
    try {
        body = await req.json();
        inputText = body.untrustedData.inputText;
    } catch (e) {
        // do nothing
    }

    if (from == 'chain' && chain && chain.length > 0) {
        state = updateState(state, from, chain);
    } else if (from == 'gradientStart' && inputText && inputText.length > 0) {
        state = updateState(state, from, inputText);
    } else {
        state = state;
    }

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: '← Back',
                    action: 'post',
                    target:
                        `${process.env.NEXT_PUBLIC_SITE_URL}/api/chainSelect` +
                        `?state=${encodeURIComponent(JSON.stringify(state))}`,
                },
                {
                    label: 'Next →',
                    action: 'post',
                    target:
                        `${process.env.NEXT_PUBLIC_SITE_URL}/api/gradientStart?from=tokenAddress` +
                        `&state=${encodeURIComponent(JSON.stringify(state))}`,
                },
            ],
            image: {
                src: `${process.env.NEXT_PUBLIC_SITE_URL}/frames/images/tokenAddress?gradientStart=${state.gradientStart}&gradientEnd=${state.gradientEnd}`,
            },
            input: {
                text: 'token contract address',
            },
        })
    );
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
