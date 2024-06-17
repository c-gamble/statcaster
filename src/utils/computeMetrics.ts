import axios from 'axios';
import { CHAINS } from '@/constants/chains';
import BigNumber from 'bignumber.js';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function getTokenInfo(chain: any, tokenAddress: string) {
    // get totalSupply from scanner
    let totalSupply;
    try {
        const totalSupplyResponse = await axios.get(
            chain.totalSupplyAPI + tokenAddress
        );
        totalSupply = totalSupplyResponse.data.result[0].totalSupply;
    } catch (error) {
        console.log('Error fetching total supply');
        return null;
    }

    return axios
        .get(chain.tokenInfoAPI + tokenAddress, {
            headers: {
                'x-api-key': process.env.CHAINBASE_API_KEY,
            },
        })
        .then((response) => {
            return {
                name: response.data.data.name,
                symbol: response.data.data.symbol,
                logo:
                    response.data.data.logos.length > 0
                        ? response.data.data.logos[0].url
                        : process.env.NEXT_PUBLIC_DEFAULT_LOGO_URL,
                decimals: response.data.data.decimals,
                totalSupply: (
                    (new BigNumber(totalSupply) as any) /
                    10 ** response.data.data.decimals
                ).toLocaleString('en-US', { maximumFractionDigits: 0 }),
            };
        })
        .catch((error: any) => {
            console.log('Error fetching token info');
            return null;
        });
}

async function getHolderCount(chain: any, tokenAddress: string) {
    return axios
        .get(chain.holderCountAPI + tokenAddress, {
            headers: {
                'x-api-key': process.env.CHAINBASE_API_KEY,
            },
        })
        .then((response) => {
            return response.data.count.toLocaleString('en-US', {
                maximumFractionDigits: 0,
            });
        })
        .catch((error: any) => {
            console.log('Error fetching holder count');
            return null;
        });
}

// async function getDailyVolume(chain: any, tokenAddress: string) {
//     return 0;
// }

// async function getMonthlyVolume(chain: any, tokenAddress: string) {
//     return 0;
// }

async function getCentralization(
    chain: any,
    tokenAddress: string,
    decimals: number,
    totalSupply: number
) {
    const holderData = await axios
        .get(chain.holderDataAPI + tokenAddress, {
            headers: {
                'x-api-key': process.env.CHAINBASE_API_KEY,
            },
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error: any) => {
            console.log('Error fetching holder data');
            return null;
        });

    let topHolderSum = 0;
    for (let holderInfo of holderData) {
        topHolderSum += Number(
            (
                (new BigNumber(holderInfo.original_amount) as any) /
                10 ** decimals
            ).toFixed(0)
        );
    }

    return (
        ((topHolderSum / totalSupply) * 100).toLocaleString('en-US', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        }) + '%'
    );
}

export async function computeMetrics(chainName: string, tokenAddress: string) {
    const chain = CHAINS[chainName];

    if (!chain) {
        return null;
    }

    const { name, symbol, logo, decimals, totalSupply }: any =
        await getTokenInfo(chain, tokenAddress);
    const holderCount = await getHolderCount(chain, tokenAddress);
    // const dailyVolume = await getDailyVolume(chain, tokenAddress);
    // const monthlyVolume = await getMonthlyVolume(chain, tokenAddress);
    await delay(1000); // chainbase has 2 requests per second limit
    const centralization = await getCentralization(
        chain,
        tokenAddress,
        decimals,
        Number(totalSupply.replace(/,/g, ''))
    );

    return {
        name,
        symbol,
        logo,
        holderCount,
        // dailyVolume,
        // monthlyVolume,
        totalSupply,
        centralization,
    };
}
