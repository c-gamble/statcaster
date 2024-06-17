import { ImageResponse } from 'next/og';
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
        const chain = url.searchParams.get('chain') || '';
        const tokenAddress = url.searchParams.get('tokenAddress') || '';

        let token;
        let error;
        try {
            const tokenInfoResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/display?chain=${chain}&tokenAddress=${tokenAddress}`,
                { cache: 'no-store' }
            );
            token = await tokenInfoResponse.json();
            error = false;
        } catch (e: any) {
            error = true;
        }

        if (!token || error) {
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
                            backgroundImage:
                                'linear-gradient(to right, #014bad, #17101F)',
                        }}
                    >
                        <h1
                            style={{
                                color: 'white',
                                fontSize: '60px',
                                margin: '0px',
                                fontWeight: 700,
                            }}
                        >
                            token not found
                        </h1>
                        <div
                            style={{
                                position: 'absolute',
                                display: 'flex',
                                bottom: '0',
                                right: '0',
                                padding: '20px',
                            }}
                        >
                            <p
                                style={{
                                    color: 'white',
                                    fontSize: '20px',
                                    margin: '0px',
                                }}
                            >
                                created with statcaster by SOFT
                            </p>
                        </div>
                    </div>
                )
            );
        }

        const textColor = getTextColor(token.gradientStart, token.gradientEnd);

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
                        backgroundImage: `linear-gradient(to right, #${token.gradientStart}, #${token.gradientEnd})`,
                        color: textColor,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            height: '20%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            paddingTop: '30px',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '60px',
                                margin: '0px',
                                fontWeight: 700,
                            }}
                        >
                            {token.name} ({token.symbol})
                        </h1>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            height: '80%',
                            width: '100%',
                            paddingLeft: '60px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                height: '100%',
                                justifyContent: 'space-around',
                            }}
                        >
                            {token.fields.map((field: any) =>
                                field.display ? (
                                    <div
                                        key={field.name}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <p
                                            style={{
                                                textAlign: 'center',
                                                fontSize: '26px',
                                                margin: '0px',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            {field.name}
                                        </p>
                                        <h1
                                            style={{
                                                textAlign: 'center',
                                                fontSize: '40px',
                                                margin: '0px',
                                            }}
                                        >
                                            {field.value}
                                        </h1>
                                        {field.name === 'centralization' && (
                                            <p
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: '26px',
                                                }}
                                            >
                                                note: higher values indicate
                                                more centralization
                                            </p>
                                        )}
                                    </div>
                                ) : null
                            )}
                        </div>

                        <div
                            style={{
                                position: 'absolute',
                                display: 'flex',
                                bottom: '30%',
                                right: '10%',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                padding: '40px',
                            }}
                        >
                            {token.logo !== undefined ? (
                                <img
                                    src={token.logo}
                                    height={200}
                                    width={200}
                                    alt="token logo"
                                />
                            ) : (
                                <img
                                    src={
                                        process.env
                                            .NEXT_PUBLIC_DEFAULT_LOGO_URL ||
                                        'https://soft-pump-assets.s3.amazonaws.com/token.png'
                                    }
                                    height={200}
                                    width={200}
                                    alt="token logo"
                                />
                            )}
                        </div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            bottom: '0',
                            right: '0',
                            padding: '20px',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '20px',
                                margin: '0px',
                            }}
                        >
                            created with statcaster by SOFT
                        </p>
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
