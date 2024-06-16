import { getTextColor } from '@/utils/textColor';
import { ImageResponse } from 'next/og';

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
        const gradientStart =
            url.searchParams.get('gradientStart') ||
            process.env.NEXT_PUBLIC_DEFAULT_GRADIENT_START ||
            '';
        const gradientEnd =
            url.searchParams.get('gradientEnd') ||
            process.env.NEXT_PUBLIC_DEFAULT_GRADIENT_END ||
            '';
        const textColor = getTextColor(gradientStart, gradientEnd);

        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        height: '100vh',
                        width: '100vw',
                        alignItems: 'flex-start',
                        paddingLeft: '60px',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundImage: `linear-gradient(90deg, #${gradientStart} 0%, #${gradientEnd} 100%)`,
                        color: textColor,
                    }}
                >
                    <h1
                        style={{
                            textAlign: 'center',
                            fontSize: '80px',
                            margin: '0px',
                        }}
                    >
                        select a chain
                    </h1>
                    <p
                        style={{
                            textAlign: 'center',
                            fontSize: '30px',
                        }}
                    >
                        polychain support coming soon...
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
                        <img
                            src={`https://soft-pump-assets.s3.amazonaws.com/${process.env.NEXT_PUBLIC_LOGO_LIGHT}`}
                            style={{ height: '50px' }}
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
    } catch (e: any) {
        console.log(e);
        return new Response(e.message, { status: 500 });
    }
}
