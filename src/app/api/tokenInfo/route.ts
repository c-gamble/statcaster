import { NextRequest } from 'next/server';
import { computeMetrics } from '@/utils/computeMetrics';
import { CHAINS } from '@/constants/chains';

export async function GET(req: NextRequest): Promise<Response> {
    const chain = req.nextUrl.searchParams.get('chain') || '';
    const tokenAddress = req.nextUrl.searchParams.get('tokenAddress') || '';
    const displayOptions = JSON.parse(
        decodeURIComponent(req.nextUrl.searchParams.get('displayOptions') || '')
    );

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
