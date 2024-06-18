'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { CHAINS } from '@/constants/chains';
import { getTextColor } from '@/utils/textColor';

type Props = {
    params: { chain: string; tokenAddress: string; id: string };
};

export default function Page({ params }: Props) {
    const chain = params.chain;
    const tokenAddress = params.tokenAddress;
    const id = params.id;

    const [loading, setLoading] = useState(true);
    const [token, setToken]: any = useState(null);
    const [error, setError]: any = useState(false);
    const [textColor, setTextColor]: any = useState('white');

    useEffect(() => {
        if (!Object.keys(CHAINS).includes(chain)) {
            setError(true);
            setLoading(false);
            return;
        }

        const fetchToken = async () => {
            try {
                const response = await axios.get(
                    `/api/display?chain=${chain}&tokenAddress=${tokenAddress}&id=${id}`
                );
                setLoading(false);
                setToken(response.data);
                setTextColor(
                    getTextColor(
                        response.data.gradientStart,
                        response.data.gradientEnd
                    )
                );
            } catch (e) {
                setLoading(false);
                setError(true);
            }
        };

        fetchToken();
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_SITE_URL}/frames/display/${chain}/${tokenAddress}/${id}`
        );
        alert('copied to clipboard!');
    };

    return (
        <>
            {loading ? (
                <div className="h-screen w-screen bg-gradient-linear p-20 flex flex-col justify-center items-center">
                    <p className="text-white text-lg mb-6">loading...</p>
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            bottom: '0',
                            left: '0',
                            padding: '30px',
                        }}
                    >
                        <a
                            href="https://www.thesoftdao.com/"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/bg-blue_fg-white-removebg-preview.png"
                                height={50}
                                width={50}
                                alt="SOFT logo"
                            />
                        </a>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            bottom: '0',
                            right: '0',
                            padding: '40px',
                        }}
                    >
                        <a
                            href="https://warpcast.com/thesoftdao"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/warpcast.png"
                                height={25}
                                width={25}
                                alt="SOFT logo"
                                style={{ marginRight: '20px' }}
                            />
                        </a>
                        <a
                            href="https://twitter.com/thesoftdao"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/x.png"
                                height={23}
                                width={23}
                                alt="SOFT logo"
                                style={{ marginRight: '20px' }}
                            />
                        </a>
                        <a
                            href="https://discord.com/invite/thesoftdao"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/discord.png"
                                height={23}
                                width={23}
                                alt="SOFT logo"
                            />
                        </a>
                    </div>
                </div>
            ) : error ? (
                <div className="h-screen w-screen bg-gradient-linear p-20 flex flex-col justify-center items-center">
                    <h1 className="text-white text-xl mb-6">
                        there was an error
                    </h1>
                    <p className="text-white text-lg mb-6">please try again</p>
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            bottom: '0',
                            left: '0',
                            padding: '30px',
                        }}
                    >
                        <a
                            href="https://www.thesoftdao.com/"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/bg-blue_fg-white-removebg-preview.png"
                                height={50}
                                width={50}
                                alt="SOFT logo"
                            />
                        </a>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            bottom: '0',
                            right: '0',
                            padding: '40px',
                        }}
                    >
                        <a
                            href="https://warpcast.com/thesoftdao"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/warpcast.png"
                                height={25}
                                width={25}
                                alt="SOFT logo"
                                style={{ marginRight: '20px' }}
                            />
                        </a>
                        <a
                            href="https://twitter.com/thesoftdao"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/x.png"
                                height={23}
                                width={23}
                                alt="SOFT logo"
                                style={{ marginRight: '20px' }}
                            />
                        </a>
                        <a
                            href="https://discord.com/invite/thesoftdao"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/discord.png"
                                height={23}
                                width={23}
                                alt="SOFT logo"
                            />
                        </a>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        backgroundImage: `linear-gradient(90deg, #${token.gradientStart} 0%, #${token.gradientEnd} 100%)`,
                        color: textColor,
                    }}
                    className="h-screen w-screen p-20 flex flex-col justify-center items-center"
                >
                    <h1 className="text-[48px] mb-6">
                        {token.name} ({token.symbol})
                    </h1>
                    <button
                        onClick={handleCopy}
                        className="mb-6 outline-none rounded-md font-bold"
                        style={{
                            padding: '10px',
                            backgroundColor: textColor,
                            color: '#' + token.gradientStart,
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        copy link
                    </button>
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            bottom: '0',
                            left: '0',
                            padding: '30px',
                        }}
                    >
                        <a
                            href="https://www.thesoftdao.com/"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/bg-blue_fg-white-removebg-preview.png"
                                height={50}
                                width={50}
                                alt="SOFT logo"
                            />
                        </a>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            bottom: '0',
                            right: '0',
                            padding: '40px',
                        }}
                    >
                        <a
                            href="https://warpcast.com/thesoftdao"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/warpcast.png"
                                height={25}
                                width={25}
                                alt="SOFT logo"
                                style={{ marginRight: '20px' }}
                            />
                        </a>
                        <a
                            href="https://twitter.com/thesoftdao"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/x.png"
                                height={23}
                                width={23}
                                alt="SOFT logo"
                                style={{ marginRight: '20px' }}
                            />
                        </a>
                        <a
                            href="https://discord.com/invite/thesoftdao"
                            target="_blank"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                src="https://soft-pump-assets.s3.amazonaws.com/discord.png"
                                height={23}
                                width={23}
                                alt="SOFT logo"
                            />
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
