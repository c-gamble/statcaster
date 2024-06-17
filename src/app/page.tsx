'use client';

import Image from 'next/image';

export default function Home() {
    return (
        <div className="h-screen w-screen bg-gradient-to-r to-[#17101F] from-[#014bad] flex flex-col justify-center items-start pl-[80px]">
            <h1 className="text-white font-normal text-6xl mb-[18px]">
                statcaster by SOFT
            </h1>
            <p className="text-white text-3xl">token tracking in frames</p>
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    bottom: '0',
                    left: '0',
                    padding: '10px',
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
                    padding: '10px',
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
                        alt="Warpcast logo"
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
                        alt="Twitter logo"
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
                        alt="Discord logo"
                    />
                </a>
            </div>
        </div>
    );
}
