import { ImageResponse } from 'next/og';
import { getTextColor } from '@/utils/textColor';
import axios from 'axios';

export const runtime = 'edge';

async function returnError() {
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
                    token info not found
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
        ),
        {
            fonts: fonts,
            width: 1200,
            height: 630,
        }
    );
}

export const createPreview = async (state: any) => {
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

        const textColor = getTextColor(state.gradientStart, state.gradientEnd);
        const displayOptions = {
            holderCount: state.holderCount,
            // dailyVolume: state.dailyVolume,
            // monthlyVolume: state.monthlyVolume,
            totalSupply: state.totalSupply,
            centralization: state.centralization,
        };

        let tokenInfoResponse;
        let error;
        try {
            tokenInfoResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/tokenInfo?chain=${
                    state.chain
                }&tokenAddress=${
                    state.tokenAddress
                }&displayOptions=${encodeURIComponent(
                    JSON.stringify(displayOptions)
                )}`
            );

            error = false;
        } catch (e: any) {
            error = true;
        }

        if (!tokenInfoResponse || !tokenInfoResponse.data || error) {
            const errorResponse = await returnError();
            return errorResponse;
        }

        const token = tokenInfoResponse.data;

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
        return new Response(e.message, { status: 500 });
    }
};
