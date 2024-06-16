import { ImageResponse } from 'next/og';
import Image from 'next/image';
import { getTextColor } from '@/utils/textColor';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const regularFontData = fetch(
            new URL(
                'https://soft-pump-assets.s3.amazonaws.com/Montserrat/static/Montserrat-Regular.ttf'
            )
        ).then((res) => res.arrayBuffer());
        const boldFontData = fetch(
            new URL(
                'https://soft-pump-assets.s3.amazonaws.com/Montserrat/static/Montserrat-Bold.ttf'
            )
        ).then((res) => res.arrayBuffer());

        const regularFont = await Promise.all([regularFontData]);
        const boldFont = await Promise.all([boldFontData]);

        const fonts: any = [
            {
                name: 'Montserrat',
                data: regularFont[0],
                weight: 400,
            },
            {
                name: 'Montserrat',
                data: boldFont[0],
                weight: 700,
            },
        ];

        const url = new URL(request.url);
        const success = url.searchParams.get('success') === 'true';

        if (!success) {
            return new ImageResponse(
                (
                    <div
                        style={{
                            display: 'flex',
                            height: '100vh',
                            width: '100vw',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            backgroundImage: `linear-gradient(to right, #${process.env.NEXT_PUBLIC_DEFAULT_GRADIENT_START}, #${process.env.NEXT_PUBLIC_DEFAULT_GRADIENT_END})`,
                            color: 'white',
                        }}
                    >
                        <h1 style={{ textAlign: 'center', fontSize: '80px' }}>
                            token creation failed
                        </h1>
                        <p style={{ textAlign: 'center', fontSize: '30px' }}>
                            please try again
                        </p>
                        <div
                            style={{
                                position: 'absolute',
                                display: 'flex',
                                bottom: '0',
                                right: '0',
                                padding: '10px',
                            }}
                        >
                            <Image
                                src={
                                    'https://soft-pump-assets.s3.amazonaws.com/' +
                                        process.env.NEXT_PUBLIC_LOGO_LIGHT ||
                                    'bg-blue_fg-white-removebg-preview.png'
                                }
                                height={50}
                                width={50}
                                alt="SOFT logo"
                            />
                        </div>
                    </div>
                ),
                {
                    fonts: fonts,
                    width: 1200,
                    height: 630,
                }
            );
        } else {
            const state = JSON.parse(
                decodeURIComponent(url.searchParams.get('state') || '')
            );
            const textColor = getTextColor(
                state.gradientStart,
                state.gradientEnd
            );

            return new ImageResponse(
                (
                    <div
                        style={{
                            display: 'flex',
                            height: '100vh',
                            width: '100vw',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            backgroundImage: `linear-gradient(90deg, #${state.gradientStart} 0%, #${state.gradientEnd} 100%)`,
                            color: textColor,
                        }}
                    >
                        <h1 style={{ textAlign: 'center', fontSize: '80px' }}>
                            stats frame created!
                        </h1>
                        <p style={{ textAlign: 'center', fontSize: '30px' }}>
                            get your repost link below
                        </p>
                        <div
                            style={{
                                position: 'absolute',
                                display: 'flex',
                                bottom: '0',
                                right: '0',
                                padding: '10px',
                            }}
                        >
                            <Image
                                src={
                                    textColor === 'black'
                                        ? 'https://soft-pump-assets.s3.amazonaws.com/' +
                                              process.env
                                                  .NEXT_PUBLIC_LOGO_LIGHT ||
                                          'bg-blue_fg-white-removebg-preview.png'
                                        : 'https://soft-pump-assets.s3.amazonaws.com/' +
                                              process.env
                                                  .NEXT_PUBLIC_LOGO_DARK ||
                                          'bg-blue_fg-white-removebg-preview.png'
                                }
                                height={50}
                                width={50}
                                alt="SOFT logo"
                            />
                        </div>
                    </div>
                ),
                {
                    fonts: fonts,
                    width: 1200,
                    height: 630,
                }
            );
        }
    } catch (e: any) {
        console.log(e);
        return new Response(e.message, { status: 500 });
    }
}
