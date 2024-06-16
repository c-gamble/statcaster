import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { updateState } from '@/utils/updateState';

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const from = req.nextUrl.searchParams.get('from') || '';
    const fromState = req.nextUrl.searchParams.get('fromState') || '';
    let state = JSON.parse(
        decodeURIComponent(req.nextUrl.searchParams.get('state') || '')
    );

    if (from == 'centralization' && fromState && fromState !== '') {
        state = updateState(state, from, fromState);
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
                        `${process.env.NEXT_PUBLIC_SITE_URL}/api/dataSelect?metric=centralization` +
                        `&state=${encodeURIComponent(JSON.stringify(state))}`,
                },
                {
                    label: 'Create Frame',
                    action: 'post',
                    target:
                        `${process.env.NEXT_PUBLIC_SITE_URL}/api/createDisplay` +
                        `?state=${encodeURIComponent(JSON.stringify(state))}`,
                },
            ],
            image: {
                src: `${
                    process.env.NEXT_PUBLIC_SITE_URL
                }/frames/images/preview?state=${encodeURIComponent(
                    JSON.stringify(state)
                )}`,
            },
            state: state,
        })
    );
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = 'force-dynamic';
