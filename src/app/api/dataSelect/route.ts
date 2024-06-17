import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { updateState } from '@/utils/updateState';
import getMetricInfo from '@/constants/getMetricInfo';

export const dynamic = 'force-dynamic';

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const from = req.nextUrl.searchParams.get('from') || '';
    const fromState = req.nextUrl.searchParams.get('fromState') || '';
    const metric = req.nextUrl.searchParams.get('metric') || '';
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

    if (from == 'gradientEnd' && inputText && inputText.length > 0) {
        state = updateState(state, from, inputText);
    } else if (fromState && fromState !== '') {
        state = updateState(state, from, fromState);
    } else {
        state = state;
    }

    const { prevURL, nextURL } = getMetricInfo(metric);

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: '← Back',
                    action: 'post',
                    target:
                        prevURL +
                        `&state=${encodeURIComponent(JSON.stringify(state))}`,
                },
                {
                    label: '✅',
                    action: 'post',
                    target:
                        nextURL +
                        '&fromState=true' +
                        `&state=${encodeURIComponent(JSON.stringify(state))}`,
                },
                {
                    label: '❌',
                    action: 'post',
                    target:
                        nextURL +
                        '&fromState=false' +
                        `&state=${encodeURIComponent(JSON.stringify(state))}`,
                },
            ],
            image: {
                src: `${process.env.NEXT_PUBLIC_SITE_URL}/frames/images/dataSelect?metric=${metric}&gradientStart=${state.gradientStart}&gradientEnd=${state.gradientEnd}`,
            },
        })
    );
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
