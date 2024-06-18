import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function successResponse(state: any, id: string) {
    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Restart',
                    action: 'post',
                    target: `${process.env.NEXT_PUBLIC_SITE_URL}/api/restart`,
                },
                {
                    label: 'Get Link',
                    action: 'link',
                    target: `${process.env.NEXT_PUBLIC_SITE_URL}/claim/${state.chain}/${state.tokenAddress}/${id}`,
                },
            ],
            image: {
                src:
                    `${process.env.NEXT_PUBLIC_SITE_URL}/frames/images/end?success=true&state=` +
                    encodeURIComponent(JSON.stringify(state)),
            },
        })
    );
}

function errorResponse() {
    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Home',
                    action: 'post',
                    target: `${process.env.NEXT_PUBLIC_SITE_URL}/api/restart`,
                },
            ],
            image: {
                src: `${process.env.NEXT_PUBLIC_SITE_URL}/frames/images/end?success=false`,
            },
        })
    );
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
    let state = JSON.parse(
        decodeURIComponent(req.nextUrl.searchParams.get('state') || '')
    );

    if (!state) return errorResponse();

    try {
        const supabaseClient = createClient(
            process.env.SUPABASE_URL || '',
            process.env.SUPABASE_KEY || ''
        );

        const { data, error } = await supabaseClient
            .from('displays')
            .insert({
                tokenAddress: state.tokenAddress,
                holderCount: state.holderCount as boolean,
                // dailyVolume: state.dailyVolume as boolean,
                // monthlyVolume: state.monthlyVolume as boolean,
                totalSupply: state.totalSupply as boolean,
                centralization: state.centralization as boolean,
                gradientStart: state.gradientStart as string,
                gradientEnd: state.gradientEnd as string,
            })
            .select();

        if (error || !data || data.length === 0) {
            return errorResponse();
        }
        return successResponse(state, data[0].id);
    } catch (e: any) {
        return errorResponse();
    }
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
