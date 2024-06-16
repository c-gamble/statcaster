import { NextRequest } from 'next/server';
import { computeMetrics } from '@/utils/computeMetrics';
import { CHAINS } from '@/constants/chains';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest): Promise<Response> {
    const chain = req.nextUrl.searchParams.get('chain') || '';
    const tokenAddress = req.nextUrl.searchParams.get('tokenAddress') || '';

    if (
        !chain ||
        !tokenAddress ||
        chain.length === 0 ||
        tokenAddress.length === 0 ||
        !Object.keys(CHAINS).includes(chain)
    ) {
        return new Response(
            JSON.stringify({ error: 'Invalid chain or token address' }),
            { status: 400 }
        );
    }

    const supabaseClient = createClient(
        process.env.SUPABASE_URL || '',
        process.env.SUPABASE_KEY || ''
    );

    const { data, error } = await supabaseClient
        .from('displays')
        .select('*')
        .eq('tokenAddress', tokenAddress);
    if (error || !data || data.length === 0) {
        return new Response(
            JSON.stringify({
                error: 'Error fetching display options from database',
            }),
            { status: 500 }
        );
    }

    const displayOptions = {
        holderCount: data[0].holderCount,
        // dailyVolume: data[0].dailyVolume,
        // monthlyVolume: data[0].monthlyVolume,
        totalSupply: data[0].totalSupply,
        centralization: data[0].centralization,
    };

    const { gradientStart, gradientEnd } = data[0];

    if (
        !displayOptions ||
        displayOptions.holderCount === undefined ||
        // displayOptions.dailyVolume === undefined ||
        // displayOptions.monthlyVolume === undefined ||
        displayOptions.totalSupply === undefined ||
        displayOptions.centralization === undefined
    ) {
        return new Response(
            JSON.stringify({ error: 'Invalid display options' }),
            { status: 400 }
        );
    }

    const {
        name,
        symbol,
        logo,
        holderCount,
        // dailyVolume,
        // monthlyVolume,
        totalSupply,
        centralization,
    }: any = await computeMetrics(chain, tokenAddress);

    if (
        !name ||
        !symbol ||
        !logo ||
        (displayOptions.holderCount && !holderCount) ||
        // (displayOptions.dailyVolume && !dailyVolume) ||
        // (displayOptions.monthlyVolume && !monthlyVolume) ||
        (displayOptions.totalSupply && !totalSupply) ||
        (displayOptions.centralization && !centralization)
    ) {
        return new Response(
            JSON.stringify({ error: 'Error fetching metrics' }),
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({
            name,
            symbol,
            logo,
            gradientStart,
            gradientEnd,
            fields: [
                {
                    display: displayOptions.holderCount,
                    name: 'holder count',
                    value: holderCount,
                },
                // {
                //     display: displayOptions.dailyVolume,
                //     name: 'daily volume',
                //     value: dailyVolume,
                // },
                // {
                //     display: displayOptions.monthlyVolume,
                //     name: 'monthly volume',
                //     value: monthlyVolume,
                // },
                {
                    display: displayOptions.totalSupply,
                    name: 'total supply',
                    value: totalSupply,
                },
                {
                    display: displayOptions.centralization,
                    name: 'centralization',
                    value: centralization,
                },
            ],
        })
    );
}

export const dynamic = 'force-dynamic';
